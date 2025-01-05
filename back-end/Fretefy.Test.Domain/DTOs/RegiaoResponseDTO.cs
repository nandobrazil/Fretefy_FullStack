using System;
using System.Collections.Generic;
using Fretefy.Test.Domain.Entities;
using Newtonsoft.Json;

namespace Fretefy.Test.Domain.DTOs
{
    public class RegiaoResponseDTO
    {
        [JsonProperty("id")]
        public Guid Id { get; set; }
     
        [JsonProperty("nome")]
        public string Nome { get; set; }
        
        [JsonProperty("active")]
        public bool Active { get; set; }

        [JsonProperty("cidades")]
        public List<CidadeListDTO> Cidades { get; set; }
        
        public RegiaoResponseDTO(Regiao regiao, List<Cidade> cidades)
        {
            Id = regiao.Id;
            Nome = regiao.Nome;
            Active = regiao.Active;
            Cidades = new List<CidadeListDTO>();
            foreach (var cidade in cidades)
            {
                Cidades.Add(new CidadeListDTO(cidade));
            }
        }
    }
}