package com.hrms.backend.service.game;

import com.hrms.backend.dto.request.GetBookedGameSlotsRequestDTO;
import com.hrms.backend.dto.response.BookedGameSlotsResponseDTO;
import com.hrms.backend.entities.game.GameBooking;
import com.hrms.backend.repository.game.GameBookingRepo;
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

    @Transactional
    public void deleteBooking(Long bookingId) throws BadRequestException {
        GameBooking booking = gameBookingRepo.findById(bookingId).orElseThrow(() -> new BadRequestException("Booking not found"));
        booking.setDeleted(true);
        gameBookingRepo.save(booking);
    }
}
