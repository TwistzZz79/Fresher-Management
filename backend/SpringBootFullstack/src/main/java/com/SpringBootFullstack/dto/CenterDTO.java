package com.SpringBootFullstack.dto;

import com.SpringBootFullstack.entity.Fresher;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)

public class CenterDTO {

    private Long id;
    private String name;
    private String location;
    private List<FresherDTO> fresherList;

}
