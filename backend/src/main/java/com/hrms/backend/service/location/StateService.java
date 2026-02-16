package com.hrms.backend.service.location;

import com.hrms.backend.entities.location.State;
import com.hrms.backend.repository.location.StateRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StateService {
    private final StateRepo stateRepo;

    public List<State> findAllByCountryId(Long countryId) {
        return stateRepo.findAllByCountry_Id(countryId);
    }
}
