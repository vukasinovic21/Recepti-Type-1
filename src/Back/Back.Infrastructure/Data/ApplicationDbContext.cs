﻿using Back.Application.Data;
using Back.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Back.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
            : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Ingredient> Ingredients => Set<Ingredient>();
        public DbSet<Recipe> Recipes => Set<Recipe>();
        public DbSet<RecipeItem> RecipeItems => Set<RecipeItem>();
        public DbSet<Question> Questions => Set<Question>();
        public DbSet<TypeOfFood> TypesOfFood => Set<TypeOfFood>();
        public DbSet<Like> Likes => Set<Like>();
        public DbSet<Diet> Diets => Set<Diet>();
        public DbSet<TypeOfMeal> TypesOfMeal => Set<TypeOfMeal>();
        public DbSet<PlanOfDiet> PlanOfDiets => Set<PlanOfDiet>();
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            base.OnModelCreating(builder);
        }
    }
}
