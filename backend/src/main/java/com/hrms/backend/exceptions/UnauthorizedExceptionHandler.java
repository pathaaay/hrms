package com.hrms.backend.exceptions;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.hrms.backend.utilities.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;


@Slf4j
@RestControllerAdvice
public class UnauthorizedExceptionHandler {

    @Autowired
    private ObjectMapper mapper;

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler({HttpClientErrorException.Unauthorized.class})
    public ResponseEntity<ErrorResponse> handleUnauthorized(HttpClientErrorException.Unauthorized exception) {
        log.error("Unauthorized exception occurred");
        return new ResponseEntity<>(new ErrorResponse(false, exception.getMessage(), "unauthorized", null), HttpStatus.UNAUTHORIZED);
    }
}