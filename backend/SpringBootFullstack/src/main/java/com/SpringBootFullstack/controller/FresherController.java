package com.SpringBootFullstack.controller;

import com.SpringBootFullstack.dto.FresherDTO;
import com.SpringBootFullstack.dto.ProjectDTO;
import com.SpringBootFullstack.entity.Fresher;
import com.SpringBootFullstack.service.impl.FresherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/freshers")
public class FresherController {

    @Autowired
    private FresherService fresherService;

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping
    public ResponseEntity<Page<FresherDTO>> getAllFreshers(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "25") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<FresherDTO> fresherPage = fresherService.searchFreshers(search, pageable);

        return new ResponseEntity<>(fresherPage, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<FresherDTO>> getAllFreshersForCenter() {
        List<FresherDTO> freshers = fresherService.getFreshersForCenter(); // Get all freshers
        return new ResponseEntity<>(freshers, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FresherDTO> getFresherById(@PathVariable Long id) {
        FresherDTO fresher = fresherService.findById(id);
        if (fresher == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(fresher);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<FresherDTO> createFresher(@RequestBody FresherDTO fresherDTO) {
        FresherDTO createdFresher = fresherService.createFresher(fresherDTO);
        return new ResponseEntity<>(createdFresher, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<FresherDTO> updateFresher(@PathVariable Long id, @RequestBody FresherDTO fresherDTO) {
        FresherDTO updatedFresher = fresherService.updateFresher(id, fresherDTO);
        return new ResponseEntity<>(updatedFresher, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFresher(@PathVariable long id) {
        fresherService.deleteFresher(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}/projects")
    public ResponseEntity<List<ProjectDTO>> getProjectHistory(@PathVariable Long id){
        try{
            FresherDTO fresher= fresherService.findById(id);

            if(fresher==null){
                return ResponseEntity.notFound().build();
            }

            List<ProjectDTO> projectHistory = fresher.getProjects();

            return  ResponseEntity.ok(projectHistory);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);

        }

    }


}
