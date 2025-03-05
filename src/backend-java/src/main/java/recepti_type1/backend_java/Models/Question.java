package recepti_type1.backend_java.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.UUID;

@Entity
@Table(name = "\"Questions\"")
public class Question
{
    @Id
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
