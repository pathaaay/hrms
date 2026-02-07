package com.hrms.backend.filters.auth;


import com.hrms.backend.entities.user.Role;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.UserProfileRepo;
import com.hrms.backend.repository.UserRepo;
import com.hrms.backend.service.auth.JwtService;
import com.hrms.backend.utilities.Constants;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserRepo userRepo;
    private final UserProfileRepo userProfileRepo;

    @Autowired
    @Qualifier("handlerExceptionResolver")
    private HandlerExceptionResolver exceptionResolver;


    // This method will make sure the filter will not run for public URIs.
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String requestUri = request.getRequestURI();

        // This will log every request in the api
        log.info("API called - METHOD: {} - URL: {} - Time:{}", request.getMethod(), requestUri, LocalDateTime.now());

        for (String publicUrl : Constants.PUBLIC_URLS) {
            if (publicUrl.equals(requestUri) || (publicUrl.contains("/**") && requestUri.startsWith(publicUrl.replace("/**", "")))) {
                return true;
            }
        }
        return false;
    }

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        try {

            String authHeader = request.getHeader("Authorization");
            String token = null;
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
            }

        try {

            String authHeader = request.getHeader("Authorization");
            String token = null;
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
            }


            if (request.getCookies() != null) {
                for (Cookie cookie : request.getCookies()) {
                    if (Constants.AUTH_TOKEN_COOKIE_NAME.equals(cookie.getName())) {
                        token = cookie.getValue();
                        break;
                    }
                }
            }
            if (request.getCookies() != null) {
                for (Cookie cookie : request.getCookies()) {
                    if (Constants.AUTH_TOKEN_COOKIE_NAME.equals(cookie.getName())) {
                        token = cookie.getValue();
                        break;
                    }
                }
            }

            // If the token is null then throwing the exception
            if (token == null)
                throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Authentication token is missing");

            try {
                Long userId = jwtService.extractUserId(token);
                if (userId != null) {
                    User user = userRepo.findById(userId).orElseThrow(() -> new BadRequestException("User not found"));

                    if (Boolean.TRUE.equals(user.getIsDeleted())) {
                        throw new BadRequestException(("User is deleted"));
                    }

                    List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(user.getRole() != null ? user.getRole().getName() : null));
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user, null, authorities);
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            } catch (ExpiredJwtException ex) {
                throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Authentication token is expired");
            } catch (Exception ex) {
                throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, ex.getMessage());
            }

            chain.doFilter(request, response);
        } catch (Exception ex) {
            exceptionResolver.resolveException(request, response, null, ex);
        }
            chain.doFilter(request, response);
        } catch (Exception ex) {
            exceptionResolver.resolveException(request, response, null, ex);
        }
    }
}
