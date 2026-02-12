package com.hrms.backend.service.mail;

import com.hrms.backend.entities.document.Document;
import com.hrms.backend.service.file.FileService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.core.io.Resource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender mailSender;
    private final FileService fileService;

    public void sendEmail(String[] to, String subject, String body) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(to);
        helper.setFrom("Aayush Pathak <aayush.pathak@roimaint.com>");
        helper.setSubject(subject);
        helper.setText(body, true);
        mailSender.send(message);
    }

    public void sendEmail(String[] to, String subject, String body, Document document) throws MessagingException, BadRequestException {
        Resource file = fileService.getFile(document.getFilePath());
        if (!file.exists()) throw new BadRequestException("File not found");

        String fileName = document.getFilePath();
        if (document.getFileOriginalName() != null) {
            fileName = document.getFileOriginalName();
        }

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(to);
        helper.setFrom("Aayush Pathak <aayush.pathak@roimaint.com>");
        helper.addAttachment(fileName, file);
        helper.setSubject(subject);
        helper.setText(body, true);
        mailSender.send(message);
    }
}
