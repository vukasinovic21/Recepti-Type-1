namespace Back.Application.Recipes.EventHandlers
{
    public class RecipeUpdatedEventHandler(ILogger<RecipeUpdatedEventHandler> logger)
        : INotificationHandler<RecipeUpdatedEvent>
    {
        public Task Handle(RecipeUpdatedEvent notification, CancellationToken cancellationToken)
        {
            logger.LogInformation("Domain Event handler: {DomainEvent}", notification.GetType().Name);
            return Task.CompletedTask;
        }
    }
}
