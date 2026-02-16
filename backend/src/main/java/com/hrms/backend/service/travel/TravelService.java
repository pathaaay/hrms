package com.hrms.backend.service.travel;

import com.hrms.backend.dto.travel.request.TravelRequestDTO;
import com.hrms.backend.dto.travel.response.TravelResponseDTO;
import com.hrms.backend.entities.travel.Travel;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.travel.TravelRepo;
import com.hrms.backend.service.localization.CityService;
import com.hrms.backend.service.user.UserService;
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
    private final UserService userService;
    private final CityService cityService;

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

    public void createTravel(TravelRequestDTO dto, User user) throws BadRequestException {
        travelRepo.save(convertToEntity(dto, user));
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
