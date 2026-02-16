package com.hrms.backend.repository.localization;

import com.hrms.backend.entities.localization.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepo extends JpaRepository<City, Long> {
}
