package com.hrms.backend.utilities;

public class Constants {
    private Constants() {
    }

    public static final String AUTH_TOKEN_COOKIE_NAME = "hrms_access_token";
    public static final String[] PUBLIC_URLS = {
            "/api/",
            "/api/health",
            "/api/auth/**",
            "/api/v3/api-docs/**",
            "/api/swagger-ui/**",
            "/api/swagger-ui.html"
    };
}
