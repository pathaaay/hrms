package com.hrms.backend.service.user;

import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.user.UserRepo;
import com.hrms.backend.utilities.roles.Roles;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepo userRepo;

    public Set<User> findAllById(Set<Long> userIds) {
        return new HashSet<>(userRepo.findAllById(userIds));
    }

    public User findById(Long userId) throws BadRequestException {
        return userRepo.findById(userId).orElseThrow(() -> new BadRequestException("User not found"));
    }

    public boolean hasRole(Roles roleName) {
        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        return authorities.stream().anyMatch(authority -> authority.getAuthority().equals(roleName.toString()));
    }
}
