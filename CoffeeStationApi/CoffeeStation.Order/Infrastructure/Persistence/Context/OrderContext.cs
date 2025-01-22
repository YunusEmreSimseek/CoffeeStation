using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Context
{
    public class OrderContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            _ = optionsBuilder.UseSqlServer(
                "Server=localhost,1453;Initial Catalog=CoffeeStationOrderDb;User ID=sa;Password=Password123456;TrustServerCertificate=True;"
            );
        }

        public DbSet<Address> Addresses { get; set; }

        public DbSet<Order> Orders { get; set; }

    }
}