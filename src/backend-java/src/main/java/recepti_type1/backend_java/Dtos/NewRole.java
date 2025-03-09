package recepti_type1.backend_java.Dtos;

import java.util.UUID;

public class NewRole
{
    private UUID id;
    private String role;

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}
