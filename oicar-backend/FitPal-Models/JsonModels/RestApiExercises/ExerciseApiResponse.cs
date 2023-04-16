using System.Text.Json.Serialization;

namespace FitPal_Models.JsonModels.RestApiExercises
{
    public class ExerciseResponse
    {
        [JsonPropertyName("bodyPart")]
        public string bodyPart { get; set; }

        [JsonPropertyName("equipment")]
        public string equipment { get; set; }

        [JsonPropertyName("gifUrl")]
        public string gifUrl { get; set; }

        [JsonPropertyName("id")]
        public string id { get; set; }

        [JsonPropertyName("name")]
        public string name { get; set; }

        [JsonPropertyName("target")]
        public string target { get; set; }
    }
}
