package recepti_type1.backend_java.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import recepti_type1.backend_java.Dtos.AddQuestionAndType;
import recepti_type1.backend_java.Models.Question;
import recepti_type1.backend_java.Services.QuestionService;

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

    @PostMapping("/add") //for admin to add new safety question
    public Boolean addQuestion(@RequestBody AddQuestionAndType newQuestion) //we need to make sure that new question is not in the db already
    {
        /*if (questionService.existsByName(name))
        {
            return false;
        }*/
        Question q = new Question();
        q.setQuestionName(newQuestion.getName());

        System.out.println(q.getQuestionName());
        questionService.addQuestion(q);

        return true;
    }
}
