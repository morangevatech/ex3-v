using ex3.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace ex3.Controllers
{
    public class MultiplayerController : ApiController
    {
        Model model;

        MultiplayerController()
        {
            this.model = new Model();
        }

        [HttpGet]
        public IHttpActionResult ListGame()
        {
            try
            {
                List<string> games=this.model.List();
                return Ok(games);
            }
            catch
            {
                return InternalServerError();
            }
        }
    }
}