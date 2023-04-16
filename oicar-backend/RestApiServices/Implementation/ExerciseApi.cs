using RestApiServices.Contracts;
using System.Net.Http.Json;

namespace RestApiServices.Implementation
{
    public class ExerciseApi : IExerciseApi
    {
        private HttpClient _httpClient;

        public ExerciseApi(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<string>> GetAllBodyParts()
        {
            var endpointUrl = "https://exercisedb.p.rapidapi.com/exercises/bodyPartList";
            return await SendRequest<IEnumerable<string>>(endpointUrl);
        }

        public async Task<IEnumerable<string>> GetAllEquipments()
        {
            var endpointUrl = "https://exercisedb.p.rapidapi.com/exercises/equipmentList";
            return await SendRequest<IEnumerable<string>>(endpointUrl);
        }

        public async Task<IEnumerable<string>> GetAllTargetMuscles()
        {
            var endpointUrl = "https://exercisedb.p.rapidapi.com/exercises/targetList";
            return await SendRequest<IEnumerable<string>>(endpointUrl);
        }

        private async Task<T> SendRequest<T>(string endpointUrl)
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri(endpointUrl),
                Headers =
        {
            { "X-RapidAPI-Key", "ab267afb78msh0546de125f2a974p1ef3efjsn5e77978e446a" },
            { "X-RapidAPI-Host", "exercisedb.p.rapidapi.com" },
        },
            };

            var response = await client.SendAsync(request);
            response.EnsureSuccessStatusCode();
            return await response.Content.ReadFromJsonAsync<T>() ?? throw new Exception(response.StatusCode.ToString());
        }
    }
}
