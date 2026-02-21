package com.hrms.backend.service.achievementpost;

import com.hrms.backend.dto.achievementpost.comment.response.AchievementPostCommentResponseDTO;
import com.hrms.backend.dto.achievementpost.like.response.AchievementPostLikeResponseDTO;
import com.hrms.backend.entities.achievementpost.AchievementPost;
import com.hrms.backend.entities.achievementpost.AchievementPostComment;
import com.hrms.backend.entities.achievementpost.AchievementPostLike;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.achievementpost.AchievementPostLikeRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AchievementPostLikeService {
    private final AchievementPostLikeRepo achievementPostLikeRepo;
    private final ModelMapper modelMapper;

    public AchievementPostLikeResponseDTO convertToDTO(AchievementPostLike like) {
        return modelMapper.map(like, AchievementPostLikeResponseDTO.class);
    }

    public List<AchievementPostLikeResponseDTO> convertToDTOList(List<AchievementPostLike> likes) {
        return likes.stream().map(this::convertToDTO).toList();
    }

    public Long getLikesCountByPostId(Long postId) {
        return achievementPostLikeRepo.getLikesCountByPostId(postId);
    }

    public Boolean isLikedByUser(Long postId, Long userId) {
        return achievementPostLikeRepo.findByLikedBy_IdAndPost_id(userId, postId).isPresent();
    }

    @Transactional
    public void toggleLike(AchievementPost post, User user) {
        AchievementPostLike isLiked = achievementPostLikeRepo.findByLikedBy_IdAndPost_id(user.getId(), post.getId()).orElse(null);
        if (isLiked != null) {
            achievementPostLikeRepo.deleteById(isLiked.getId());
            return;
        }

        AchievementPostLike like = new AchievementPostLike();
        like.setLikedBy(user);
        like.setPost(post);
        achievementPostLikeRepo.save(like);
    }

    public List<AchievementPostLikeResponseDTO> getPostLikes(Long postId) {
        return convertToDTOList(achievementPostLikeRepo.findAllByPost_Id(postId));
    }
}
