using MediatR;

namespace Back.Domain.Abstractions
{
    public interface IDomainEvent : INotification
    {
        Guid EventId => Guid.NewGuid();
        public DateTime OccuredOn => DateTime.UtcNow;
#pragma warning disable CS8603 // Possible null reference return.
        public string EventType => GetType().AssemblyQualifiedName;
#pragma warning restore CS8603 // Possible null reference return.
    }
}
