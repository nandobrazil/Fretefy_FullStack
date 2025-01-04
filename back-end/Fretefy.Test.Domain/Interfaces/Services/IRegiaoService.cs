using Fretefy.Test.Domain.Entities;
using System;
using System.Collections.Generic;

namespace Fretefy.Test.Domain.Interfaces
{
    public interface IRegiaoService
    {
        Regiao Get(Guid id);
        IEnumerable<Regiao> List();
        
    }
}