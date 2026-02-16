package com.hrms.backend.repository.location;

import com.hrms.backend.entities.location.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CityRepo extends JpaRepository<City, Long> {
    List<City> findAllByState_Id(Long stateId);
}
