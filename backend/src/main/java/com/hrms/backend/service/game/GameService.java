package com.hrms.backend.service.game;

import com.hrms.backend.dto.request.BookGameSlotRequestDTO;
import com.hrms.backend.dto.request.ConfigureGameRequestDTO;
import com.hrms.backend.dto.response.GameResponseDTO;
import com.hrms.backend.entities.game.Game;
import com.hrms.backend.entities.game.GameBooking;
import com.hrms.backend.entities.game.GameTeam;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.UserRepo;
import com.hrms.backend.repository.game.GameBookingRepo;
import com.hrms.backend.repository.game.GameRepo;
import com.hrms.backend.repository.game.GameTeamRepo;
import com.hrms.backend.service.mail.MailService;
import com.hrms.backend.utilities.Constants;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GameService {
    private static final Logger log = LoggerFactory.getLogger(GameService.class);
    private final GameRepo gameRepo;
    private final UserRepo userRepo;
    private final ModelMapper modelMapper;
    private final GameTeamRepo gameTeamRepo;
    private final GameBookingRepo gameBookingRepo;
    private final FairPlayAlgorithmService fairPlayAlgorithmService;
    private final MailService mailService;

    public GameResponseDTO convertToDTO(Game game) {
        return modelMapper.map(game, GameResponseDTO.class);
    }

    public List<GameResponseDTO> convertToDTOList(List<Game> games) {
        return games.stream().map(this::convertToDTO).toList();
    }

    public List<GameResponseDTO> getAllGames(User user) {
        List<Game> games;

        // If user role is hr or manager they will get all the games whether it is active or not
        if (user.getRole().getName().equals("hr") || user.getRole().getName().equals("manager"))
            games = gameRepo.findAll();

        else games = gameRepo.findByIsActiveTrue();
        return convertToDTOList(games);
    }

    @Transactional
    public GameResponseDTO updateGameConfig(Long gameId, ConfigureGameRequestDTO dto) throws BadRequestException {
        Game game = gameRepo.findById(gameId).orElseThrow(() -> new BadRequestException("Game not found"));
        game.setName(dto.getName());
        game.setEndTime(dto.getEndTime());
        game.setStartTime(dto.getStartTime());
        game.setBookingCycleHours(dto.getBookingCycleHours());
        game.setMaxPlayersPerSlot(dto.getMaxPlayersPerSlot());
        game.setMaxSlotDurationInMinutes(dto.getMaxSlotDurationInMinutes());
        game.setIsActive(dto.getIsActive());
        gameRepo.save(game);
        return convertToDTO(game);
    }

    @Transactional
    public void bookGameSlot(User user, BookGameSlotRequestDTO bookingDetails) throws BadRequestException, MessagingException {

        // If the members in booking is less than 2 then throw error
        if (bookingDetails.getUserIds().stream().count() < 2)
            throw new BadRequestException("Minimum 2 player is required to book a slot");

        Date bookingDate = bookingDetails.getBookingDate();

        Calendar today = Calendar.getInstance();
        today.setTime(new Date());

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(bookingDate);
        calendar.set(Calendar.HOUR_OF_DAY, bookingDetails.getStartTime() / 60);
        calendar.set(Calendar.MINUTE, bookingDetails.getStartTime() % 60);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);

        // If the booking date is less than current date then throw error
        if (calendar.compareTo(today) < 0) throw new BadRequestException("You cannot book past date slot.");

        // Get the game from db
        Game game = gameRepo.findById(bookingDetails.getGameId()).orElseThrow(() -> new BadRequestException("Game not found"));

        // now find all the users with provided id
        Set<User> users = userRepo.findAllById(bookingDetails.getUserIds()).stream().collect(Collectors.toSet());

        // Create a team first
        GameTeam team = new GameTeam();
        team.setGame(game);
        team.setUser(user);
        team.setGameTeamMembers(users);
        // save the team in db
        GameTeam createdTeam = gameTeamRepo.save(team);


        // Throw an error if the count less than 2 of team members
        if (users.size() < 2) throw new BadRequestException("Minimum 2 player is required to book a slot");

        Constants.GameBookingStatusType status = fairPlayAlgorithmService.getStatus(createdTeam);

        // Create a new Booking
        GameBooking newBooking = new GameBooking();
        newBooking.setTeam(createdTeam);
        newBooking.setIsConfirmed(status == Constants.GameBookingStatusType.CONFIRMED);
        newBooking.setStartTime(bookingDetails.getStartTime());
        newBooking.setEndTime(bookingDetails.getEndTime());
        newBooking.setBookedSlotDate(bookingDetails.getBookingDate());
        newBooking.setIsDeleted(false);
        // Save the Booking to db
        gameBookingRepo.save(newBooking);

        String[] toEmails = new String[users.size() + 1];

        int i = 0;
        for (User singleUser : users) {
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

}
