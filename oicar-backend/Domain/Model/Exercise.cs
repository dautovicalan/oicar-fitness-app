﻿namespace Domain.Model
{
    public class Exercise
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string GifUrl { get; set; }
        public int BodyPartId { get; set; }
        public virtual BodyPart BodyPart { get; set; }
        public int EquipmentId { get; set; }
        public virtual Equipment Equipment { get; set; }
        public int TargetMuscleId { get; set; }
        public virtual TargetMuscle TargetMuscle { get; set; }
        public virtual ICollection<ExerciseProgress> ExerciseProgress { get; } = new List<ExerciseProgress>();
        public virtual ICollection<CustomWorkout> CustomWorkouts { get; } = new List<CustomWorkout>();

    }
}
