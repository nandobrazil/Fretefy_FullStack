using System;
using System.Collections.Generic;

namespace Fretefy.Test.Domain.Entities
{
    public class Regiao : IEntity
    {
        public Regiao()
        {
        
        }

        public Regiao(string nome, bool active)
        {
            Id = Guid.NewGuid();
            Nome = nome;
            Active = active;
        }

        public Guid Id { get; set; }

        public string Nome { get; set; }

        public bool Active { get; set; }
        
        public virtual List<Cidade> Cidades { get; set; }
    }
}
