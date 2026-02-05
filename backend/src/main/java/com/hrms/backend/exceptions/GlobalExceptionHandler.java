package com.hrms.backend.exceptions;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpServerErrorException;


@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @Autowired
    private ObjectMapper mapper;

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({NullPointerException.class, HttpServerErrorException.InternalServerError.class})
    public JsonNode handleGlobalException(MethodArgumentNotValidException exception) {


        ObjectNode node = mapper.createObjectNode();
        node.put("success", false);
        node.put("type", "validation_error");
        node.put("message", exception.getMessage());

        log.error("Method argument not valid exception occurred: Error: {}", exception.getMessage());

        return node;
    }
}