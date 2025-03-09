package recepti_type1.backend_java.Dtos;

public class GeneralInfo
{
    private long numberOfRecipes;
    private long numberOfUsers;
    private long numberOfFoodTypes;

    public GeneralInfo() {}

    public GeneralInfo(long numberOfRecipes, long numberOfUsers, long numberOfFoodTypes)
    {
        this.numberOfRecipes = numberOfRecipes;
        this.numberOfUsers = numberOfUsers;
        this.numberOfFoodTypes = numberOfFoodTypes;
    }

    public long getNumberOfRecipes() {
        return numberOfRecipes;
    }

    public void setNumberOfRecipes(long numberOfRecipes) {
        this.numberOfRecipes = numberOfRecipes;
    }

    public long getNumberOfUsers() {
        return numberOfUsers;
    }

    public void setNumberOfUsers(long numberOfUsers) {
        this.numberOfUsers = numberOfUsers;
    }

    public long getNumberOfFoodTypes() {
        return numberOfFoodTypes;
    }

    public void setNumberOfFoodTypes(long numberOfFoodTypes) {
        this.numberOfFoodTypes = numberOfFoodTypes;
    }
}
