package com.hrms.backend.service.file;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileService {
    @Value("${file.upload-dir}")
    private String uploadDir;

    public Resource getFile(String fileName) throws BadRequestException {
        try {
            Path rootLocation = Paths.get(uploadDir);
            Path filePath = rootLocation.resolve(fileName);
            return new UrlResource(filePath.toUri());
        } catch (MalformedURLException e) {
            throw new BadRequestException("Could not read file", e);
        }
    }
}
