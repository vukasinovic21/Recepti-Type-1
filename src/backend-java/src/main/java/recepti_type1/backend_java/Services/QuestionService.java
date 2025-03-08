package recepti_type1.backend_java.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import recepti_type1.backend_java.Models.Question;
import recepti_type1.backend_java.Models.User;
import recepti_type1.backend_java.Repositories.QuestionRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class QuestionService
{
    private final QuestionRepository questionRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository)
    {
        this.questionRepository = questionRepository;
    }

    public List<Question> getAllQuestion()
    {
        return questionRepository.findAll();
    }

    public String getQuestionName(UUID questionId)
    {
        Question q = questionRepository.findById(questionId)
                .orElseThrow(() -> new IllegalArgumentException("Question not found for ID: " + questionId));

        return q.getQuestionName();
    }

    public void addQuestion(Question q)
    {
        questionRepository.save(q);
    }
}
