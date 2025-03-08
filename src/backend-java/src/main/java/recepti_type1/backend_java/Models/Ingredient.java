package recepti_type1.backend_java.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.UUID;

@Entity
@Table(name = "\"Ingredients\"")
public class Ingredient
{
    @Id
    private UUID Id;
    private String Name;
    private Float Carbs;
    private Float Sugar;
    private Float Fat;
    private Float Protein;
    private Float kCal;
    private Float GI; // Glycemic Index

    public Ingredient() {}

    public Ingredient(UUID id, String name, Float carbs, Float sugar,
                      Float fat, Float protein, Float kcal, Float gi)
    {
        this.Id = id;
        this.Name = name;
        this.Carbs = carbs;
        this.Sugar = sugar;
        this.Fat = fat;
        this.Protein = protein;
        this.kCal = kcal;
        this.GI = gi;
    }

    public UUID getId() {
        return Id;
    }

    public String getName() {
        return Name;
    }

    public Float getCarbs() {
        return Carbs;
    }

    public Float getSugar() {
        return Sugar;
    }

    public Float getFat() {
        return Fat;
    }

    public Float getProtein() {
        return Protein;
    }

    public Float getKcal() {
        return kCal;
    }

    public Float getGi() {
        return GI;
    }

    public static Ingredient create(UUID id, String name, Float carbs, Float sugar,
                                    Float fat, Float protein, Float kcal, Float gi)
    {
        return new Ingredient(id, name, carbs, sugar, fat, protein, kcal, gi);
    }
}
