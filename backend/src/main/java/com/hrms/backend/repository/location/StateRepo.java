package com.hrms.backend.repository.location;

import com.hrms.backend.entities.location.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StateRepo extends JpaRepository<State, Long> {
    List<State> findAllByCountry_Id(Long countryId);
}
