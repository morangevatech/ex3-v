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
    /// <summary>
    /// multiplayer controller
    /// </summary>
    public class MultiplayerController : ApiController
    {
        /// <summary>
        /// the model
        /// </summary>
        Model model;

        /// <summary>
        /// constructor
        /// </summary>
        MultiplayerController()
        {
            this.model = new Model();
        }

        /// <summary>
        /// get list of gamed to join
        /// </summary>
        /// <returns>IHttpActionResult</returns>
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