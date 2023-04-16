namespace Domain.Model
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
        public int TargetId { get; set; }
        public virtual TargetMuscle TargetMuscle { get; set; }

    }
}
