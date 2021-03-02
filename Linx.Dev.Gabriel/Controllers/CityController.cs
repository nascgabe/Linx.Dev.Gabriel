using Linx.Dev.Gabriel.Data;
using Linx.Dev.Gabriel.Enums;
using Linx.Dev.Gabriel.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Linx.Dev.Gabriel.Controllers
{
    [ApiController]
    [Route("v1/city")]
    public class CompanyController : ControllerBase
    {
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<City>>> Get([FromServices] DataContext context)
        {
            var city = await context.Cities.AsNoTracking().ToListAsync();
            return city;
        }

        [HttpGet]
        [Route("getByUf/{uf}")]
        public async Task<ActionResult<List<City>>> GetbyUf([FromServices] DataContext context, UF uf)
        {
            var city = await context.Cities.Where
                (x => x.UF == uf).AsNoTracking().ToListAsync();
            return city;
        }

        [HttpGet]
        [Route("getByRegion/{region}")]
        public async Task<ActionResult<List<City>>> GetbyRegion([FromServices] DataContext context, string region)
        {
            var city = await context.Cities.Where
                (x => x.Region == region).AsNoTracking().ToListAsync();
            return city;
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult<City>> GetById([FromServices] DataContext context, int id)
        {
            var city = await context.Cities.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            return city;
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<City>> Post([FromServices] DataContext context, City model)
        {
            var city = context.Cities.FirstOrDefault(x => x.IBGE == model.IBGE);
            if (model.Name == null && model.UF == city.UF)
                return BadRequest(new { message = "Esse cadastro já existe!" });

            else
            {
                context.Cities.Remove(city);
                await context.SaveChangesAsync();
                return city;
            }
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<ActionResult<City>> Delete([FromServices] DataContext context,
            int id)
        {
            var city = await context.Cities.FirstOrDefaultAsync(x => x.Id == id);
            if (city == null)
                return NotFound(new { message = "Cidade não encontrada!" });

            try
            {
                context.Cities.Remove(city);
                await context.SaveChangesAsync();
                return city;
            }
            catch (Exception)
            {
                return BadRequest(new { message = "Não foi possível remover a cidade!" });

            }
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<ActionResult<City>> Put(
            [FromServices] DataContext context,
            int id,
            [FromBody] City model)
        {
            if (id != model.Id)
                return NotFound(new { message = "Cidade não encontrada!" });

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                context.Entry(model).State = EntityState.Modified;
                await context.SaveChangesAsync();
                return model;
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest(new { message = "Não foi possível atualizar a cidade!" });

            }
        }
    }
}
