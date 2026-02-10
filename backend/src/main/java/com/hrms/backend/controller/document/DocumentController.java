package com.hrms.backend.controller.document;

import com.hrms.backend.entities.document.Document;

import com.hrms.backend.entities.user.User;
import com.hrms.backend.service.document.DocumentService;
import org.springframework.core.io.Resource;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.util.MimeType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@RestController
@RequestMapping("/document")
@RequiredArgsConstructor
public class DocumentController {
    @Value("${file.upload-dir}")
    private String uploadDir;

    private final DocumentService documentService;

    @PostMapping()
    public ResponseEntity<Document> uploadDocument(@AuthenticationPrincipal User user, @RequestParam("file") MultipartFile file) throws BadRequestException {
        return ResponseEntity.status(HttpStatus.CREATED).body(documentService.uploadDocument(user, file));
    }

    @GetMapping("/get/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) throws BadRequestException {

        try {
            Path rootLocation = Paths.get(uploadDir);
            Path filePath = rootLocation.resolve(filename);
            Resource file = new UrlResource(filePath.toUri());
            Optional<MediaType> mediaTypeOptional = MediaTypeFactory.getMediaType(file.getFilename());
            String fileType = mediaTypeOptional.map(MimeType::toString).orElse("");

            if (!fileType.isEmpty())
                return ResponseEntity.ok().header(HttpHeaders.CONTENT_TYPE, fileType).body(file);
            else
                return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);

        } catch (MalformedURLException e) {
            throw new BadRequestException("Could not read file: " + filename, e);
        }


    }

}
