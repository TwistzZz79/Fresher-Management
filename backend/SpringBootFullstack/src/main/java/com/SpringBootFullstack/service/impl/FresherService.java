package com.SpringBootFullstack.service.impl;

import com.SpringBootFullstack.dto.FresherDTO;
import com.SpringBootFullstack.dto.ProjectDTO;
import com.SpringBootFullstack.entity.Fresher;
import com.SpringBootFullstack.entity.Project;
import com.SpringBootFullstack.exception.FresherNotFoundException;
import com.SpringBootFullstack.repository.FresherRepository;
import com.SpringBootFullstack.repository.ProjectRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class FresherService {
    @Autowired
    private FresherRepository fresherRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ModelMapper modelMapper;

    public Page<FresherDTO> searchFreshers(String query, Pageable pageable) {
        Page<Fresher> freshersPage = fresherRepository.searchByKeyword(query, pageable);
        return freshersPage.map(fresher -> modelMapper.map(fresher, FresherDTO.class));
    }

    public FresherDTO findById(Long id) {
        Optional<Fresher> fresherOptional = fresherRepository.findById(id);
        return fresherOptional.map(fresher -> modelMapper.map(fresher, FresherDTO.class)).orElse(null);
    }

    public List<FresherDTO> getFreshersForCenter() {
        List<Fresher> freshers = fresherRepository.findAll();
        return freshers.stream()
                .map(fresher -> modelMapper.map(fresher, FresherDTO.class))
                .collect(Collectors.toList());
    }

    public FresherDTO createFresher(FresherDTO fresherDTO) {
        Fresher fresher = modelMapper.map(fresherDTO, Fresher.class);
        fresher.setFinalScore(fresher.calculateFinalScore());
        fresher = fresherRepository.save(fresher);
        return modelMapper.map(fresher, FresherDTO.class);
    }

    public FresherDTO updateFresher(Long id, FresherDTO fresherDTO) {
        Fresher fresher = fresherRepository.findById(id)
                .orElseThrow(() -> new FresherNotFoundException("No fresher found with this id"));

        // Map DTO to entity and update fields
        modelMapper.map(fresherDTO, fresher);
        fresher.setFinalScore(fresher.calculateFinalScore());

        fresher = fresherRepository.save(fresher);
        return modelMapper.map(fresher, FresherDTO.class);
    }

    public void deleteFresher(Long id) {
        Fresher fresher = fresherRepository.findById(id)
                .orElseThrow(() -> new FresherNotFoundException("No fresher found with this id"));
        fresherRepository.delete(fresher);
    }



}
