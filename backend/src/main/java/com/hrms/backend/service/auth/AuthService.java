package com.hrms.backend.service.auth;

import com.hrms.backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    public UserRepo userRepo;

}
