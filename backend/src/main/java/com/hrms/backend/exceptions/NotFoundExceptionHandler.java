package com.hrms.backend.exceptions;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@Slf4j
@RestControllerAdvice
public class NotFoundExceptionHandler {

    @Autowired
    private ObjectMapper mapper;

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler({NoResourceFoundException.class})
    public ResponseEntity<JsonNode> handleNotFound(NoResourceFoundException exception) {

        log.error("Not Found exception occurred");

        ObjectNode node = mapper.createObjectNode();
        node.put("success", false);
        node.put("type", "rotue_not_found");
        node.put("message", exception.getMessage());

        return new ResponseEntity<>(node, HttpStatus.NOT_FOUND);
    }
}