package com.SpringBootFullstack.repository;


import com.SpringBootFullstack.entity.Center;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CenterRepository extends JpaRepository<Center,Long> {
}
