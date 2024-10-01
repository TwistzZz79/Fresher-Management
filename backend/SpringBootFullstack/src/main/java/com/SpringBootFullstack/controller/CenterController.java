package com.SpringBootFullstack.controller;

import com.SpringBootFullstack.entity.Center;
import com.SpringBootFullstack.entity.Fresher;
import com.SpringBootFullstack.service.impl.CenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/centers")
public class CenterController {


    @Autowired
    private CenterService centerService;

    @GetMapping
    public List<Center> getAllCenters(){
        return centerService.getAllCenters();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Center> getCenterById(@PathVariable Long id){
        Center center = centerService.getCenterById(id)
                .orElseThrow(()-> new RuntimeException("Center not found with id "+id));
        return new ResponseEntity<>(center,HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Center>createCenter(@RequestBody Center center){
        Center newCenter = centerService.createCenter(center);
        return new ResponseEntity<>(newCenter,HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity <Center> updateCenter(@PathVariable Long id,@RequestBody Center centerDetails){
        Center updatedCenter= centerService.updateCenter(id,centerDetails);
        return new ResponseEntity<>(updatedCenter,HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus>deleteCenter(@PathVariable Long id){
        centerService.deleteCenter(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{centerId}/add-fresher/{fresherId}")
    public ResponseEntity<Center> addFresherToCenter(@PathVariable Long centerId,@PathVariable Long fresherId){
        Center center = centerService.addFresherToCenter(centerId,fresherId);
        return new ResponseEntity<>(center,HttpStatus.OK);
    }

    @DeleteMapping("/{centerId}/remove-fresher/{fresherId}")
    public ResponseEntity<Center> removeFresherFromCenter(@PathVariable Long centerId,@PathVariable Long fresherId){
        Center center = centerService.removeFresherFromCenter(centerId,fresherId);
        return new ResponseEntity<>(center,HttpStatus.OK);
    }

    @GetMapping("/{centerId}/freshers")
    public ResponseEntity<List<Fresher>>getFreshersByCenter(@PathVariable Long centerId){
        List<Fresher> fresherList=centerService.getFreshersByCenter(centerId);
        return new ResponseEntity<>(fresherList,HttpStatus.OK);
    }

    /*
    @Autowired
    private CenterRepository centerRepository;
    @Autowired
    private FresherRepository fresherRepository;

    @PostMapping
    public ResponseEntity<Center> createCenter(@RequestBody Center center){
        return new ResponseEntity<>(centerRepository.save(center), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Center> getFresherById(@PathVariable long id){
        Center center = centerRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Center not found with id"));
        return new ResponseEntity<>(center,HttpStatus.OK);

    }
    @PutMapping("{/id}")
    public ResponseEntity<Center> updateCenter(@PathVariable long id,@RequestBody Center updatedCenter){
        Center center = centerRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Center not found"));
        center.setName(updatedCenter.getName());
        center.setLocation(updatedCenter.getLocation());
        return new ResponseEntity<>(centerRepository.save(center),HttpStatus.OK);

    }

    @PutMapping("/{centerId}/addFresher/{fresherId}")
    public ResponseEntity<Center> addFresherToCenter (@PathVariable Long centerId,@PathVariable Long fresherId){
        Center center = centerRepository.findById(centerId)
                .orElseThrow(()-> new RuntimeException("Center not found"));
        Fresher fresher= fresherRepository.findById(fresherId)
                .orElseThrow(()->new RuntimeException("Fresher not found"));

        fresher.setCenter(center);
        fresherRepository.save(fresher);
        return new ResponseEntity<>(center,HttpStatus.OK);
    }
    @PutMapping("/{centerId}/removeFresher/{fresherId}")
    public ResponseEntity<Center> removeFresherFromCenter(@PathVariable Long centerId, @PathVariable Long fresherId){
        Fresher fresher= fresherRepository.findById(fresherId)
                .orElseThrow(()->new RuntimeException("Fresher not found"));

        fresher.setCenter(null);
        fresherRepository.save(fresher);
        return new ResponseEntity<>(HttpStatus.OK);

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCenter(@PathVariable Long id){
        centerRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    */



}
