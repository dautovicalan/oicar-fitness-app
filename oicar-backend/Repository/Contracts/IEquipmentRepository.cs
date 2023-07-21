using Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Contracts
{
    public interface IEquipmentRepository
    {
        void AddEquipment(Equipment equipment);
        Task<List<Equipment>> GetAllAsync();
    }
}
