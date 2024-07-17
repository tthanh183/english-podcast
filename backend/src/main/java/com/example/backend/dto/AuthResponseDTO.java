package com.example.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class AuthResponseDTO {
    private String email;
    private String name;
    private String token;
    private String avatar;
    private String type = "Bearer";
    private List<String> roles;

    public AuthResponseDTO(String email, String name, String token, String avatar, List<String> roles) {
        this.email = email;
        this.name = name;
        this.token = token;
        this.avatar = avatar;
        this.roles = roles;
    }
}
