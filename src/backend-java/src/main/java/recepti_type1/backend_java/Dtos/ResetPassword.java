package recepti_type1.backend_java.Dtos;

import lombok.Data;

import java.util.UUID;

@Data
public class ResetPassword
{
    private UUID id;
    private String oldPasswordHash;
    private String passwordHash;
    private String passwordHash2;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getOldPasswordHash() {
        return oldPasswordHash;
    }

    public void setOldPasswordHash(String oldPasswordHash) {
        this.oldPasswordHash = oldPasswordHash;
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
}
