using ex3.Data_Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ex3.Controllers
{
    public class UsersController : ApiController
    {
        SqlDataBase db;

        public UsersController()
        {
            this.db = new SqlDataBase();
        }

        [HttpPost]
        public IHttpActionResult AddUser(Register register)
        {
            string salt = "1";
            if (db.CheckIfUsernameExist(register.Username) == 0)
            {
                db.AddUserToDB(register.Username, register.Password, register.Email, salt);
                db.CreateUserInRankigsTableDB(register.Username, 0, 0);
                return Ok();
            }
            return NotFound();           
        }
    }

    public class Register
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
}