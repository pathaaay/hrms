package com.hrms.backend.service.travel;

import com.hrms.backend.dto.travel.documents.request.TravelDocumentRequestDTO;
import com.hrms.backend.dto.travel.documents.response.TravelDocumentResponseDTO;
import com.hrms.backend.entities.travel.TravelDocument;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.travel.TravelDocumentRepo;
import com.hrms.backend.service.document.DocumentService;
import com.hrms.backend.service.user.UserService;
import com.hrms.backend.utilities.roles.Roles;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TravelDocumentService {
    private final UserService userService;
    private final ModelMapper modelMapper;
    private final TravelService travelService;
    private final DocumentService documentService;
    private final TravelDocumentRepo travelDocumentRepo;

    public TravelDocumentResponseDTO convertToDTO(TravelDocument document) {
        return modelMapper.map(document, TravelDocumentResponseDTO.class);
    }

    public TravelDocument convertToEntity(TravelDocumentRequestDTO dto, Long travelId) throws BadRequestException {
        TravelDocument travelDocument = new TravelDocument();
        travelDocument.setTitle(dto.getTitle());
        travelDocument.setTravel(travelService.findById(travelId));
        if (dto.getAddedForId() != null) travelDocument.setAddedFor(userService.findById(dto.getAddedForId()));
        travelDocument.setDocument(documentService.findById(dto.getDocumentId()));
        travelDocument.setIsDeleted(false);
        return travelDocument;
    }

    public List<TravelDocumentResponseDTO> convertToDTOList(List<TravelDocument> documents) {
        return documents.stream().map(this::convertToDTO).toList();
    }

    public List<TravelDocumentResponseDTO> getDocuments(Long travelId, User user) {
        if (userService.hasRole(Roles.ROLE_HR))
            return convertToDTOList(travelDocumentRepo.findByTravel_IdAndIsDeleted(travelId, false));

        return convertToDTOList(travelDocumentRepo.findAllByTravelIdAndIsDeleted(travelId,user.getId()));
    }

    public void createDocument(Long travelId, TravelDocumentRequestDTO dto) throws BadRequestException {
        travelDocumentRepo.save(convertToEntity(dto, travelId));
    }

    public TravelDocument findById(Long id) throws BadRequestException {
        return travelDocumentRepo.findByIdAndIsDeleted(id, false).orElseThrow(() -> new BadRequestException("Travel document not found"));
    }

    public void updateDocument(Long travelId, Long travelDocumentId, TravelDocumentRequestDTO dto) throws BadRequestException {
        TravelDocument oldDocument = findById(travelDocumentId);
        TravelDocument travelDocument = convertToEntity(dto, travelId);
        travelDocument.setId(travelDocumentId);
        travelDocument.setAddedFor(oldDocument.getAddedFor());
        travelDocument.setCreatedAt(oldDocument.getCreatedAt());
        travelDocumentRepo.save(travelDocument);
    }

    public void deleteDocument(Long travelDocumentId, User user) {
        travelDocumentRepo.findAndDeleteById(travelDocumentId, user.getId());
    }
}
