package com.hrms.backend.service.achievementpost;

import com.hrms.backend.dto.achievementpost.comment.request.AchievementPostCommentRequestDTO;
import com.hrms.backend.dto.achievementpost.comment.response.AchievementPostCommentResponseDTO;
import com.hrms.backend.dto.achievementpost.request.AchievementPostRequestDTO;
import com.hrms.backend.dto.achievementpost.response.AchievementPostResponseDTO;
import com.hrms.backend.dto.achievementpost.tag.response.AchievementPostTagResponseDTO;
import com.hrms.backend.entities.achievementpost.AchievementPost;
import com.hrms.backend.entities.achievementpost.AchievementPostTag;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.achievementpost.AchievementPostRepo;
import com.hrms.backend.service.user.UserProfileService;
import com.hrms.backend.service.user.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AchievementPostService {
    private final ModelMapper modelMapper;
    private final AchievementPostRepo achievementPostRepo;
    private final AchievementPostTagService achievementPostTagService;
    private final UserService userService;
    private final AchievementPostLikeService achievementPostLikeService;
    private final AchievementPostCommentService achievementPostCommentService;

    public AchievementPostResponseDTO convertToDTO(AchievementPost post) {
        AchievementPostResponseDTO dto = modelMapper.map(post, AchievementPostResponseDTO.class);
        dto.setLikesCount(achievementPostLikeService.getLikesCountByPostId(post.getId()));
        dto.setCommentsCount(achievementPostCommentService.getCommentsCountByPostId(post.getId()));
        return dto;
    }

    public AchievementPost convertToEntity(AchievementPostRequestDTO dto, User user) {
        AchievementPost post = modelMapper.map(dto, AchievementPost.class);
        Set<AchievementPostTag> tags = new HashSet<>();

        if (!dto.getIsPublic() && dto.getVisibilityUserIds() != null) {
            Set<User> users = userService.findAllById(dto.getVisibilityUserIds());
            post.setVisibleToUsers(users);
        }

        if (dto.getNewTags() != null) {
            Set<AchievementPostTag> newCreatedTags = achievementPostTagService.createTags(user, dto.getNewTags());
            tags.addAll(newCreatedTags);
        }

        if (dto.getTagIds() != null) {
            Set<AchievementPostTag> existingTags = achievementPostTagService.findAllById(dto.getTagIds());
            tags.addAll(existingTags);
        }
        post.setAuthor(user);
        if (!tags.isEmpty()) post.setAchievementPostTags(tags);
        return post;
    }

    public List<AchievementPostResponseDTO> convertToDTOList(List<AchievementPost> posts) {
        return posts.stream().map(this::convertToDTO).toList();
    }

    public AchievementPost findById(Long postId) throws BadRequestException {
        return achievementPostRepo.findByIdAndDeletedBy_Id(postId, null).orElseThrow(() -> new BadRequestException("Post not found"));
    }

    public AchievementPost findById(Long postId, User user) throws BadRequestException {
        return achievementPostRepo.findByIdAndAuthor_IdAndDeletedBy_Id(postId, user.getId(), null).orElseThrow(() -> new BadRequestException("Post not found"));
    }

    public List<AchievementPostResponseDTO> getAllPosts(User user) {
        return convertToDTOList(achievementPostRepo.findAllByVisibleToUsers_IdOrIsPublicIsTrueAndDeletedByIsNullOrderByCreatedAtDesc(user.getId()));
    }

    public List<AchievementPostResponseDTO> getUserPosts(User user) {
        return convertToDTOList(achievementPostRepo.findAllByDeletedById(user.getId()));
    }

    public List<AchievementPostResponseDTO> getUserPostsByUserId(Long userId) {
        return convertToDTOList(achievementPostRepo.findAllByVisibleToUsers_IdOrIsPublicIsTrueAndDeletedByIsNullAndAuthor_IdOrderByCreatedAtDesc(userId, userId));
    }

    public List<AchievementPostResponseDTO> getPostsByTagId(Long tagId, User user) {
        return convertToDTOList(achievementPostRepo.findAllByVisibleToUsers_IdOrIsPublicIsTrueAndDeletedByIsNullAndAchievementPostTags_IdOrderByCreatedAtDesc(user.getId(), tagId));
    }

    @Transactional
    public void createPost(AchievementPostRequestDTO dto, User user) {
        achievementPostRepo.save(convertToEntity(dto, user));
    }

    @Transactional
    public void updatePost(Long postId, AchievementPostRequestDTO dto, User user) throws BadRequestException {
        AchievementPost oldPost = findById(postId, user);
        AchievementPost post = convertToEntity(dto, user);
        post.setId(postId);
        post.setCreatedAt(oldPost.getCreatedAt());
        post.setDeletedBy(oldPost.getDeletedBy());
        post.setRemarks(oldPost.getRemarks());
        achievementPostRepo.save(post);
    }

    @Transactional
    public void deletePost(Long postId, User user) throws BadRequestException {
        AchievementPost post = findById(postId, user);
        post.setDeletedBy(user);
        achievementPostRepo.save(post);
    }

    @Transactional
    public void deleteInappropriatePost(Long postId, User user, String remarks) throws BadRequestException {
        AchievementPost post = findById(postId, user);
        post.setDeletedBy(user);
        post.setRemarks(remarks);
        achievementPostRepo.save(post);
    }

    public List<AchievementPostCommentResponseDTO> getAllComments(Long postId, User user) {
        return achievementPostCommentService.getAllComments(postId, user);
    }

    public void addComment(Long postId, User user, AchievementPostCommentRequestDTO dto) throws BadRequestException {
        achievementPostCommentService.addComment(findById(postId), user, dto.getComment());
    }

    public void deleteComment(Long commentId, User user) throws BadRequestException {
        achievementPostCommentService.deleteComment(commentId, user);
    }

    public void deleteInAppropriateComment(Long commentId, User user, String remarks) throws BadRequestException {
        achievementPostCommentService.deleteInAppropriateComment(commentId, user, remarks);
    }

    public void toggleLike(Long postId, User user) throws BadRequestException {
        achievementPostLikeService.toggleLike(findById(postId), user);
    }

    public Object getPostLikes(Long postId) {
        return achievementPostLikeService.getPostLikes(postId);
    }

    public List<AchievementPostTagResponseDTO> searchTags(String query) {
        return achievementPostTagService.searchTags(query);
    }

}
