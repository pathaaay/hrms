package com.hrms.backend.service.achievementpost;

import com.hrms.backend.dto.achievementpost.comment.response.AchievementPostCommentResponseDTO;
import com.hrms.backend.entities.achievementpost.AchievementPost;
import com.hrms.backend.entities.achievementpost.AchievementPostComment;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.achievementpost.AchievementPostCommentRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AchievementPostCommentService {
    private final ModelMapper modelMapper;
    private final AchievementPostCommentRepo achievementPostCommentRepo;

    public AchievementPostCommentResponseDTO convertToDTO(AchievementPostComment comment) {
        return modelMapper.map(comment, AchievementPostCommentResponseDTO.class);
    }

    public List<AchievementPostCommentResponseDTO> convertToDTOList(List<AchievementPostComment> comments) {
        return comments.stream().map(this::convertToDTO).toList();
    }

    public AchievementPostComment findById(Long commentId) throws BadRequestException {
        return achievementPostCommentRepo.findByIdAndDeletedByIsNull(commentId).orElseThrow(() -> new BadRequestException("Comment not found"));
    }

    public Long getCommentsCountByPostId(Long postId) {
        return achievementPostCommentRepo.getCommentsCountByPostId(postId);
    }

    public List<AchievementPostCommentResponseDTO> getAllComments(Long postId, User user) {
        return convertToDTOList(achievementPostCommentRepo.findAllByPostId(postId, user.getId()));
    }

    @Transactional
    public void addComment(AchievementPost post, User user, String comment) {
        AchievementPostComment newComment = new AchievementPostComment();
        newComment.setAuthor(user);
        newComment.setPost(post);
        newComment.setComment(comment);
        achievementPostCommentRepo.save(newComment);
    }

    @Transactional
    public void deleteComment(Long commentId, User user) throws BadRequestException {
        AchievementPostComment comment = findById(commentId);
        if (!comment.getAuthor().getId().equals(user.getId())) throw new BadRequestException("Comment not found");

        comment.setDeletedBy(user);
        achievementPostCommentRepo.save(comment);
    }

    @Transactional
    public void deleteInAppropriateComment(Long commentId, User user, String remarks) throws BadRequestException {
        AchievementPostComment comment = findById(commentId);
        comment.setDeletedBy(user);
        comment.setRemarks(remarks);
        achievementPostCommentRepo.save(comment);
    }
}
