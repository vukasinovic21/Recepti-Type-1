package recepti_type1.backend_java.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import recepti_type1.backend_java.Models.Question;
import recepti_type1.backend_java.Models.User;
import recepti_type1.backend_java.Services.QuestionService;
import recepti_type1.backend_java.Services.UserService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
public class UserController
{
    private final UserService userService;
    private final QuestionService questionService;

    @Autowired
    public UserController(UserService userService, QuestionService questionService)
    {
        this.userService = userService;
        this.questionService = questionService;
    }

    @GetMapping("/all")
    public List<User> getAllUsers()
    {
        return userService.getAllUsers();
    }

    @GetMapping("/id/{userId}")
    public User getUserById(@PathVariable UUID userId)
    {
        return userService.getUserById(userId);
    }

    @GetMapping("/questionId/{questionId}")
    public String getQuestionName(@PathVariable UUID questionId)
    {
        return questionService.getQuestionName(questionId);
    }
}
