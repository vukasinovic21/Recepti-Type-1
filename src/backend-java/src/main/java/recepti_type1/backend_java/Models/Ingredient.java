package recepti_type1.backend_java.Models;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "\"Ingredients\"")
public class Ingredient
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID Id;
    private String Name;
    private Float Carbs;
    private Float Sugar;
    private Float Fat;
    private Float Protein;
    private Float kCal;
    private Float GI; // Glycemic Index

    public Ingredient() {}

    public Ingredient(Ingredient i)
    {
        this.Name = i.Name;
        this.Carbs = i.Carbs;
        this.Sugar = i.Sugar;
        this.Fat = i.Fat;
        this.Protein = i.Protein;
        this.kCal = i.kCal;
        this.GI = i.GI;
    }

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


    public void setId(UUID id) {
        Id = id;
    }

    public void setName(String name) {
        Name = name;
    }

    public void setCarbs(Float carbs) {
        Carbs = carbs;
    }

    public void setSugar(Float sugar) {
        Sugar = sugar;
    }

    public void setFat(Float fat) {
        Fat = fat;
    }

    public void setProtein(Float protein) {
        Protein = protein;
    }

    public void setGI(Float GI) {
        this.GI = GI;
    }

    public void setkCal(Float kCal) {
        this.kCal = kCal;
    }
}
