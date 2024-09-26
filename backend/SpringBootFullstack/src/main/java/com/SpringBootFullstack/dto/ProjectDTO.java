package com.SpringBootFullstack.dto;

import com.SpringBootFullstack.entity.Fresher;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)

public class ProjectDTO {
    private Long id;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private String programmingLanguage;
    private String status;
    private List<FresherDTO> fresherList;

}
