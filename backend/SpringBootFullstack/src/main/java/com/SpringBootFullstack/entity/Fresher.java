package com.SpringBootFullstack.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "center_id", nullable = true)
    @JsonBackReference(value = "center-fresher")
    private Center center;
    @ManyToMany
    //@JoinColumn(name = "projects_id", nullable = true)
    @JoinTable(
            name = "fresher_project",
            joinColumns = @JoinColumn(name = "fresher_id"),
            inverseJoinColumns = @JoinColumn(name = "project_id")
    )
    @JsonBackReference
    private List<Project> projects;

    public double calculateFinalScore() {
        double averageScore = (firstProject + secondProject + thirdProject) / 3.0;
        return roundScore(averageScore);
    }

    private Double roundScore(Double score){
        BigDecimal bigDecimal= new BigDecimal(score).setScale(1, RoundingMode.HALF_UP);
        return  bigDecimal.doubleValue();
    }


    @PrePersist
    @PreUpdate
    public void updateFinalScore(){
        this.finalScore= calculateFinalScore();
    }



}
