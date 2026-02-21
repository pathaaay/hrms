package com.hrms.backend.service.achievementpost;

import com.hrms.backend.dto.achievementpost.comment.request.AchievementPostCommentRequestDTO;
import com.hrms.backend.dto.achievementpost.comment.response.AchievementPostCommentResponseDTO;
import com.hrms.backend.dto.achievementpost.request.AchievementPostRequestDTO;
import com.hrms.backend.dto.achievementpost.response.AchievementPostResponseDTO;
import com.hrms.backend.dto.achievementpost.tag.response.AchievementPostTagResponseDTO;
import com.hrms.backend.entities.achievementpost.AchievementPost;
import com.hrms.backend.entities.achievementpost.AchievementPostTag;
import com.hrms.backend.entities.job.Job;
import com.hrms.backend.entities.job.referral.JobReferral;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.achievementpost.AchievementPostRepo;
import com.hrms.backend.service.mail.MailService;
import com.hrms.backend.service.user.UserProfileService;
import com.hrms.backend.service.user.UserService;
import com.hrms.backend.utilities.Constants;
import jakarta.mail.MessagingException;
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
    private final UserService userService;
    private final MailService mailService;
    private final AchievementPostRepo achievementPostRepo;
    private final AchievementPostTagService achievementPostTagService;
    private final AchievementPostLikeService achievementPostLikeService;
    private final AchievementPostCommentService achievementPostCommentService;

    public AchievementPostResponseDTO convertToDTO(AchievementPost post, Long userId) {
        AchievementPostResponseDTO dto = modelMapper.map(post, AchievementPostResponseDTO.class);
        if (post.getAuthor() == null) dto.setAuthor(Constants.getSystemUser());
        dto.setLikesCount(achievementPostLikeService.getLikesCountByPostId(post.getId()));
        dto.setAchievementPostTags(post.getAchievementPostTags());
        dto.setIsLikedByUser(achievementPostLikeService.isLikedByUser(post.getId(), userId));
        dto.setCommentsCount(achievementPostCommentService.getCommentsCountByPostId(post.getId()));
        return dto;
    }

    public List<AchievementPostResponseDTO> convertToDTOList(List<AchievementPost> posts, Long userId) {
        return posts.stream().map(post -> convertToDTO(post, userId)).toList();
    }

    public AchievementPost convertToEntity(AchievementPostRequestDTO dto, User user) {
        AchievementPost post = modelMapper.map(dto, AchievementPost.class);
        Set<AchievementPostTag> tags = new HashSet<>();

        if (Boolean.FALSE.equals(dto.getIsPublic()) && dto.getVisibilityUserIds() != null) {
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
        if (user != null) {
            post.setAuthor(user);
        }
        if (!tags.isEmpty()) post.setAchievementPostTags(tags);
        return post;
    }

    public AchievementPost findById(Long postId) throws BadRequestException {
        return achievementPostRepo.findByIdAndDeletedBy_Id(postId, null).orElseThrow(() -> new BadRequestException("Post not found"));
    }

    public AchievementPost findById(Long postId, User user) throws BadRequestException {
        return achievementPostRepo.findByIdAndAuthor_IdAndDeletedBy_Id(postId, user.getId(), null).orElseThrow(() -> new BadRequestException("Post not found"));
    }

    public List<AchievementPostResponseDTO> getAllPosts(User user) {
        return convertToDTOList(achievementPostRepo.findAllByVisibleToUsers_IdOrIsPublicIsTrueAndDeletedByIsNullOrderByCreatedAtDesc(user.getId()), user.getId());
    }

    public List<AchievementPostResponseDTO> getUserPosts(User user) {
        return convertToDTOList(achievementPostRepo.findAllByDeletedById(user.getId()), user.getId());
    }

    public List<AchievementPostResponseDTO> getUserPostsByUserId(Long userId) {
        return convertToDTOList(achievementPostRepo.findAllByVisibleToUsers_IdOrIsPublicIsTrueAndDeletedByIsNullAndAuthor_IdOrderByCreatedAtDesc(userId, userId), userId);
    }

    public List<AchievementPostResponseDTO> getPostsByTagId(Long tagId, User user) {
        return convertToDTOList(achievementPostRepo.findAllByVisibleToUsers_IdOrIsPublicIsTrueAndDeletedByIsNullAndAchievementPostTags_IdOrderByCreatedAtDesc(user.getId(), tagId), user.getId());
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
    public void deleteInappropriatePost(Long postId, User user, String remarks) throws BadRequestException, MessagingException {
        AchievementPost post = findById(postId, user);
        post.setDeletedBy(user);
        post.setRemarks(remarks);
        achievementPostRepo.save(post);
        sendMailToHR(user, remarks, true, post.getAuthor().getEmail());
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

    @Transactional
    public void deleteInAppropriateComment(Long commentId, User user, String remarks) throws BadRequestException, MessagingException {
        String email = achievementPostCommentService.deleteInAppropriateComment(commentId, user, remarks);
        sendMailToHR(user, remarks, true, email);
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


    public void sendMailToHR(User user, String remarks, Boolean isPost, String toEmail) throws MessagingException {
        String[] toEmails = {toEmail};
        String htmlBody = """
                <div>Your %s is deleted by %s</div>
                <div>Remarks: %s</div>
                """.formatted(Boolean.TRUE.equals(isPost) ? "Post" : "Comment", user.getName(), remarks);

        mailService.sendEmail(toEmails, (Boolean.TRUE.equals(isPost) ? "Inappropriate post " : "Inappropriate comment ") + "removed by " + user.getName(), htmlBody);
    }

}
