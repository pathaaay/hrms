package com.hrms.backend.filters.auth;


import com.hrms.backend.service.auth.JwtService;
import com.hrms.backend.utilities.Constants;
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
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
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

    @Autowired
    @Qualifier("handlerExceptionResolver")
    private HandlerExceptionResolver exceptionResolver;


    // This method will make sure the filter will not run for public URIs.
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String requestUri = request.getRequestURI();

        // This will log every request in the
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

            log.info("token {}", token);

            if (request.getCookies() != null) {
                for (Cookie cookie : request.getCookies()) {
                    if (Constants.AUTH_TOKEN_COOKIE_NAME.equals(cookie.getName())) {
                        token = cookie.getValue();
                        break;
                    }
                }
            }

            if (token == null)
                throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Authentication token is missing");

            try {
                Long userId = jwtService.extractUserId(token);
                if (userId != null) {
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userId, null, List.of());
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            } catch (ExpiredJwtException ex) {
                throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Authentication token is expired");
            } catch (Exception ex) {
                throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Authentication token is invalid");
            }

            chain.doFilter(request, response);
        } catch (Exception ex) {
            exceptionResolver.resolveException(request, response, null, ex);
        }
    }
}
