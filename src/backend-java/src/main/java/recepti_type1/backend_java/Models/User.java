package recepti_type1.backend_java.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "\"Users\"")
public class User
{
    @Id
    private UUID Id;
    private String Name;
    private String LastName;
    private String Username;
    @Column(name = "\"Email\"")
    private String Email;
    private UUID QuestionId;
    private LocalDateTime CreatedAt;
    private LocalDate DateOfBirth;
    private String Role;
    private String Sex;

    public User(){}

    public User(UUID id, String name, String lastName, String username, String email,
                UUID questionId, LocalDateTime createdAt, LocalDate dateOfBirth, String role, String sex)
    {
        this.Id = id;
        this.Name = name;
        this.LastName = lastName;
        this.Username = username;
        this.Email = email;
        this.QuestionId = questionId;
        this.CreatedAt = createdAt;
        this.DateOfBirth = dateOfBirth;
        this.Role = role;
        this.Sex = sex;
    }

    public UUID getId()
    {
        return Id;
    }

    public String getName() {
        return Name;
    }

    public String getLastName() {
        return LastName;
    }

    public String getUsername() {
        return Username;
    }

    public String getEmail() {
        return Email;
    }

    public UUID getQuestionId() {
        return QuestionId;
    }

    public LocalDateTime getCreatedAt() {
        return CreatedAt;
    }

    public LocalDate getDateOfBirth() {
        return DateOfBirth;
    }

    public String getRole() {
        return Role;
    }

    public String getSex() {
        return Sex;
    }

    public void setId(UUID id)
    {
        this.Id = id;
    }

    public void setName(String name) {
        this.Name = name;
    }

    public void setLastName(String lastName) {
        this.LastName = lastName;
    }

    public void setUsername(String username) {
        this.Username = username;
    }

    public void setEmail(String email) {
        this.Email = email;
    }

    public void setQuestionId(UUID questionId) {
        this.QuestionId = questionId;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.CreatedAt = createdAt;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.DateOfBirth = dateOfBirth;
    }

    public void setRole(String role) {
        this.Role = role;
    }

    public void setSex(String sex) {
        this.Sex = sex;
    }
}
