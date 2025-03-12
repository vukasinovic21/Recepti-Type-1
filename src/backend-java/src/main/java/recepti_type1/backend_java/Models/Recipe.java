package recepti_type1.backend_java.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;


@Entity
@Table(name = "\"Recipes\"")
public class Recipe
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID Id;
    @Column(name = "UserId")
    private String UserId;

    @Column(name = "RecipeName")
    private String RecipeName;
    
    private String TypeOfFoodId;
    private String Instructions;
    private int TimeToPrepare;
    private String Picture;
    private boolean Shared;
    private Date CreatedAt;

    @JsonIgnore
    @OneToMany(mappedBy = "RecipeId", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<RecipeItem> RecipeItems = new ArrayList<>();

    public Recipe() {}

    public Recipe(UUID id, String userId, String recipeName, String typeOfFoodId,
                  String instructions, int timeToPrepare, String picture, boolean shared, Date createdAt)
    {
        this.Id = id;
        this.UserId = userId;
        this.RecipeName = recipeName;
        this.TypeOfFoodId = typeOfFoodId;
        this.Instructions = instructions;
        this.TimeToPrepare = timeToPrepare;
        this.Picture = picture;
        this.Shared = shared;
        this.CreatedAt = createdAt;
        this.RecipeItems = new ArrayList<>();
    }

    public UUID getId() {
        return Id;
    }

    public void setId(UUID id) {
        this.Id = id;
    }

    public String getUserId() {
        return UserId;
    }

    public void setUserId(String userId) {
        this.UserId = userId;
    }

    public String getRecipeName() {
        return RecipeName;
    }

    public void setRecipeName(String recipeName) {
        this.RecipeName = recipeName;
    }

    public String getTypeOfFoodId() {
        return TypeOfFoodId;
    }

    public void setTypeOfFoodId(String typeOfFoodId) {
        this.TypeOfFoodId = typeOfFoodId;
    }

    public String getInstructions() {
        return Instructions;
    }

    public void setInstructions(String instructions) {
        this.Instructions = instructions;
    }

    public int getTimeToPrepare() {
        return TimeToPrepare;
    }

    public void setTimeToPrepare(int timeToPrepare) {
        this.TimeToPrepare = timeToPrepare;
    }

    public String getPicture() {
        return Picture;
    }

    public void setPicture(String picture) {
        this.Picture = picture;
    }

    public boolean isShared() {
        return Shared;
    }

    public void setShared(boolean shared) {
        this.Shared = shared;
    }

    public List<RecipeItem> getRecipeItems() {
        return RecipeItems;
    }

    public void setRecipeItems(List<RecipeItem> recipeItems) {
        this.RecipeItems = recipeItems;
    }

    public Date getCreatedAt() {
        return CreatedAt;
    }

    public void setCreatedAt(Date createdAt) {
        CreatedAt = createdAt;
    }
}
