namespace Back.Application.Recipes.EventHandlers
{
    public class RecipeCreatedEventHandler(ILogger<RecipeCreatedEventHandler> logger)
        : INotificationHandler<RecipeCreatedEvent>
    {
        public Task Handle(RecipeCreatedEvent notification, CancellationToken cancellationToken)
        {
            logger.LogInformation("Domain Event handler: {DomainEvent}", notification.GetType().Name);
            return Task.CompletedTask;
        }
    }
}
