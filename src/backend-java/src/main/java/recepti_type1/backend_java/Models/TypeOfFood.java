package recepti_type1.backend_java.Models;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "TypesOfFood")
public class TypeOfFood
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID Id;
    private String TypeName;

    public TypeOfFood() {}

    public TypeOfFood(UUID id, String typeName)
    {
        if (typeName == null || typeName.trim().isEmpty())
        {
            throw new IllegalArgumentException("TypeName for TypeOfFood cannot be null or empty.");
        }
        this.Id = id;
        this.TypeName = typeName;
    }

    public UUID getId() {
        return Id;
    }

    public void setId(UUID id) {
        this.Id = id;
    }

    public String getTypeName() {
        return TypeName;
    }

    public void setTypeName(String typeName) {
        this.TypeName = typeName;
    }
}
