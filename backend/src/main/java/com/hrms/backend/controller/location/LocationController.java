package com.hrms.backend.controller.location;

import com.hrms.backend.entities.location.City;
import com.hrms.backend.entities.location.Country;
import com.hrms.backend.entities.location.State;
import com.hrms.backend.service.location.CityService;
import com.hrms.backend.service.location.CountryService;
import com.hrms.backend.service.location.StateService;
import com.hrms.backend.utilities.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/locations")
public class LocationController {
    private final CountryService countryService;
    private final StateService stateService;
    private final CityService cityService;

    @GetMapping("/countries")
    public ResponseEntity<ApiResponse<List<Country>>> getAllStatesByCountryId() {
        return new ResponseEntity<>(new ApiResponse<>(true, "States get successfully", countryService.getAllCountries()), HttpStatus.OK);
    }

    @GetMapping("/{stateId}/cities")
    public ResponseEntity<ApiResponse<List<City>>> getAllCitiesByCountryId(@PathVariable("stateId") Long stateId) {
        return new ResponseEntity<>(new ApiResponse<>(true, "States get successfully", cityService.findAllByStateId(stateId)), HttpStatus.OK);
    }

    @GetMapping("/{countryId}/states")
    public ResponseEntity<ApiResponse<List<State>>> getAllStatesByCountryId(@PathVariable("countryId") Long countryId) {
        return new ResponseEntity<>(new ApiResponse<>(true, "States get successfully", stateService.findAllByCountryId(countryId)), HttpStatus.OK);
    }
}
