package com.SpringBootFullstack.service.interfac;

import com.SpringBootFullstack.dto.FresherDTO;
import com.SpringBootFullstack.dto.ProjectDTO;
import com.SpringBootFullstack.dto.Response;

import java.util.List;

public interface IProjectService {

    ProjectDTO createProject(ProjectDTO projectDTO);

    ProjectDTO getProjectById(Long id);

    List<ProjectDTO> getAllProjects();

    ProjectDTO updateProject(Long id,ProjectDTO projectDTO);

    void deleteProject(Long id);

    void addFresherToProject(Long projectId, Long fresherId);

    void removeFresherFromProject(Long projectId, Long fresherId);

    List<ProjectDTO> getProjectsByFresherId(Long fresherId);

    List<FresherDTO>getFreshersByProject(Long projectId);



}
