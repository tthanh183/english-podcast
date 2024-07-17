package com.example.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class AuthResponseDTO {
    private String email;
    private String token;
    private String type = "Bearer";
    private List<String> roles;

    public AuthResponseDTO(String email, String token, List<String> roles) {
        this.email = email;
        this.token = token;
        this.roles = roles;
    }
}
