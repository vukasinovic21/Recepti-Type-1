using Back.Domain.Models;
using Back.Domain.ValueObjects;
using System.Net;

namespace Back.Infrastructure.Data.Extentions
{
    internal class InitialData
    {
        public static IEnumerable<User> Users =>
           new List<User>
           {
               User.Create(UserId.Of(new Guid("58c49479-ec65-4de2-86e7-033c546291aa")),"Admin", "Admin", "Admin", "Admin@gmail.com", "$2a$11$5W4TW3T2F4BHyhZ.rNx/O.AUeA00AKCZsHHyQsfwBmTUrK4S7QNzm", QuestionId.Of(new Guid("47b38368-3cd1-76e6-db54-574c82929c34")), "AdminResponseHash", new DateOnly(2000, 4, 21), "Male"), //adminadmin
               User.Create(UserId.Of(new Guid("f8a9e484-65e9-4b01-94b6-7da073e9f43b")),"Ivana", "Vukasinovic", "Ivana", "i.vukasinovic69@gmail.com", "$2a$11$rTpBwB3G8GvzFAWF6OC8ietfvK.M.bFglE5UYVvOCQZNB0308Ah1q", QuestionId.Of(new Guid("47b38368-3cd1-76e6-db54-574c82929c34")), "BadiResponseHash", new DateOnly(1969, 7, 14), "Female") //123456789
           };

        public static IEnumerable<Ingredient> Ingredients =>
           new List<Ingredient>
           {
               Ingredient.Create(IngredientId.Of(new Guid("cb0c2b8a-dc5e-4c7f-a0f3-eb685273e786")),"Psenicno belo brasno", 76, 0.3m, 1, 10, 364, 85),
               Ingredient.Create(IngredientId.Of(new Guid("72d93899-9d29-43b0-9bc2-e004e9167ac8")),"Maslinovo ulje", 0, 0, 100, 0, 884, 0)
           };

        public static IEnumerable<Question> Questions =>
           new List<Question>
           {
               Question.Create(QuestionId.Of(new Guid("602bb193-501b-444d-9c34-b10341572bf3")),"Omiljeni sport"),
               Question.Create(QuestionId.Of(new Guid("b52121cc-db54-3cd1-76e6-122c546291bb")),"Ime prvog kucnog ljubimca"),
               Question.Create(QuestionId.Of(new Guid("47b38368-3cd1-76e6-db54-574c82929c34")),"Ime prvog ucitelja/uciteljice")
           };

        public static IEnumerable<TypeOfFood> TypesOfFood =>
           new List<TypeOfFood>
           {
               TypeOfFood.Create(TypeOfFoodId.Of(new Guid("0077d8c5-d107-41cc-9902-6423068c8672")),"Breakfast"),
               TypeOfFood.Create(TypeOfFoodId.Of(new Guid("0157dff4-e6ca-404f-a909-337315682158")),"Pies and Bakery"),
               TypeOfFood.Create(TypeOfFoodId.Of(new Guid("02c49479-ec65-86e7-4de2-033c546291aa")),"Cold Apetizer"),
               TypeOfFood.Create(TypeOfFoodId.Of(new Guid("0346291a-76e6-3cd1-db54-b41521ed91bb")),"Hot Apetizer"),
               TypeOfFood.Create(TypeOfFoodId.Of(new Guid("046cb8fd-c9c7-435c-ac00-d5b5c08169a8")),"Soup"),
               TypeOfFood.Create(TypeOfFoodId.Of(new Guid("05bb129c-d9d1-406d-ba8e-d2f0a43183e3")),"Main dish"),
               TypeOfFood.Create(TypeOfFoodId.Of(new Guid("06d56869-a5fd-41c0-8f38-d1092faae5b6")),"Cooked dish"),
               TypeOfFood.Create(TypeOfFoodId.Of(new Guid("07863f22-357d-4174-85cd-81fabfa707f3")),"Smoothie and drink"),
               TypeOfFood.Create(TypeOfFoodId.Of(new Guid("08a5ba31-df41-4175-bad5-5319cc8a12cf")),"Dessert"),
           };

        public static IEnumerable<TypeOfMeal> TypesOfMeal =>
           new List<TypeOfMeal>
           {
               TypeOfMeal.Create(TypeOfMealId.Of(new Guid("01a5ba31-d107-41cc-9902-7da073e9f43b")),"Breakfast"),
               TypeOfMeal.Create(TypeOfMealId.Of(new Guid("02863f22-e6ca-404f-a909-eb685273e786")),"Morning snack"),
               TypeOfMeal.Create(TypeOfMealId.Of(new Guid("03d56869-ec65-86e7-4de2-e004e9167ac8")),"Lunch"),
               TypeOfMeal.Create(TypeOfMealId.Of(new Guid("04bb129c-76e6-3cd1-db54-b41521ed91bb")),"Afternoon snack"),
               TypeOfMeal.Create(TypeOfMealId.Of(new Guid("056cb8fd-c9c7-435c-ac00-574c82929c34")),"Dinner"),
           };

        public static IEnumerable<Recipe> RecipeWithItems
        {
            get
            {
                var recipe = Recipe.Create(
                                RecipeId.Of(Guid.NewGuid()),
                                UserId.Of(new Guid("f8a9e484-65e9-4b01-94b6-7da073e9f43b")),
                                "Prvi recept",
                                TypeOfFoodId.Of(new Guid("0077d8c5-d107-41cc-9902-6423068c8672")),
                                "Pomesas 150g psenicnog belog brasna sa 50g maslinovog ulja",
                                10,
                                "defaultRecipe.jpg",
                                true);
                recipe.Add(IngredientId.Of(new Guid("cb0c2b8a-dc5e-4c7f-a0f3-eb685273e786")), 150);
                recipe.Add(IngredientId.Of(new Guid("72d93899-9d29-43b0-9bc2-e004e9167ac8")), 50);

                return new List<Recipe> { recipe };
            }
        }
    }
}
