package com.SpringBootFullstack.service.impl;

import com.SpringBootFullstack.dto.FresherDTO;
import com.SpringBootFullstack.dto.ProjectDTO;
import com.SpringBootFullstack.entity.Fresher;
import com.SpringBootFullstack.entity.Project;
import com.SpringBootFullstack.repository.FresherRepository;
import com.SpringBootFullstack.repository.ProjectRepository;
import com.SpringBootFullstack.service.interfac.IProjectService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService implements IProjectService {

    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private FresherRepository fresherRepository;


    @Autowired
    private ModelMapper modelMapper;

    @Override
    public ProjectDTO createProject(ProjectDTO projectDTO) {
        Project project= modelMapper.map(projectDTO,Project.class);
        project = projectRepository.save(project);
        return modelMapper.map(project,ProjectDTO.class);

    }

    @Override
    public ProjectDTO getProjectById(Long id) {
        Project project =projectRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Project not found"));
        return  modelMapper.map(project,ProjectDTO.class);
    }

    @Override
    public List<ProjectDTO> getAllProjects() {
        List <Project> projectList= projectRepository.findAll();
        return projectList.stream()
                .map(project -> modelMapper.map(project,ProjectDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ProjectDTO updateProject(Long id, ProjectDTO projectDTO) {
        Project project = projectRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Project not found"));

        project.setProjectCode(projectDTO.getProjectCode());
        project.setProjectName(projectDTO.getProjectName());
        project.setStartDate(projectDTO.getStartDate());
        project.setEndDate(projectDTO.getEndDate());
        project.setProgrammingLanguageList(projectDTO.getProgrammingLanguageList());
        project.setStatus(projectDTO.getStatus());

        project =projectRepository.save(project);

        return modelMapper.map(project,ProjectDTO.class);
    }

    @Override
    public void deleteProject(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Project not found"));

        for(Fresher fresher: project.getFresherList()){
            fresher.getProjects().remove(project);
        }


        projectRepository.delete(project);

    }

    @Override
    public void addFresherToProject(Long projectId, Long fresherId) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(()-> new RuntimeException("Project not found"));

        if(project.getFresherList()==null){
            project.setFresherList(new ArrayList<>());
        }

        Fresher fresher= fresherRepository.findById(fresherId)
                .orElseThrow(()-> new RuntimeException("Fresher not found"));

        if (!project.getFresherList().contains(fresher)) {
            project.getFresherList().add(fresher);

            if(fresher.getProjects()==null){
                fresher.setProjects(new ArrayList<>());
            }
            fresher.getProjects().add(project);
        }

        fresherRepository.save(fresher);
        projectRepository.save(project);

    }

    @Override
    public void removeFresherFromProject(Long projectId, Long fresherId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(()-> new RuntimeException("Project not found"));

        Fresher fresher= fresherRepository.findById(fresherId)
                .orElseThrow(()-> new RuntimeException("Fresher not found"));

        if (fresher.getProjects() != null) {
            fresher.getProjects().remove(project);
        }

        // Remove the fresher from the project's fresher list
        if (project.getFresherList() != null) {
            project.getFresherList().remove(fresher);
        }

        fresherRepository.save(fresher);
        projectRepository.save(project);

    }

    @Override
    public List<ProjectDTO> getProjectsByFresherId(Long fresherId) {
        Fresher fresher= fresherRepository.findById(fresherId)
                .orElseThrow(()-> new RuntimeException("Fresher not found"));

        if (fresher.getProjects() != null && !fresher.getProjects().isEmpty()) {
            return fresher.getProjects().stream()
                    .map(project -> modelMapper.map(project, ProjectDTO.class))
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    @Override
    public List<FresherDTO> getFreshersByProject(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(()-> new RuntimeException("Project not found"));



        List<Fresher> freshers = project.getFresherList();

        // Map the list of Freshers to FresherDTOs
        return freshers.stream()
                .map(fresher -> modelMapper.map(fresher, FresherDTO.class)) // Assuming you're using ModelMapper
                .collect(Collectors.toList());

    }



}
