package com.hrms.backend.service.location;

import com.hrms.backend.entities.location.City;
import com.hrms.backend.repository.location.CityRepo;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CityService {
    private final CityRepo cityRepo;

    public City findById(Long id) throws BadRequestException {
        return cityRepo.findById(id).orElseThrow(() -> new BadRequestException("City not found"));
    }

    public List<City> findAllByStateId(Long countryId) {
        return cityRepo.findAllByState_Id(countryId);
    }
}
