package com.guideride.app.repository;

import com.guideride.app.model.Guide;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuideRepository extends JpaRepository<Guide, Long> {
    // Additional query methods (if needed) can be defined here
}
