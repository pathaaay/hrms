package com.hrms.backend.service.localization;

import com.hrms.backend.entities.localization.City;
import com.hrms.backend.repository.localization.CityRepo;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CityService {
    private final CityRepo cityRepo;

    public City findById(Long id) throws BadRequestException {
        return cityRepo.findById(id).orElseThrow(() -> new BadRequestException("City not found"));
    }
}
