package com.SpringBootFullstack.controller;

import com.SpringBootFullstack.entity.Fresher;
import com.SpringBootFullstack.service.FresherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/freshers")
public class FresherController {

    @Autowired
    private FresherService fresherService;

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping
    public ResponseEntity<Page<Fresher>> getAllFreshers(
        @RequestParam(required = false) String search,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "25") int size){

        Pageable pageable= PageRequest.of(page,size);
        Page<Fresher> fresherPage= fresherService.searchFreshers(search,pageable);

        return new ResponseEntity<>(fresherPage, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/all")
    public ResponseEntity<List<Fresher>> getAllFreshersForCenter() {
        List<Fresher> freshers = fresherService.getFreshersForCenter(); // Get all freshers
        return new ResponseEntity<>(freshers, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity <Fresher> getFresherById(@PathVariable Long id){
        Fresher fresher = fresherService.findById(id);
        if(fresher==null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(fresher);
    }


    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Fresher>createFresher(@RequestBody Fresher fresher){
        Fresher createdFresher= fresherService.createFresher(fresher);
        return new ResponseEntity<>(createdFresher,HttpStatus.CREATED);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Fresher> updateFresher(@PathVariable Long id, @RequestBody Fresher fresherDetails) {
        Fresher updatedFresher = fresherService.updateFresher(id,fresherDetails);
        return new ResponseEntity<>(updatedFresher,HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFresher(@PathVariable long id){
        fresherService.deleteFresher(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
