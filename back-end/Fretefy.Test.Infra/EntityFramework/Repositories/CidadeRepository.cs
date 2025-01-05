using Fretefy.Test.Domain.Entities;
using Fretefy.Test.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Fretefy.Test.Infra.EntityFramework.Repositories
{
    public class CidadeRepository : ICidadeRepository
    {
        private readonly DbContext _dbContext;
        private DbSet<Cidade> _dbSet;

        public CidadeRepository(DbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = dbContext.Set<Cidade>();
        }

        public IQueryable<Cidade> List()
        {
            return _dbSet.AsQueryable();
        }

        public IEnumerable<Cidade> ListByUf(string uf)
        {
            return _dbSet.Where(w => EF.Functions.Like(w.UF, $"%{uf}%"));
        }

        public IEnumerable<Cidade> Query(string terms)
        {

            return _dbSet.Where(w => EF.Functions.Like(w.Nome, $"%{terms}%") || EF.Functions.Like(w.UF, $"%{terms}%"));
        }
        
        public void Update(Cidade cidade)
        {
            _dbSet.Update(cidade);
            _dbContext.SaveChanges();
        }
    }
}
