using System;
using Fretefy.Test.Domain.Entities;
using Newtonsoft.Json;

namespace Fretefy.Test.Domain.DTOs
{
    public class CidadeListDTO
    {
        [JsonProperty("id")]
        public Guid Id { get; set; }
     
        [JsonProperty("nome")]
        public string Nome { get; set; }
        
        [JsonProperty("uf")]
        public string Uf { get; set; }

        public CidadeListDTO(Cidade cidade)
        {
            Id = cidade.Id;
            Nome = cidade.Nome;
            Uf = cidade.UF;
        }
    }
}