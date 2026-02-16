package com.hrms.backend.service.game;

import com.hrms.backend.dto.game.request.BookGameSlotRequestDTO;
import com.hrms.backend.dto.game.request.ConfigureGameRequestDTO;
import com.hrms.backend.dto.game.response.GameResponseDTO;
import com.hrms.backend.entities.game.Game;
import com.hrms.backend.entities.game.GameBooking;
import com.hrms.backend.entities.game.GameTeam;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.game.GameRepo;
import com.hrms.backend.service.mail.MailService;
import com.hrms.backend.service.user.UserService;
import com.hrms.backend.utilities.Constants;
import com.hrms.backend.utilities.roles.Roles;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class GameService {
    private final GameRepo gameRepo;
    private final MailService mailService;
    private final UserService userService;
    private final ModelMapper modelMapper;
    private final GameTeamService gameTeamService;
    private final GameBookingService gameBookingService;
    private final FairPlayAlgorithmService fairPlayAlgorithmService;

    public GameResponseDTO convertToDTO(Game game) {
        return modelMapper.map(game, GameResponseDTO.class);
    }

    public Game convertToEntity(ConfigureGameRequestDTO dto) {
        return modelMapper.map(dto, Game.class);
    }

    public List<GameResponseDTO> convertToDTOList(List<Game> games) {
        return games.stream().map(this::convertToDTO).toList();
    }

    public Set<Game> findAllbyId(Set<Long> gameIds) {
        return new HashSet<>(gameRepo.findAllById(gameIds));
    }

    public Game findById(Long gameId) throws BadRequestException {
        return gameRepo.findById(gameId).orElseThrow(() -> new BadRequestException("Game not found"));
    }

    public List<GameResponseDTO> getAllGames() {
        List<Game> games;
        if (userService.hasRole(Roles.ROLE_HR) || userService.hasRole(Roles.ROLE_MANAGER)) {
            games = gameRepo.findAll();
        } else {
            games = gameRepo.findByIsActiveTrue();
        }
        return convertToDTOList(games);
    }


    @Transactional
    public GameResponseDTO updateGameConfig(Long gameId, ConfigureGameRequestDTO dto) {
        Game game = convertToEntity(dto);
        game.setId(gameId);
        return convertToDTO(gameRepo.save(game));
    }

    @Transactional
    public void bookGameSlot(User user, BookGameSlotRequestDTO bookingDetails) throws BadRequestException, MessagingException {

        // If the members in booking is less than 2 then throw error
        checkRequiredMembers(bookingDetails.getUserIds().size());
        validateDate(bookingDetails.getBookingDate(), bookingDetails.getStartTime());
        Game game = findById(bookingDetails.getGameId());
        Set<User> members = userService.findAllById(bookingDetails.getUserIds());
        GameTeam createdTeam = gameTeamService.createTeam(game, user, members);
        checkRequiredMembers(members.size());
        Constants.GameBookingStatusType status = fairPlayAlgorithmService.getStatus(createdTeam);
        GameBooking newBooking = gameBookingService.createBooking(createdTeam, status, bookingDetails);
        sendBookingEmail(members, user, newBooking, game);

    }

    public void checkRequiredMembers(int count) throws BadRequestException {
        if (count < 2) throw new BadRequestException("Minimum 2 player is required to book a slot");
    }

    public void sendBookingEmail(Set<User> members, User user, GameBooking newBooking, Game game) throws MessagingException {
        String[] toEmails = new String[members.size() + 1];

        int i = 0;
        for (User singleUser : members) {
            toEmails[i++] = singleUser.getEmail();
        }
        toEmails[i] = user.getEmail();

        DateTimeFormatter formatToDate = DateTimeFormatter.ofPattern("EEE MMM dd HH:mm:ss zzz yyyy");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate todayDate = LocalDate.now();
        LocalDate bookedDate = LocalDate.parse(newBooking.getBookedSlotDate().toString(), formatToDate);

        String htmlBody = """
                <div>
                <div>Congratulations your game slot is confirmed.</div>
                <div>Booking On: %s</div>
                <div>Booking Date: %s</div>
                <div>Start Time: %s</div>
                <div>End Time: %s</div>
                <div>Status: %s</div>
                </div>
                """.formatted(
                todayDate.format(formatter),
                bookedDate.format(formatter),
                newBooking.getStartTime() / 60 + ":" + newBooking.getStartTime() % 60,
                newBooking.getEndTime() / 60 + ":" + newBooking.getEndTime() % 60,
                Boolean.TRUE.equals(newBooking.getIsConfirmed()) ? "Confirmed" : "Pending");

        mailService.sendEmail(toEmails, game.getName() + " game slot is booked", htmlBody);
    }

    public void validateDate(Date date, int startTime) throws BadRequestException {
        Calendar today = Calendar.getInstance();
        Calendar calendar = Calendar.getInstance();
        today.setTime(new Date());
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, startTime / 60);
        calendar.set(Calendar.MINUTE, startTime % 60);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        if (calendar.compareTo(today) < 0) throw new BadRequestException("You cannot book past date slot.");
    }

}
