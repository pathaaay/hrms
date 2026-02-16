package com.hrms.backend.service.travel;

import com.hrms.backend.dto.travel.request.TravelRequestDTO;
import com.hrms.backend.dto.travel.response.TravelResponseDTO;
import com.hrms.backend.entities.localization.City;
import com.hrms.backend.entities.travel.Travel;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.travel.TravelRepo;
import com.hrms.backend.service.localization.CityService;
import com.hrms.backend.service.mail.MailService;
import com.hrms.backend.service.notification.NotificationService;
import com.hrms.backend.service.user.UserService;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class TravelService {
    private final TravelRepo travelRepo;
    private final ModelMapper modelMapper;
    private final CityService cityService;
    private final UserService userService;
    private final MailService mailService;
    private final NotificationService notificationService;

    private Travel convertToEntity(TravelRequestDTO dto, User user) throws BadRequestException {
        Travel travel = modelMapper.map(dto, Travel.class);
        Set<User> members = userService.findAllById(dto.getUserIds());
        travel.setCreatedBy(user);
        travel.setIsDeleted(false);
        travel.setTravelMembers(members);
        travel.setCity(cityService.findById(dto.getCityId()));
        return travel;
    }

    private TravelResponseDTO convertToDTO(Travel travel) {
        TravelResponseDTO dto = modelMapper.map(travel, TravelResponseDTO.class);
        dto.setCity(travel.getCity().getName());
        dto.setState(travel.getCity().getState().getName());
        dto.setCountry(travel.getCity().getState().getCountry().getName());
        if (travel.getTravelMembers() != null) dto.setTravelMembers(travel.getTravelMembers());
        return dto;
    }

    private List<TravelResponseDTO> convertToDTOList(List<Travel> travels) {
        return travels.stream().map(this::convertToDTO).toList();
    }

    public Travel findById(Long id) throws BadRequestException {
        return travelRepo.findByIdAndIsDeleted(id, false).orElseThrow(() -> new BadRequestException("Travel not found"));
    }

    public Travel findById(Long id, User user) throws BadRequestException {
        return travelRepo.findByIdAndCreatedBy_IdAndIsDeleted(id, user.getId(), false).orElseThrow(() -> new BadRequestException("Travel not found"));
    }

    public TravelResponseDTO getTravelById(Long id) throws BadRequestException {
        return convertToDTO(findById(id));
    }

    public List<TravelResponseDTO> getAllTravels() {
        return convertToDTOList(travelRepo.findAllByIsDeleted(false));
    }

    public List<TravelResponseDTO> getAllTravels(User user) {
        return convertToDTOList(travelRepo.findAllByIsDeletedAndTravelMembers_Id(false, user.getId()));
    }

    @Transactional
    public void createTravel(TravelRequestDTO dto, User user) throws BadRequestException, MessagingException {

        Travel travel = travelRepo.save(convertToEntity(dto, user));

        String[] toEmails = new String[travel.getTravelMembers().size()];

        int i = 0;
        for (User singleUser : travel.getTravelMembers()) {
            toEmails[i++] = singleUser.getEmail();
            notificationService.addNotification("New Travel:" + dto.getTitle(), "Description: " + dto.getDescription(), singleUser);
        }

        City city = cityService.findById(dto.getCityId());
        String htmlBody = """
                <div>
                <div>New Travel: %s</div>
                <div>Description: %s</div>
                <div>Start Date: %s</div>
                <div>End Date: %s</div>
                <div>City: %s</div>
                <div>State: %s</div>
                <div>Country: %s</div>
                </div>
                """.formatted(dto.getTitle(), dto.getDescription(), dto.getStartDate(), dto.getEndDate(), city.getName(), city.getState().getName(), city.getState().getCountry().getName());

        mailService.sendEmail(toEmails, "New Travel: " + dto.getTitle(), htmlBody);
    }

    public void updateTravel(TravelRequestDTO dto, User user, Long travelId) throws BadRequestException {
        Travel oldTravel = findById(travelId, user);
        Travel travel = convertToEntity(dto, user);
        travel.setId(travelId);
        travel.setCreatedAt(oldTravel.getCreatedAt());
        travelRepo.save(travel);
    }

    public void deleteTravel(Long travelId, User user) {
        travelRepo.findByIdAndDelete(travelId, user.getId());
    }
}
