using Domain.Model;

namespace Repository.Contracts
{
    public interface ITargetMuscleRepository
    {
        void AddTargetMuscle(TargetMuscle targetMuscle);
    }
}
