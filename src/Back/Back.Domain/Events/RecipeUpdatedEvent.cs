﻿using Back.Domain.Abstractions;
using Back.Domain.Models;

namespace Back.Domain.Events
{
    public record RecipeUpdatedEvent(Recipe recipe) : IDomainEvent; //poslati svim userima koji su oznacili da im se recept koji se menja svidja
}
