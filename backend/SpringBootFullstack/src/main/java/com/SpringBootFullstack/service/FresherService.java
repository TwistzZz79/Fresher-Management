package com.SpringBootFullstack.service;

import com.SpringBootFullstack.entity.Fresher;
import com.SpringBootFullstack.repository.FresherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class FresherService {
    @Autowired
    private FresherRepository fresherRepository;


    public Page<Fresher> searchFreshers(String query, Pageable pageable){
        return fresherRepository.searchByKeyword(query,pageable);
    }

    public Fresher findById(Long id){
        Optional<Fresher> fresherOptional=fresherRepository.findById(id);
        return fresherOptional.orElse(null);
    }

    public List<Fresher> getFreshersForCenter() {
        return fresherRepository.findAll(); // Get all freshers
    }

    public Fresher createFresher(Fresher fresher){
        if (fresher.getCenter() != null && fresher.getCenter().getId() == null) {
            fresher.setCenter(null); // Explicitly setting center to null if empty
        }

        // Handle nullable project
        if (fresher.getProject() != null && fresher.getProject().getId() == null) {
            fresher.setProject(null); // Explicitly setting project to null if empty
        }

        // Calculate the final score
        fresher.setFinalScore((fresher.calculateFinalScore()));

        return fresherRepository.save(fresher);

    }

    public Fresher updateFresher(Long id,Fresher fresherDetails){
        Fresher fresher = fresherRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("No fresher found with this id "));

        fresher.setName(fresherDetails.getName());
        fresher.setEmail(fresherDetails.getEmail());
        fresher.setProgrammingLanguage(fresherDetails.getProgrammingLanguage());
        fresher.setFirstProject(fresherDetails.getFirstProject());
        fresher.setSecondProject(fresherDetails.getSecondProject());
        fresher.setThirdProject(fresherDetails.getThirdProject());
        fresher.setFinalScore((fresherDetails.calculateFinalScore()));

        return fresherRepository.save(fresher);


    }

    public void deleteFresher(Long id){
        Fresher fresher= fresherRepository.findById(id)
                .orElseThrow(()->new RuntimeException("No fresher found with this id"));
        fresherRepository.delete(fresher);
    }


}
