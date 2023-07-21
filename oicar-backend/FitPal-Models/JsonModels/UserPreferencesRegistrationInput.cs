using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitPal_Models.JsonModels
{
    public class UserPreferencesInput
    {
        public int Height { get; set; }
        public int Weight { get; set; }
        public string Goal { get; set; }
        public int WorkoutNumberPerWeek { get; set; }
        public int UserId { get; set; }
        public bool Newsletter { get; set; }
    }
}
