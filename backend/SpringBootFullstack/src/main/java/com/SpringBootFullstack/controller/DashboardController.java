package com.SpringBootFullstack.controller;


import com.SpringBootFullstack.service.impl.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/center-statistics")
    public ResponseEntity<List<Object[]>> getFreshersByCenter(){
        return new ResponseEntity<>(dashboardService.getFreshersByCenter(), HttpStatus.OK);
    }

    @GetMapping("/score-statistics")
    public ResponseEntity<List<Object[]>> getFreshersByFinalScore() {
        return new ResponseEntity<>(dashboardService.getFreshersByFinalScore(), HttpStatus.OK);
    }



}
