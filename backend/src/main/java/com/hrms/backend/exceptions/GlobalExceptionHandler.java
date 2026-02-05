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
    public ResponseEntity<ErrorResponse> handleInvalidArgument(MethodArgumentNotValidException exception) {

        Map<String, String> errorMap = new HashMap<>();
        exception.getBindingResult().getFieldErrors()
                .forEach(error -> errorMap.put(error.getField(), error.getDefaultMessage()));
        return new ResponseEntity<>(new ErrorResponse(false, "Fields validation error occurred", "validation_error", errorMap), HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<ErrorResponse> handleBadRequestException(BadRequestException exception) {
        return new ResponseEntity<>(new ErrorResponse(false, exception.getMessage(), "bad_request", null), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleHttpMessageNotReadableException(
            HttpMessageNotReadableException ex, WebRequest request) {
        return new ResponseEntity<>(new ErrorResponse(false, "Required request body is missing or invalid JSON", "body_missing", null), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponse> handleHttpRequestMethodNotSupportedException(
            HttpRequestMethodNotSupportedException ex) {

        String errorMessage = ex.getMessage();

        return new ResponseEntity<>(new ErrorResponse(false, errorMessage, "method_not_supported", null), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({NoResourceFoundException.class})
    public ResponseEntity<ErrorResponse> handleNotFound(NoResourceFoundException exception) {
        log.error("Not Found exception occurred");
        return new ResponseEntity<>(new ErrorResponse(false, exception.getMessage(), "route_not_found", null), HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler({HttpClientErrorException.Unauthorized.class})
    public ResponseEntity<ErrorResponse> handleUnauthorized(HttpClientErrorException.Unauthorized exception) {
        log.error("Unauthorized exception occurred");
        return new ResponseEntity<>(new ErrorResponse(false, exception.getMessage(), "unauthorized", null), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<ErrorResponse> handleAllException(Exception exception) {
        return new ResponseEntity<>(new ErrorResponse(false, exception.getMessage(), "unknown_error", null), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}