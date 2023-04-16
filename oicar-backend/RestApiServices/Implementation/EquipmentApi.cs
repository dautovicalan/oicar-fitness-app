using Azure;
using Domain.Model;
using RestApiServices.Contracts;
using System.Net.Http.Json;

namespace RestApiServices.Implementation
{
    public class EquipmentApi : IEquipmentApi
    {
        private HttpClient _httpClient;

        public EquipmentApi(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<Equipment>> GetAllEquipments()
        {
            var client = new HttpClient();
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("https://exercisedb.p.rapidapi.com/exercises/equipmentList"),
                Headers =
             {
             { "X-RapidAPI-Key", "ab267afb78msh0546de125f2a974p1ef3efjsn5e77978e446a" },
             { "X-RapidAPI-Host", "exercisedb.p.rapidapi.com" },
                },
            };

           var response = await client.SendAsync(request);
            return await response.Content.ReadFromJsonAsync<IEnumerable<Equipment>>();
            //using (var response = await client.SendAsync(request))
            //{
            //    response.EnsureSuccessStatusCode();
            //    var body = await response.Content.ReadAsStringAsync();
            //    Console.WriteLine(body);
            //}
        }
    }
}
