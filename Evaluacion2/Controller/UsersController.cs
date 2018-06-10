using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using System.Configuration;

namespace Evaluacion2.Controlador
{
    public class UsersController : ApiController
    {

        public List<Object> GetUsers()
        {
            try
            {
                var con = new Connections();
                var resList = con.GetResourcesList();
                return resList;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        // POST: api/Users
        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> PostUser(User user)
        {
            try
            {
                var con = new Connections();

                con.AddUser(user.Name, user.LastName, user.Email, user.Password);

            }
            catch (DbUpdateException)
            {
                return null;
            }

            return CreatedAtRoute("DefaultApi", new { id = user.Id }, user);
        }

        [ResponseType(typeof(User))]
        public async Task<IHttpActionResult> PutUser(User user)
        {
            try
            {
                var con = new Connections();

                con.UpdateUser(user.Id, user.Name, user.LastName, user.Email, user.Password);

            }
            catch (DbUpdateException)
            {
                return null;
            }

            return CreatedAtRoute("DefaultApi", new { id = user.Id }, user);
        }

        [ResponseType(typeof(User))]
        public HttpResponseMessage DeleteUser(int Id)
        {
            try
            {
                var userId = Convert.ToInt32(Id);

                var con = new Connections();

                con.DeleteUser(Id);


                return Request.CreateResponse(HttpStatusCode.OK, true);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
            
        }

    }
}