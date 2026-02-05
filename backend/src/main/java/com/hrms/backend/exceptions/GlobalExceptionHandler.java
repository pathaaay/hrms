package com.hrms.backend.exceptions;

import com.hrms.backend.utilities.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.HashMap;
import java.util.Map;


@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {


    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<ErrorResponse> handleInvalidArgument(MethodArgumentNotValidException ex) {
        Map<String, String> errorMap = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error -> errorMap.put(error.getField(), error.getDefaultMessage()));
        log.error("Fields validation error occurred - Error: " + ex.getMessage());
        return new ResponseEntity<>(new ErrorResponse(false, "Fields validation error occurred", "validation_error", errorMap), HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<ErrorResponse> handleBadRequestException(BadRequestException ex) {
        log.error("Bad Request - Error: " + ex.getMessage());
        return new ResponseEntity<>(new ErrorResponse(false, ex.getMessage(), "bad_request", null), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex, WebRequest request) {
        log.error("Required request body is missing or invalid JSON - Error: " + ex.getMessage());
        return new ResponseEntity<>(new ErrorResponse(false, "Required request body is missing or invalid JSON", "body_missing", null), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponse> handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException ex) {
        log.error("Method not supported error occurred - Error: " + ex.getMessage());
        return new ResponseEntity<>(new ErrorResponse(false, "Method not supported", "method_not_supported", null), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({NoResourceFoundException.class})
    public ResponseEntity<ErrorResponse> handleNotFound(NoResourceFoundException ex) {
        log.error("Not Found ex occurred - Error: " + ex.getMessage());
        return new ResponseEntity<>(new ErrorResponse(false, ex.getMessage(), "route_not_found", null), HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler({HttpClientErrorException.Unauthorized.class})
    public ResponseEntity<ErrorResponse> handleUnauthorized(HttpClientErrorException.Unauthorized ex) {
        log.error("Unauthorized ex occurred - Error: " + ex.getMessage());
        return new ResponseEntity<>(new ErrorResponse(false, ex.getMessage(), "unauthorized", null), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<ErrorResponse> handleAllException(Exception ex) {
        log.error("An unknown error occurred - Error: " + ex.getMessage());
        return new ResponseEntity<>(new ErrorResponse(false, ex.getMessage(), "unknown_error", null), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}