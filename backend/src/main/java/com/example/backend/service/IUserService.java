package com.example.backend.service;

import com.example.backend.model.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    User registerUser(User user);
    List<User> getUsers();
    void saveUser(User user);
    void deleteUser(String email);
    User findUserByEmail(String email);

    Optional<User> findUserById(Long userId);
}
