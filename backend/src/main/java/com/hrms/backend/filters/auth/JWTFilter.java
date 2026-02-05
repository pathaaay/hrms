package com.hrms.backend.filters.auth;


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
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {
    private final JwtService jwtService;


    // This method will make sure the filter will not run for above URIs.
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        log.info("should not filter");

        String requestUri = request.getRequestURI();
        for (String publicUrl : Constants.PUBLIC_URLS) {
            if (publicUrl.equals(requestUri) || (publicUrl.contains("/**") && requestUri.startsWith(publicUrl.replace("/**", "")))) {
                log.info("should not filter true {}  - {}", publicUrl, requestUri);
                return true;
            }
        }
        log.info("should not filter false");
        return false;
    }

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        log.info("coming to filter");
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
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Authentication token expired");
        } catch (Exception ex) {
            throw new HttpClientErrorException(HttpStatus.UNAUTHORIZED, "Authentication token invalid");
        }


        chain.doFilter(request, response);
    }
}
