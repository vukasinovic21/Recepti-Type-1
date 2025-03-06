package recepti_type1.backend_java.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import recepti_type1.backend_java.Dtos.ForgotPassword;
import recepti_type1.backend_java.Dtos.UserInfoUpdate;
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

    @GetMapping("/email/{email}") //za poslat email korisnika da dobijemo podatke o korisniku
    public User getUserByEmail(@PathVariable String email)
    {
        return userService.getUserByEmail(email);
    }

    @GetMapping("/question/{email}") //za poslat email korisnika da dobijemo njegovo sigurnosno pitanje
    public String getQuestionByEmail(@PathVariable String email)
    {
        User u = userService.getUserByEmail(email);
        return questionService.getQuestionName(u.getQuestionId());
    }

    @GetMapping("/questionId/{questionId}") //za poslat id pitanja dobijamo sigurnosno pitanje
    public String getQuestionName(@PathVariable UUID questionId)
    {
        return questionService.getQuestionName(questionId);
    }

    @PostMapping("/answer") //when user forgot their password and want to reset it with email and safety question
    public Boolean getAnswerByEmail(@RequestBody ForgotPassword loginUser)
    {
        User u = userService.getUserByEmail(loginUser.getEmail());
        if(userService.verifyPassword(loginUser.getQuestion(),u.getForgotPasswordAnswerHash()))
        {
            String PasswordHash = userService.hashPassword(loginUser.getPasswordHash()); //this encoded password needs to go in the postgre database as new password

            u.setPasswordHash(PasswordHash);
            userService.savePassword(u);// i need to add ModifiedAt so i could change the date of the last change

            return true;
        }
        return false;
    }

    @PutMapping("/infoupdate") //updating user info like username and similar
    public Boolean updateUserInfo(@RequestBody UserInfoUpdate userUpdate)
    {
        //System.out.println(userUpdate.getName() + " " + userUpdate.getEmail());
        User u = userService.getUserById(userUpdate.getId());


        u.setName(userUpdate.getName());// i need to add ModifiedAt so i could change the date of the last change
        u.setLastName(userUpdate.getLastname());
        u.setUsername(userUpdate.getUsername());
        u.setDateOfBirth(userUpdate.getDateOfBirth());

        userService.updateUser(u);

        //System.out.println(u.getName() + " " + u.getEmail());
        return true;
    }
}
