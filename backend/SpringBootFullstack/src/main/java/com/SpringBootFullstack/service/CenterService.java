package com.SpringBootFullstack.service;

import com.SpringBootFullstack.entity.Center;
import com.SpringBootFullstack.entity.Fresher;
import com.SpringBootFullstack.repository.CenterRepository;
import com.SpringBootFullstack.repository.FresherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CenterService {

    @Autowired
    private CenterRepository centerRepository;

    @Autowired
    private FresherRepository fresherRepository;

    public List<Center> getAllCenters(){
        return centerRepository.findAll();
    }
    public Optional <Center> getCenterById(Long id){
        return centerRepository.findById(id);
    }


    public Center createCenter(Center center){
        return centerRepository.save(center);
    }

    public Center updateCenter(Long id, Center centerDetails){
        Center center=centerRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Center not found with id " + id));
        center.setName(centerDetails.getName());
        center.setLocation(centerDetails.getLocation());
        return centerRepository.save(center);
    }

    public void deleteCenter(Long id){
        Center center = centerRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Center not found with id "+ id));
        centerRepository.delete(center);
    }


    public Center addFresherToCenter(Long centerId, Long fresherId) {
        Center center = centerRepository.findById(centerId)
                .orElseThrow(() -> new RuntimeException("Center not found"));

        Fresher fresher = fresherRepository.findById(fresherId)
                .orElseThrow(() -> new RuntimeException("Fresher not found"));

        if(fresher.getCenter() !=null){
            Center oldCenter = fresher.getCenter();
            oldCenter.getFresherList().remove(fresher); // Remove fresher from the old center
            centerRepository.save(oldCenter); // Save the old center after removing the fresher

        }

        fresher.setCenter(center); // Set the center for the fresher
        if (!center.getFresherList().contains(fresher)) {
            center.getFresherList().add(fresher);
        }

        fresherRepository.save(fresher); // Save the fresher with the new center

        return centerRepository.findById(centerId)
                .orElseThrow(() -> new RuntimeException("Center not found"));

    }

    // Remove a fresher from a center
    public Center removeFresherFromCenter(Long centerId, Long fresherId) {
        Center center = centerRepository.findById(centerId)
                .orElseThrow(() -> new RuntimeException("Center not found"));

        Fresher fresher = fresherRepository.findById(fresherId)
                .orElseThrow(() -> new RuntimeException("Fresher not found"));

        if (fresher.getCenter().getId().equals(centerId)) {
            fresher.setCenter(null); // Remove the center from the fresher
            fresherRepository.save(fresher); // Save the fresher with no center
        } else {
            throw new IllegalArgumentException("Fresher does not belong to this center");
        }

        return center;
    }

    public List<Fresher> getFreshersByCenter(Long centerId){
        Center center = centerRepository.findById(centerId)
                .orElseThrow(()-> new RuntimeException("Center not found with id"+ centerId));

        return fresherRepository.findByCenter(center);

    }


}
