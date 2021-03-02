using Linx.Dev.Gabriel.Model;
using Microsoft.EntityFrameworkCore;

namespace Linx.Dev.Gabriel.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options)
       : base(options)

        {
        }
        public DataContext()
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(DataContext).Assembly);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseInMemoryDatabase("Database");
            }
        }


        public DbSet<City> Cities { get; set; }
    }
}
