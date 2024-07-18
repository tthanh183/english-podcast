package com.example.backend.security;

import com.example.backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomUserDetails implements UserDetails {
    private Long id;
    private String email;
    private String password;
    private String name;
    private String avatar;
    private Collection<GrantedAuthority> authorities;

    public static CustomUserDetails buildUserDetails(User user){
        List<GrantedAuthority> authorities = user.getRoles()
                .stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.getName()))
                .collect(Collectors.toList());
        return new CustomUserDetails(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                user.getName(),
                user.getAvatar(),
                authorities);

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }
}
