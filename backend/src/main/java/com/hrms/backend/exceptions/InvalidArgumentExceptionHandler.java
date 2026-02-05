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

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class InvalidArgumentExceptionHandler {

    @Autowired
    private ObjectMapper mapper;

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({MethodArgumentNotValidException.class})
    public JsonNode handleInvalidArgument(MethodArgumentNotValidException exception) {

        Map<String, String> errorMap = new HashMap<>();
        exception.getBindingResult().getFieldErrors()
                .forEach(error -> errorMap.put(error.getField(), error.getDefaultMessage()));

        ObjectNode node = mapper.createObjectNode();
        node.put("success", false);
        node.put("type", "validation_error");
        node.put("message", exception.getMessage());
        node.putPOJO("error", errorMap);

        log.error("Method argument not valid exception occurred: Errors: {}", errorMap);

        return node;
    }
}