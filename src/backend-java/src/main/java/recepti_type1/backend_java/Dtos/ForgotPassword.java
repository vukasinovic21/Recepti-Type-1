package recepti_type1.backend_java.Dtos;

public class ForgotPassword
{
    private String email;
    private String passwordHash;
    private String passwordHash2;
    private String question;

    public ForgotPassword() {}

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getPasswordHash2() {
        return passwordHash2;
    }

    public void setPasswordHash2(String passwordHash2) {
        this.passwordHash2 = passwordHash2;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}
