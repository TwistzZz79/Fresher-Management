package com.SpringBootFullstack.dto;

import com.SpringBootFullstack.entity.Center;
import com.SpringBootFullstack.entity.Fresher;
import com.SpringBootFullstack.entity.Project;
import com.SpringBootFullstack.entity.Users;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)

public class Response {

    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String name;
    private String role;
    private String email;
    private String password;

    private Users users;
    private Fresher fresher;
    private Center center;
    private Project project;

    private List<Users> usersList;
    private List<Fresher>fresherList;
    private List<Center>centerList;
    private List<Project>projectList;
}
