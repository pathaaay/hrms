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
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class JWTFilter extends OncePerRequestFilter {
    private final JwtService jwtService;

    private static final String[] PUBLIC_URLS = {
            "/",
            "/health",
            "/auth/**",
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/swagger-ui.html"
    };

    // This method will make sure the filter will not run for above URIs.
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String requestUri = request.getRequestURI();
        for (String publicUrl : PUBLIC_URLS) {
            if (requestUri.startsWith(publicUrl.replace("/**", ""))) {
                return true;
            }
        }
        return false;
    }

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
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

        log.error("Token before null check{}", token);
        if (token == null) throw new BadRequestException("Auth Token missing");
        log.error("Token after null check{}", token);

        Long userId = jwtService.extractUserId(token);

        if (userId != null) {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userId, null, List.of());
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            log.info("Authenticated user: " + userId);
        }

        chain.doFilter(request, response);
    }
}
