package com.hrms.backend.service.location;

import com.hrms.backend.entities.location.Country;
import com.hrms.backend.repository.location.CountryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CountryService {
    private final CountryRepo countryRepo;

    public List<Country> getAllCountries() {
        return countryRepo.findAll();
    }
}
