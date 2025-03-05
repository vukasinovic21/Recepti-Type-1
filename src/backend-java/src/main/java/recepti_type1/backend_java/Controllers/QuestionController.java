package recepti_type1.backend_java.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import recepti_type1.backend_java.Models.Question;
import recepti_type1.backend_java.Models.Recipe;
import recepti_type1.backend_java.Services.QuestionService;
import recepti_type1.backend_java.Services.RecipeService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/questions")
public class QuestionController
{
    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService)
    {
        this.questionService = questionService;
    }

    @GetMapping("/all")
    public List<Question> getAllQuestions()
    {
        return questionService.getAllQuestion();
    }

    @GetMapping("/id/{questionId}")
    public String getQuestionName(@PathVariable UUID questionId)
    {
        return questionService.getQuestionName(questionId);
    }
}
