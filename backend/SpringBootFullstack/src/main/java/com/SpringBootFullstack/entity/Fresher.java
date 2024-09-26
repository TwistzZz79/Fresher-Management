package com.SpringBootFullstack.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="fresher")
public class Fresher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String programmingLanguage;
    private int firstProject;
    private int secondProject;
    private int thirdProject;
    private double finalScore;
    @ManyToOne
    @JoinColumn(name = "center_id", nullable = true)
    @JsonBackReference
    private Center center;
    @ManyToOne
    @JoinColumn(name = "project_id", nullable = true)
    private Project project;

    public double calculateFinalScore() {
        return (firstProject + secondProject + thirdProject) / 3.0;
    }


    @PrePersist
    @PreUpdate
    public void updateFinalScore(){
        calculateFinalScore();
    }



}
