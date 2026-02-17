package com.hrms.backend.service.travel.expense;

import com.hrms.backend.dto.travel.expense.request.TravelExpenseRequestDTO;
import com.hrms.backend.dto.travel.expense.request.TravelExpenseStatusDTO;
import com.hrms.backend.dto.travel.expense.response.TravelExpenseResponseDTO;
import com.hrms.backend.entities.travel.Travel;
import com.hrms.backend.entities.travel.expense.TravelExpense;
import com.hrms.backend.entities.travel.expense.TravelExpenseCategory;
import com.hrms.backend.entities.user.User;
import com.hrms.backend.repository.travel.expense.TravelExpenseRepo;
import com.hrms.backend.service.document.DocumentService;
import com.hrms.backend.service.mail.MailService;
import com.hrms.backend.service.travel.TravelService;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TravelExpenseService {
    private final ModelMapper modelMapper;
    private final TravelService travelService;
    private final DocumentService documentService;
    private final MailService mailService;
    private final TravelExpenseRepo travelExpenseRepo;
    private final TravelExpenseCategoryService travelExpenseCategoryService;
    private final TravelExpenseStatusLogService travelExpenseStatusLogService;

    private TravelExpense convertToEntity(TravelExpenseRequestDTO dto, User user, Long travelId) throws BadRequestException {
        TravelExpense expense = modelMapper.map(dto, TravelExpense.class);
        Travel travel = travelService.findById(travelId);
        TravelExpenseCategory expenseCategory = travelExpenseCategoryService.findById(dto.getExpenseCategoryId());
        validateExpenseDate(dto.getExpenseDate(), travel);

        Long totalExpense = travelExpenseRepo.getExpenseTotalByDate(dto.getExpenseDate());

        log.info("totalExpense : {}", totalExpense);

        if (dto.getAmount() > travel.getMaxAmountPerDay())
            throw new BadRequestException("Expense amount is too high for this travel");

        if (totalExpense + dto.getAmount() > travel.getMaxAmountPerDay())
            throw new BadRequestException("You have exceeded the limit of expenses on " + dto.getExpenseDate() + " for this travel");

        if (dto.getAmount() > expenseCategory.getMaxAmount())
            throw new BadRequestException("Expense amount is too high for this category");

        expense.setCreatedBy(user);
        expense.setIsDeleted(false);
        expense.setTravel(travel);
        expense.setExpenseProofDocument(documentService.findById(dto.getProofDocumentId()));
        expense.setExpenseCategory(expenseCategory);
        return expense;
    }

    private TravelExpenseResponseDTO convertToDTO(TravelExpense expense) {
        return modelMapper.map(expense, TravelExpenseResponseDTO.class);
    }

    private List<TravelExpenseResponseDTO> convertToDTOList(List<TravelExpense> expenses) {
        return expenses.stream().map(this::convertToDTO).toList();
    }

    public TravelExpense findById(Long id) throws BadRequestException {
        return travelExpenseRepo.findByIdAndIsDeleted(id, false).orElseThrow(() -> new BadRequestException("Expense not found for travel"));
    }

    public List<TravelExpenseResponseDTO> getAllTravelExpenses(Long travelId) {
        return convertToDTOList(travelExpenseRepo.findAllByTravel_IdAndIsDeleted(travelId, false));
    }

    public List<TravelExpenseResponseDTO> getUserAllTravelExpenses(Long travelId, User user) {
        return convertToDTOList(travelExpenseRepo.findAllByTravel_IdAndIsDeletedAndCreatedBy_Id(travelId, false, user.getId()));
    }

    public void createTravelExpense(TravelExpenseRequestDTO dto, User user, Long travelId) throws BadRequestException, MessagingException {
        TravelExpense expense = travelExpenseRepo.save(convertToEntity(dto, user, travelId));
        notifyToHr(expense.getTravel(), expense, false);
    }

    public void updateTravelExpense(TravelExpenseRequestDTO dto, User user, Long travelId, Long travelExpenseId) throws BadRequestException, MessagingException {
        TravelExpense oldExpense = findById(travelExpenseId);
        TravelExpense expense = convertToEntity(dto, user, travelId);
        expense.setCreatedAt(oldExpense.getCreatedAt());
        expense.setId(travelExpenseId);
        travelExpenseRepo.save(expense);
        notifyToHr(expense.getTravel(), expense, true);
    }

    @Transactional
    public void updateTravelExpenseStatus(User user, Long travelExpenseId, TravelExpenseStatusDTO dto) throws BadRequestException {
        TravelExpense expense = findById(travelExpenseId);

        if (Boolean.FALSE.equals(dto.getIsApproved()) && (dto.getRemarks() == null || dto.getRemarks().isBlank()))
            throw new BadRequestException("Remarks is required while rejecting an expense");

        expense.setIsApproved(dto.getIsApproved());
        expense.setRemarks(dto.getRemarks());
        travelExpenseStatusLogService.createLog(expense, user);
    }

    public void deleteTravelExpense(Long travelExpenseId) {
        travelExpenseRepo.findAndDeleteById(travelExpenseId);
    }

    public void notifyToHr(Travel travel, TravelExpense expense, Boolean isUpdated) throws MessagingException {
        String[] toEmails = {travel.getCreatedBy().getEmail()};
        String subject = Boolean.TRUE.equals(isUpdated) ? "Expense Updated" : "New Expense";
        String htmlBody = """
                <div>
                <div>Added by: %s</div>
                <div>Added by email: %s</div>
                <div>Description: %s</div>
                <div>Amount: %s</div>
                <div>Expense Date: %s</div>
                <div>Expense Category: %s</div>
                <div>
                    <div>Travel Title:%s</div>
                    <div>Travel Description:%s</div>
                    <div>Travel Location:%s</div>
                </div>
                </div>
                """.formatted(expense.getCreatedBy().getName(), expense.getCreatedBy().getEmail(), expense.getDescription(), expense.getAmount(), expense.getExpenseDate(), expense.getExpenseCategory().getName(), travel.getTitle(), travel.getDescription(), "City: " + travel.getCity().getName() + " | State: " + travel.getCity().getState().getName() + " | Country: " + travel.getCity().getState().getCountry().getName());

        mailService.sendEmail(toEmails, subject + " : " + travel.getTitle(), htmlBody);
    }

    private void validateExpenseDate(Date expenseDate, Travel travel) throws BadRequestException {
        Date today = new Date();
        int diffInDays = getDiffInDays(expenseDate, travel, today);
        if (diffInDays > 10)
            throw new BadRequestException("You cannot add/modify expense. Travel is ended before 10 days.");
    }

    private static int getDiffInDays(Date expenseDate, Travel travel, Date today) throws BadRequestException {
        Date travelStartDate = travel.getStartDate();
        Date travelEndDate = travel.getEndDate();

        if (travelStartDate.getTime() > today.getTime())
            throw new BadRequestException("You cannot add/modify expense because travel is not started yet");

        if (expenseDate.getTime() > today.getTime())
            throw new BadRequestException("You cannot add/modify expenses of future date");

        return (int) ((today.getTime() - travelEndDate.getTime())
                / (1000 * 60 * 60 * 24));
    }
}
