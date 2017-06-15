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
        // POST: api/Messages
        [ResponseType(typeof(Message))]
        public IHttpActionResult PostMessage(Message message)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            message.SentTime = DateTime.Now;
            return CreatedAtRoute("DefaultApi", new { id = message.Id }, message);
        }
    }
    public class Message
    {
        public int Id { get; set; }
        [Required]
        public string Sender { get; set; }
        [Required]
        public string Recipient { get; set; }
        [Required]
        public string Text { get; set; }
        public DateTime SentTime { get; set; }
    }
}