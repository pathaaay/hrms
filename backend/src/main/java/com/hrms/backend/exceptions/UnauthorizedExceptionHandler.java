package com.hrms.backend.exceptions;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public JsonNode handleUnauthorized(HttpClientErrorException.Unauthorized exception) {

        log.error("Unauthorized exception occurred");

        ObjectNode node = mapper.createObjectNode();
        node.put("success", false);
        node.put("type", "unauthorized");
        node.put("message", exception.getMessage());
        node.putPOJO("error", exception.toString());


        return node;
    }
}