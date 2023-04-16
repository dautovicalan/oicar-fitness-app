using Domain.Model;

namespace Repository.Contracts
{
    public interface IBodyPartRepository
    {
        void AddBodyPart(BodyPart bodyPart);
    }
}
