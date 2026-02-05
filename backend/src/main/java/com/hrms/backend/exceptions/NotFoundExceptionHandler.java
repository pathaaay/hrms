package com.hrms.backend.exceptions;

import lombok.extern.slf4j.Slf4j;
import com.hrms.backend.utilities.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

@Slf4j
@RestControllerAdvice
public class NotFoundExceptionHandler {
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler({NoResourceFoundException.class})
    public ResponseEntity<ErrorResponse> handleNotFound(NoResourceFoundException exception) {
        log.error("Not Found exception occurred");
        return new ResponseEntity<>(new ErrorResponse<>(false, exception.getMessage(), "route_not_found", null), HttpStatus.NOT_FOUND);
    }
}