package com.SpringBootFullstack.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name="center")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id") // Add this

@Getter
@Setter
public class Center {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String location;
    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL,orphanRemoval = true)
   // @JsonManagedReference
    private List<Fresher> fresherList;

    @OneToMany(mappedBy = "center",cascade = CascadeType.ALL,orphanRemoval = true)
   // @JsonManagedReference
    private List<Project>projects;
}
