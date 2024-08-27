using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using apiRest.Models;

namespace apiRest.Controllers
{
    public class tacosController : ApiController
    {
        private TaqueriaEntities db = new TaqueriaEntities();

        // GET: api/tacos
        public IQueryable<tacos> Gettacos()
        {
            return db.tacos;
        }

        // GET: api/tacos/5
        [ResponseType(typeof(tacos))]
        public IHttpActionResult Gettacos(int id)
        {
            tacos tacos = db.tacos.Find(id);
            if (tacos == null)
            {
                return NotFound();
            }

            return Ok(tacos);
        }

        // PUT: api/tacos/5
        [ResponseType(typeof(void))]
        public IHttpActionResult Puttacos(int id, tacos tacos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tacos.id)
            {
                return BadRequest();
            }

            db.Entry(tacos).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!tacosExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/tacos
        [ResponseType(typeof(tacos))]
        public IHttpActionResult Posttacos(tacos tacos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.tacos.Add(tacos);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tacos.id }, tacos);
        }

        // DELETE: api/tacos/5
        [ResponseType(typeof(tacos))]
        public IHttpActionResult Deletetacos(int id)
        {
            tacos tacos = db.tacos.Find(id);
            if (tacos == null)
            {
                return NotFound();
            }

            db.tacos.Remove(tacos);
            db.SaveChanges();

            return Ok(tacos);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool tacosExists(int id)
        {
            return db.tacos.Count(e => e.id == id) > 0;
        }
    }
}