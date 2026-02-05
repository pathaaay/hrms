package com.hrms.backend.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class HomeController {

    private final ObjectMapper mapper;
    @GetMapping("")
    public JsonNode home() {
        log.info("Home method called");
        ObjectNode node = mapper.createObjectNode();
        node.put("success", true);
        node.put("created_by", "Aayush Pathak");
        node.put("project Name", "HRMS BACKEND API");
        node.put("timestamp", System.currentTimeMillis());
        return node;
    }

    @GetMapping("/health")
    public JsonNode health() {
        log.info("Health method called");
        ObjectNode node = mapper.createObjectNode();
        node.put("success", true);
        node.put("status", "ok");
        node.put("timestamp", System.currentTimeMillis());
        return node;
    }
}
