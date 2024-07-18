package com.example.backend.service;

import com.example.backend.model.User;

import java.util.List;

public interface IUserService {
    User registerUser(User user);
    List<User> getUsers();
    void deleteUser(String email);
    User findUserByEmail(String email);
}
