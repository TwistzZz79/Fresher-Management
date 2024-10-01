package com.SpringBootFullstack.dto;

import com.SpringBootFullstack.entity.Center;
import com.SpringBootFullstack.entity.Project;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@AllArgsConstructor
public class FresherDTO {
    private Long id;
    private String name;
    private String email;
    private String programmingLanguage;
    private int firstProject;
    private int secondProject;
    private int thirdProject;
    private double finalScore;
    private Long centerId;
    private Long projectId;
    //private Center center;
    //private List<ProjectDTO> projects;

}
