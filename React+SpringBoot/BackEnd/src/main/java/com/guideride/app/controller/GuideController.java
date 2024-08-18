package com.guideride.app.controller;

import com.guideride.app.model.Guide;
import com.guideride.app.service.GuideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/guides")
public class GuideController {

    @Autowired
    private GuideService guideService;

    // Get all guides
    @GetMapping("/")
    public ResponseEntity<List<Guide>> getAllGuides() {
        List<Guide> guides = guideService.getAllGuides();
        return new ResponseEntity<>(guides, HttpStatus.OK);
    }

    // Get guide by ID
    @GetMapping("/{id}")
    public ResponseEntity<Object> getGuideById(@PathVariable("id") Long id) {
        Optional<Guide> guide = guideService.getGuideById(id);
        if (guide.isPresent()) {
            return new ResponseEntity<>(guide.get(), HttpStatus.OK);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Guide not found with id: " + id);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    // Create a new guide
    @PostMapping("/")
    public ResponseEntity<Guide> createGuide(@RequestBody Guide guide) {
        Guide createdGuide = guideService.createGuide(guide);
        return new ResponseEntity<>(createdGuide, HttpStatus.CREATED);
    }

    // Update an existing guide
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateGuide(@PathVariable("id") Long id, @RequestBody Guide guideDetails) {
        try {
            Guide updatedGuide = guideService.updateGuide(id, guideDetails);
            return new ResponseEntity<>(updatedGuide, HttpStatus.OK);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Something went wrong");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Delete a guide by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteGuide(@PathVariable("id") Long id) {
        try {
            guideService.deleteGuide(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Guide deleted successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Guide not found with id: " + id);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
}
