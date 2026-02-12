package com.hrms.backend.service.game;

import com.hrms.backend.dto.game.request.BookGameSlotRequestDTO;
import com.hrms.backend.dto.game.request.GetBookedGameSlotsRequestDTO;
import com.hrms.backend.dto.game.response.BookedGameSlotsResponseDTO;
import com.hrms.backend.entities.game.GameBooking;
import com.hrms.backend.entities.game.GameTeam;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.game.GameBookingRepo;
import com.hrms.backend.utilities.Constants;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GameBookingService {
    private final GameBookingRepo gameBookingRepo;
    private final ModelMapper modelMapper;

    public BookedGameSlotsResponseDTO convertToDTO(GameBooking booking) {
        return modelMapper.map(booking, BookedGameSlotsResponseDTO.class);
    }

    public List<BookedGameSlotsResponseDTO> convertToDTOList(List<GameBooking> bookings) {
        return bookings.stream().map(this::convertToDTO).toList();
    }

    public List<BookedGameSlotsResponseDTO> getAllBookedGameSlots(GetBookedGameSlotsRequestDTO dto) {
        List<GameBooking> bookedGameSlots = gameBookingRepo.getBookedSlotsByGameId(dto.getGameId(), dto.getFromDate(), dto.getToDate());
        return convertToDTOList(bookedGameSlots);
    }

    public List<BookedGameSlotsResponseDTO> getAllBookings(Long userId) {
        List<GameBooking> bookedGameSlots = gameBookingRepo.getBookingsByUserId(userId);
        return convertToDTOList(bookedGameSlots);
    }

    public GameBooking createBooking(GameTeam createdTeam, Constants.GameBookingStatusType status, BookGameSlotRequestDTO bookingDetails) {
        GameBooking newBooking = new GameBooking();
        newBooking.setTeam(createdTeam);
        newBooking.setIsConfirmed(status == Constants.GameBookingStatusType.CONFIRMED);
        newBooking.setStartTime(bookingDetails.getStartTime());
        newBooking.setEndTime(bookingDetails.getEndTime());
        newBooking.setBookedSlotDate(bookingDetails.getBookingDate());
        newBooking.setIsDeleted(false);
        return gameBookingRepo.save(newBooking);
    }

    @Transactional
    public void deleteBooking(Long bookingId, User user) throws BadRequestException {
        int deleted = gameBookingRepo.deleteBooking(user.getId(), bookingId);
        if (deleted == 0) throw new BadRequestException("Failed to delete booking");
    }
}
