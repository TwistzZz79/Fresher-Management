package com.SpringBootFullstack.entity;

import com.SpringBootFullstack.entity.enums.ProjectStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="projects")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id") // Add this

@Getter
@Setter
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,unique = true)
    private String projectCode;
    private String projectName;
    private LocalDate startDate;
    private LocalDate endDate;

    @ManyToOne
    @JoinColumn(name="center_id")
  //  @JsonBackReference
    private Center center;

    @ManyToOne
    @JoinColumn(name="manager_id")
    private Manager manager;

    @ElementCollection
    private List<String> programmingLanguageList;

    @Enumerated(EnumType.STRING)
    private ProjectStatus status;

    @ManyToMany(mappedBy = "projects", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Fresher> fresherList;

    private void validateDates(){
        if(endDate !=null && startDate !=null && endDate.isBefore(startDate)){
            throw  new IllegalArgumentException("End date must be after start date");
        }
    }


    /**
     *     @PrePersist
     *     @PreUpdate
     *     private void validateProjectDates() {
     *         validateDates();
     *     }
     */
}
