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
import java.util.Optional;


@Repository
public interface FresherRepository extends JpaRepository<Fresher,Long>  {
    @Query("SELECT f FROM Fresher f WHERE " +
            "LOWER(f.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(f.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(f.programmingLanguage) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Fresher> searchByKeyword(@Param("keyword")String keyword, Pageable pageable);

    List<Fresher> findByCenter(Center center);

    Optional<Fresher> findByEmail (String email);


    @Query("SELECT f.center.name, COUNT(f) FROM Fresher f GROUP BY f.center.name")
    List<Object[]> getFreshersCountByCenter();

    @Query("SELECT CASE WHEN f.finalScore >= 8 THEN 'Excellent' " +
            "WHEN f.finalScore >= 6 THEN 'Good' " +
            "ELSE 'Needs Improvement' END, COUNT(f) " +
            "FROM Fresher f GROUP BY CASE " +
            "WHEN f.finalScore >= 8 THEN 'Excellent' " +
            "WHEN f.finalScore >= 6 THEN 'Good' " +
            "ELSE 'Needs Improvement' END")
    List<Object[]> getFreshersCountByFinalScore();


}
