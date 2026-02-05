package com.hrms.backend.utilities;
public record ErrorResponse(boolean success, String message, String type, Object errors) {
}