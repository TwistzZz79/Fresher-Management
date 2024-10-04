package com.SpringBootFullstack.controller;

import com.SpringBootFullstack.dto.FresherDTO;
import com.SpringBootFullstack.dto.ProjectDTO;
import com.SpringBootFullstack.service.interfac.IProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private IProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectDTO> createProject(@RequestBody ProjectDTO projectDTO){
        ProjectDTO project = projectService.createProject(projectDTO);
        return ResponseEntity.ok(project);
    }

    @GetMapping
    public ResponseEntity<List<ProjectDTO>> getAllProjects(){
        List<ProjectDTO> projectList = projectService.getAllProjects();
        return ResponseEntity.ok(projectList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDTO> getProjectById(@PathVariable Long id) {
        ProjectDTO project = projectService.getProjectById(id);
        return ResponseEntity.ok(project);
    }


    @PutMapping("/{id}")
    public ResponseEntity<ProjectDTO> updateProject(@PathVariable Long id,@RequestBody ProjectDTO projectDTO){
        ProjectDTO updatedProject = projectService.updateProject(id,projectDTO);
        return ResponseEntity.ok(updatedProject);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id){
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{projectId}/add-fresher/{fresherId}")
    public ResponseEntity<String> addFresherToProject(@PathVariable Long projectId, @PathVariable Long fresherId){
        projectService.addFresherToProject(projectId,fresherId);
        return ResponseEntity.ok("Fresher added to project successfully");
    }
    @DeleteMapping("/{projectId}/remove-fresher/{fresherId}")
    public ResponseEntity<String> removeFresherFromProject(@PathVariable Long projectId, @PathVariable Long fresherId){
        projectService.removeFresherFromProject(projectId,fresherId);
        return ResponseEntity.ok("Fresher removed from project successfully");
    }

    @GetMapping("/by-fresher/{fresherId}")
    public ResponseEntity<List<ProjectDTO>> getProjectsByFresherId(@PathVariable Long fresherId){
        List<ProjectDTO>projects= projectService.getProjectsByFresherId(fresherId);
        return ResponseEntity.ok(projects);
    }

    @GetMapping("/{projectId}/freshers")
    public ResponseEntity<List<FresherDTO>> getFreshersByProject(@PathVariable Long projectId) {
        List<FresherDTO> freshers = projectService.getFreshersByProject(projectId);
        return ResponseEntity.ok(freshers);
    }




}
