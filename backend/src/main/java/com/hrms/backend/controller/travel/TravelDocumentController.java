package com.hrms.backend.controller.travel;

import com.hrms.backend.dto.travel.documents.request.TravelDocumentRequestDTO;
import com.hrms.backend.dto.travel.documents.response.TravelDocumentResponseDTO;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.service.travel.TravelDocumentService;
import com.hrms.backend.utilities.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/travels/documents/{travelId}")
public class TravelDocumentController {
    private final TravelDocumentService travelDocumentService;

    @GetMapping()
    public ResponseEntity<ApiResponse<List<TravelDocumentResponseDTO>>> getTravelDocuments(@PathVariable("travelId") Long travelId, @AuthenticationPrincipal User user) {
        return new ResponseEntity<>(new ApiResponse<>(true, "Travel documents get successfully", travelDocumentService.getDocuments(travelId, user)), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<ApiResponse> createTravelDocument(@PathVariable("travelId") Long travelId, @Valid @RequestBody TravelDocumentRequestDTO dto) throws BadRequestException {
        travelDocumentService.createDocument(travelId, dto);
        return new ResponseEntity<>(new ApiResponse<>(true, "Travel document created successfully", null), HttpStatus.CREATED);
    }

    @PutMapping("/{travelDocumentId}")
    public ResponseEntity<ApiResponse> updateTravelDocument(@PathVariable("travelId") Long travelId, @PathVariable("travelDocumentId") Long travelDocumentId, @Valid @RequestBody TravelDocumentRequestDTO dto) throws BadRequestException {
        travelDocumentService.updateDocument(travelId, travelDocumentId, dto);
        return new ResponseEntity<>(new ApiResponse<>(true, "Travel document updated successfully", null), HttpStatus.OK);
    }

    @DeleteMapping("/{travelDocumentId}")
    public ResponseEntity<ApiResponse> deleteTravelDocument(@PathVariable("travelDocumentId") Long travelDocumentId, @AuthenticationPrincipal User user) {
        travelDocumentService.deleteDocument(travelDocumentId, user);
        return new ResponseEntity<>(new ApiResponse<>(true, "Travel document deleted successfully", null), HttpStatus.OK);
    }
}
