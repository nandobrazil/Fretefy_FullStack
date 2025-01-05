using Fretefy.Test.Domain.Entities;
using Fretefy.Test.Domain.Interfaces;
using Fretefy.Test.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using Fretefy.Test.Domain.DTOs;

namespace Fretefy.Test.Domain.Services
{
    public class RegiaoService : IRegiaoService
    {
        private readonly IRegiaoRepository _regiaoRepository;
        private readonly ICidadeRepository _cidadeRepository;

        public RegiaoService(IRegiaoRepository regiaoRepository, ICidadeRepository cidadeRepository)
        {
            _regiaoRepository = regiaoRepository;
            _cidadeRepository = cidadeRepository;
        }

        public RegiaoResponseDTO Get(Guid id)
        {
            var regiaoList = _regiaoRepository.List().FirstOrDefault(f => f.Id == id);
            if (regiaoList == null)
            {
                throw new Exception("Região não encontrada");
            }
            
            var cidades = _cidadeRepository.List().Where(w => w.RegiaoId == id).ToList();
            return new RegiaoResponseDTO(regiaoList, cidades);
        }

        public IEnumerable<RegiaoResponseDTO> List()
        {
            var regioes = _regiaoRepository.List().ToList();
            var cidades = _cidadeRepository.List().ToList();
            var regioesResponse = new List<RegiaoResponseDTO>();
            foreach (var regiao in regioes)
            {
                var cidadesRegiao = cidades.Where(w => w.RegiaoId == regiao.Id).ToList();
                regioesResponse.Add(new RegiaoResponseDTO(regiao, cidadesRegiao));
            }
            return regioesResponse;            
        }
        
        public void Create(RegiaoCreateDTO dto)
        {
            var regiao = new Regiao(dto.Nome, dto.Active);
            if (dto.Cidades == null)
            {
                throw new Exception("Informe pelo menos uma cidade");
            }
            
            var cidades = _cidadeRepository.List().Where(w => dto.Cidades.Contains(w.Id)).ToList();
            var cidadesWithRegiao = cidades.Where(w => w.RegiaoId != null).ToList();
            if (cidadesWithRegiao.Any())
            {
                throw new Exception($"As cidades {string.Join(", ", cidadesWithRegiao.Select(s => s.Nome))} já estão associadas a uma região");
            }
            
            var regiaoEntity = _regiaoRepository.Create(regiao);
            var cidadesWithoutRegiao = cidades.Where(w => w.RegiaoId == null).ToList();
            foreach (var cidade in cidadesWithoutRegiao)
            {
                cidade.RegiaoId = regiaoEntity.Id;
                _cidadeRepository.Update(cidade);
            }
            
        }
        
        public void Update(Guid id, RegiaoCreateDTO dto)
        {
            var regiao = _regiaoRepository.List().FirstOrDefault(f => f.Id == id);
            if (regiao == null)
            {
                throw new Exception("Região não encontrada");
            }
            
            if (dto.Cidades == null)
            {
                throw new Exception("Informe pelo menos uma cidade");
            }
            
            var cidadesRegiao = _cidadeRepository.List().Where(c => c.RegiaoId == id).ToList();
            foreach (var cidade in cidadesRegiao)
            {
                cidade.RegiaoId = null;
                _cidadeRepository.Update(cidade);
            }
            
            var cidades = _cidadeRepository.List().Where(w => dto.Cidades.Contains(w.Id)).ToList();
            var cidadesWithRegiao = cidades.Where(w => w.RegiaoId != null).ToList();
            if (cidadesWithRegiao.Any())
            {
                throw new Exception($"As cidades {string.Join(", ", cidadesWithRegiao.Select(s => s.Nome))} já estão associadas a uma região");
            }
            
            var cidadesWithoutRegiao = cidades.Where(w => w.RegiaoId == null).ToList();
            foreach (var cidade in cidadesWithoutRegiao)
            {
                cidade.RegiaoId = id;
                _cidadeRepository.Update(cidade);
            }

            regiao.Nome = dto.Nome;
            regiao.Active = dto.Active;
            _regiaoRepository.Update(regiao);
            
        }

        public void ChangeStatus(Guid id)
        {
            var regiao = _regiaoRepository.List().FirstOrDefault(f => f.Id == id);
            if (regiao == null)
            {
                throw new Exception("Região não encontrada");
            }
            regiao.Active = !regiao.Active;
            _regiaoRepository.Update(regiao);
        }

    }
}
