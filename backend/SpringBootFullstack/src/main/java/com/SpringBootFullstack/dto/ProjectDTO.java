package com.SpringBootFullstack.dto;

import com.SpringBootFullstack.entity.Fresher;
import com.SpringBootFullstack.entity.enums.ProjectStatus;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDTO {
    private Long id; // Unique identifier for the project
    private String projectCode; // Project code
    private String projectName; // Name of the project
    private LocalDate startDate; // Start date of the project
    private LocalDate endDate; // End date of the project
    private Long centerId; // Reference to the associated Center (optional)
    private Long managerId; // Reference to the associated Manager (optional)
    private List<String> programmingLanguageList; // List of programming languages used in the project
    private ProjectStatus status; // Status of the project
    private List<FresherDTO> fresherList;

}
