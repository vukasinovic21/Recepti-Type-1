using Back.Domain.Abstractions;
using Back.Domain.Models;

namespace Back.Domain.Events
{
    public record RecipeCreatedEvent(Recipe recipe) : IDomainEvent; //poslati svim userima 

}
