package com.SpringBootFullstack.service.impl;

import com.SpringBootFullstack.repository.FresherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private FresherRepository fresherRepository;

    public List<Object[]> getFreshersByCenter(){
        return fresherRepository.getFreshersCountByCenter();
    }

    public List<Object[]>getFreshersByFinalScore(){
        return fresherRepository.getFreshersCountByFinalScore();
    }

}
