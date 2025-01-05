using Fretefy.Test.Domain.Entities;
using Fretefy.Test.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Fretefy.Test.Domain.DTOs;

namespace Fretefy.Test.WebApi.Controllers
{
    [Route("api/regiao")]
    [ApiController]
    public class RegiaoController : ControllerBase
    {
        private readonly IRegiaoService _regiaoService;

        public RegiaoController(IRegiaoService regiaoService)
        {
            _regiaoService = regiaoService;
        }

        [HttpGet]
        public IActionResult List()
        {
            IEnumerable<RegiaoResponseDTO> regioes = _regiaoService.List();

            return Ok(regioes);
        }

        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            var regioes = _regiaoService.Get(id);
            return Ok(regioes);
        }
        
        [HttpPost]
        public IActionResult Create([FromBody] RegiaoCreateDTO dto)
        {
            _regiaoService.Create(dto);
            return Ok();
        }
        
        [HttpPut("{id}")]
        public IActionResult Update(Guid id, [FromBody] RegiaoCreateDTO dto)
        {
            _regiaoService.Update(id, dto);
            return Ok();
        }
                
        [HttpPatch("mudar-status/{id}")]
        public IActionResult ChangeStatus(Guid id)
        {
            _regiaoService.ChangeStatus(id);
            return Ok();
        }
    }
}
