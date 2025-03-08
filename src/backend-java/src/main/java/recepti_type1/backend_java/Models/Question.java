package recepti_type1.backend_java.Models;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "\"Questions\"")
public class Question
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID Id;
    private String QuestionName;

    public Question() {}

    public Question(UUID id, String questionName)
    {
        this.Id = id;
        this.QuestionName = questionName;
    }

    public UUID getId() {
        return Id;
    }

    public void setId(UUID id) {
        this.Id = id;
    }

    public String getQuestionName() {
        return QuestionName;
    }

    public void setQuestionName(String questionName) {
        this.QuestionName = questionName;
    }
}
