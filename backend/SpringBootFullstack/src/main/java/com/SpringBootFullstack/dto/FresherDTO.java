package com.SpringBootFullstack.dto;

import com.SpringBootFullstack.entity.Center;
import com.SpringBootFullstack.entity.Project;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class FresherDTO {
    private Long id;
    private String name;
    private String email;
    private String programmingLanguage;
    private int firstProject;
    private int secondProject;
    private int thirdProject;
    private double finalScore;
    private Center center;
    private Project project;

}
