package com.guideride.app.service;

import com.guideride.app.model.Guide;
import com.guideride.app.repository.GuideRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GuideService {

    @Autowired
    private GuideRepository guideRepository;

    public List<Guide> getAllGuides() {
        return guideRepository.findAll();
    }

    public Optional<Guide> getGuideById(Long id) {
        return guideRepository.findById(id);
    }

    public Guide createGuide(Guide guide) {
        return guideRepository.save(guide);
    }

    public Guide updateGuide(Long id, Guide guideDetails) {
        Optional<Guide> guide = guideRepository.findById(id);
        if (guide.isPresent()) {
            Guide existingGuide = guide.get();
            existingGuide.setName(guideDetails.getName());
            existingGuide.setExperience(guideDetails.getExperience());
            existingGuide.setBookings(guideDetails.getBookings());
            return guideRepository.save(existingGuide);
        }
        return null;
    }

    public void deleteGuide(Long id) {
        guideRepository.deleteById(id);
    }
}

