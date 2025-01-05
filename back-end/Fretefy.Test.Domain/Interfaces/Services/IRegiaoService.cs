using Fretefy.Test.Domain.Entities;
using System;
using System.Collections.Generic;
using Fretefy.Test.Domain.DTOs;

namespace Fretefy.Test.Domain.Interfaces
{
    public interface IRegiaoService
    {
        RegiaoResponseDTO Get(Guid id);
        IEnumerable<RegiaoResponseDTO> List();
        
        void Create(RegiaoCreateDTO dto);
        
        void Update(Guid id, RegiaoCreateDTO dto);
        
        void ChangeStatus(Guid id);
        
    }
}