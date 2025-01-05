using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Fretefy.Test.Domain.DTOs
{
    public class RegiaoCreateDTO 
    {
        [JsonProperty("id")]
        public Guid Id { get; set; }
     
        [JsonProperty("nome")]
        public string Nome { get; set; }
        
        [JsonProperty("active")]
        public bool Active { get; set; }

        [JsonProperty("cidades")]
        public List<Guid> Cidades { get; set; }
        
    }
}