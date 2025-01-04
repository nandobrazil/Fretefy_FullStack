using Fretefy.Test.Domain.Entities;
using Fretefy.Test.Domain.Interfaces;
using Fretefy.Test.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Fretefy.Test.Domain.Services
{
    public class RegiaoService : IRegiaoService
    {
        private readonly IRegiaoRepository _regiaoRepository;

        public RegiaoService(IRegiaoRepository regiaoRepository)
        {
            _regiaoRepository = regiaoRepository;
        }

        public Regiao Get(Guid id)
        {
            return _regiaoRepository.List().FirstOrDefault(f => f.Id == id);
        }

        public IEnumerable<Regiao> List()
        {
            return _regiaoRepository.List();
        }
        
        public Regiao Post(Regiao regiao)
        {
            return _regiaoRepository.Post(regiao);
        }

    }
}
