package com.hrms.backend.utilities;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ErrorResponse(boolean success, String message, String type, Object errors) {
}