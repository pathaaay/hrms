package com.hrms.backend.service.document;

import com.hrms.backend.entities.document.Document;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.DocumentRepo;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DocumentService {
    @Value("${file.upload-dir}")
    private String uploadDir;
    private final DocumentRepo documentRepo;

    public void uploadDocument(User user, MultipartFile file) throws BadRequestException {
        try {
            Path uploadPath = Paths.get(uploadDir);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            Optional<MediaType> mediaTypeOptional = MediaTypeFactory.getMediaType(file.getOriginalFilename());
            String fileType = mediaTypeOptional.get().toString();
            String fileName = UUID.randomUUID().toString() + file.getOriginalFilename();
            Path location = uploadPath.resolve(fileName);

            Files.copy(file.getInputStream(), location, StandardCopyOption.REPLACE_EXISTING);
            Document document = new Document();
            document.setUploadedBy(user);
            document.setFilePath(fileName);
            document.setFileType(fileType);

            documentRepo.save(document);
        } catch (Exception e) {
            throw new BadRequestException("Failed to upload document");
        }
    }
}
