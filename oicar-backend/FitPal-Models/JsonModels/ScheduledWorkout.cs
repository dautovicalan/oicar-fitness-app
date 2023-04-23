using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace FitPal_Models.JsonModels
{
    public class ScheduledWorkout
    {
        public int userId { get; set; }
        [JsonIgnore]
        public DateTime? WorkoutDate { set { workoutdate = value == null ? "" : value.Value.ToString("dd.MM.yyyy"); } }
        private string workoutdate { get; set; }
    }
}
