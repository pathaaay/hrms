package com.hrms.backend.controller.achievementpost;

import com.hrms.backend.dto.achievementpost.comment.request.AchievementPostCommentRequestDTO;
import com.hrms.backend.dto.achievementpost.like.response.AchievementPostLikeResponseDTO;
import com.hrms.backend.dto.achievementpost.request.AchievementPostRequestDTO;
import com.hrms.backend.dto.achievementpost.response.AchievementPostResponseDTO;
import com.hrms.backend.dto.achievementpost.tag.response.AchievementPostTagResponseDTO;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.service.achievementpost.AchievementPostService;
import com.hrms.backend.utilities.ApiResponse;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/achievement-posts")
public class AchievementPostController {
    private final AchievementPostService achievementPostService;
    private static final String postGetSuccessfullyText = "Posts get successfully";

    @GetMapping()
    public ResponseEntity<ApiResponse<List<AchievementPostResponseDTO>>> getAllPosts(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(new ApiResponse<>(true, postGetSuccessfullyText, achievementPostService.getAllPosts(user)));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<List<AchievementPostResponseDTO>>> getUserPosts(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(new ApiResponse<>(true, postGetSuccessfullyText, achievementPostService.getUserPosts(user)));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<List<AchievementPostResponseDTO>>> getUserPosts(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(new ApiResponse<>(true, postGetSuccessfullyText, achievementPostService.getUserPostsByUserId(userId)));
    }

    @GetMapping("/tag/{tagId}")
    public ResponseEntity<ApiResponse<List<AchievementPostResponseDTO>>> getPostsByTagId(@AuthenticationPrincipal User user, @PathVariable("tagId") Long tagId) {
        return ResponseEntity.ok(new ApiResponse<>(true, postGetSuccessfullyText, achievementPostService.getPostsByTagId(tagId, user)));
    }

    @PostMapping()
    public ResponseEntity<ApiResponse> createPost(@AuthenticationPrincipal User user, @Valid @RequestBody AchievementPostRequestDTO dto) {
        achievementPostService.createPost(dto, user);
        return ResponseEntity.ok(new ApiResponse<>(true, "Post created successfully", null));
    }

    @PutMapping("/{postId}")
    public ResponseEntity<ApiResponse> updatePost(@PathVariable("postId") Long postId, @AuthenticationPrincipal User user, @Valid @RequestBody AchievementPostRequestDTO dto) throws BadRequestException {
        achievementPostService.updatePost(postId, dto, user);
        return ResponseEntity.ok(new ApiResponse<>(true, "Post updated successfully", null));
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<ApiResponse> deletePost(@AuthenticationPrincipal User user, @PathVariable("postId") Long postId) throws BadRequestException {
        achievementPostService.deletePost(postId, user);
        return ResponseEntity.ok(new ApiResponse<>(true, "Post deleted successfully", null));
    }

    @PreAuthorize("hasAnyRole('ROLE_MANAGER','ROLE_HR')")
    @DeleteMapping("/{postId}/inappropriate")
    public ResponseEntity<ApiResponse> deleteInappropriatePost(@AuthenticationPrincipal User user, @PathVariable("postId") Long postId, @RequestParam("remarks") String remarks) throws BadRequestException, MessagingException {
        achievementPostService.deleteInappropriatePost(postId, user, remarks);
        return ResponseEntity.ok(new ApiResponse<>(true, "Post deleted successfully", null));
    }

    @GetMapping("/comments/{postId}")
    public ResponseEntity<ApiResponse> addComment(@PathVariable("postId") Long postId, @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(new ApiResponse(true, "Post comments get successfully", achievementPostService.getAllComments(postId, user)));
    }

    @PostMapping("/comments/{postId}")
    public ResponseEntity<ApiResponse> addComment(@PathVariable("postId") Long postId, @AuthenticationPrincipal User user, @Valid @RequestBody AchievementPostCommentRequestDTO dto) throws BadRequestException {
        achievementPostService.addComment(postId, user, dto);
        return ResponseEntity.ok(new ApiResponse(true, "Post comment added successfully", null));
    }

    @DeleteMapping("/comments/{postId}/{commentId}")
    public ResponseEntity<ApiResponse> deleteComment(@PathVariable("commentId") Long commentId, @AuthenticationPrincipal User user) throws BadRequestException {
        achievementPostService.deleteComment(commentId, user);
        return ResponseEntity.ok(new ApiResponse(true, "comment deleted successfully", null));
    }

    @PreAuthorize("hasAnyRole('ROLE_MANAGER','ROLE_HR')")
    @DeleteMapping("/comments/{postId}/{commentId}/inappropriate")
    public ResponseEntity<ApiResponse> deleteInAppropriateComment(@PathVariable("commentId") Long commentId, @RequestParam("remarks") String remarks, @AuthenticationPrincipal User user) throws BadRequestException, MessagingException {
        achievementPostService.deleteInAppropriateComment(commentId, user, remarks);
        return ResponseEntity.ok(new ApiResponse(true, "comment deleted successfully", null));
    }

    @GetMapping("/likes/{postId}")
    public ResponseEntity<ApiResponse<List<AchievementPostLikeResponseDTO>>> getPostLikes(@PathVariable("postId") Long postId) {
        return ResponseEntity.ok(new ApiResponse(true, "Post like get successfully", achievementPostService.getPostLikes(postId)));
    }

    @PostMapping("/likes/{postId}")
    public ResponseEntity<ApiResponse> toggleLikes(@PathVariable("postId") Long postId, @AuthenticationPrincipal User user) throws BadRequestException {
        achievementPostService.toggleLike(postId, user);
        return ResponseEntity.ok(new ApiResponse(true, "Post like toggled successfully", null));
    }

    @GetMapping("/tags")
    public ResponseEntity<ApiResponse<List<AchievementPostTagResponseDTO>>> searchTags(@RequestParam("query") String query) {
        return ResponseEntity.ok(new ApiResponse<>(true, postGetSuccessfullyText, achievementPostService.searchTags(query)));
    }
}
