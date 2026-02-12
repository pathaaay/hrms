package com.hrms.backend.utilities;

import com.hrms.backend.entities.user.User;
import org.springframework.stereotype.Component;

@Component
public class Helper {
    public String generateReferCode(User user) {
        return user.getId() + user.getName().substring(0, 2) + user.getEmail().substring(0, 2);
    }
}
