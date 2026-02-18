package com.hrms.backend.service.achievementpost;

import com.hrms.backend.dto.achievementpost.request.AchievementPostRequestDTO;
import com.hrms.backend.dto.achievementpost.response.AchievementPostResponseDTO;
import com.hrms.backend.dto.achievementpost.tag.response.AchievementPostTagResponseDTO;
import com.hrms.backend.entities.achievementpost.AchievementPost;
import com.hrms.backend.entities.achievementpost.AchievementPostTag;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.achievementpost.AchievementPostTagRepo;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AchievementPostTagService {
    private final AchievementPostTagRepo achievementPostTagRepo;
    private final ModelMapper modelMapper;

    public AchievementPostTagResponseDTO convertToDTO(AchievementPostTag tag) {
        return modelMapper.map(tag, AchievementPostTagResponseDTO.class);
    }

    public List<AchievementPostTagResponseDTO> convertToDTOList(List<AchievementPostTag> tags) {
        return tags.stream().map(this::convertToDTO).toList();
    }

    public Set<AchievementPostTag> findAllById(Set<Long> ids) {
        return new HashSet<>(achievementPostTagRepo.findAllById(ids));
    }

    public Set<AchievementPostTag> createTags(User user, Set<String> names) {
        List<AchievementPostTag> tags = new ArrayList<>();
        for (String name : names) {
            AchievementPostTag tag = new AchievementPostTag();
            achievementPostTagRepo.findByName(name).ifPresent(existingTag -> tag.setId(existingTag.getId()));
            tag.setName(name);
            tag.setAddedBy(user);
            tags.add(tag);
        }
        return new HashSet<>(achievementPostTagRepo.saveAll(tags));
    }

    public List<AchievementPostTagResponseDTO> searchTags(String query) {
        return convertToDTOList(achievementPostTagRepo.searchTags(query));
    }
}
