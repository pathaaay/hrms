package com.hrms.backend.service.user;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hrms.backend.dto.response.UserProfileResponseDTO;
import com.hrms.backend.repository.UserRepo;
import com.hrms.backend.utilities.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepo userRepo;
    private final ObjectMapper mapper;

    public ResponseEntity<ApiResponse<UserProfileResponseDTO>> getUserProfile() {
        return ResponseEntity.ok(new ApiResponse<>(true, "User Profile", null));
    }
}
