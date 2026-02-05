package com.hrms.backend.utilities;

public record ApiResponse<T>(boolean success, String message, T data) {
}