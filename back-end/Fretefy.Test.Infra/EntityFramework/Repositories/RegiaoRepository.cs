using Fretefy.Test.Domain.Entities;
using Fretefy.Test.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Fretefy.Test.Infra.EntityFramework.Repositories
{
    public class RegiaoRepository : IRegiaoRepository
    {
        private readonly DbContext _dbContext;
        private DbSet<Regiao> _dbSet;

        public RegiaoRepository(DbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = dbContext.Set<Regiao>();
        }

        public IQueryable<Regiao> List()
        {
            return _dbSet.AsQueryable();
        }
        
        public Regiao Create(Regiao regiao)
        {
            var reg = _dbSet.Add(regiao);
            _dbContext.SaveChanges();
            return reg.Entity;
        }

        public Regiao Update(Regiao regiao)
        {
            var reg = _dbSet.Update(regiao);
            _dbContext.SaveChanges();
            return reg.Entity;
        }

    }
}
