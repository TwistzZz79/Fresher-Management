package com.SpringBootFullstack.repository;

import com.SpringBootFullstack.entity.Center;
import com.SpringBootFullstack.entity.Fresher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface FresherRepository extends JpaRepository<Fresher,Long>  {
    @Query("SELECT f FROM Fresher f WHERE " +
            "LOWER(f.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(f.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(f.programmingLanguage) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Fresher> searchByKeyword(@Param("keyword")String keyword, Pageable pageable);

    List<Fresher> findByCenter(Center center);
}
