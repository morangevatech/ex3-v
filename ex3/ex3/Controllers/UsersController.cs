﻿using ex3.Data_Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Helpers;

namespace ex3.Controllers
{
    public class UsersController : ApiController
    {
        SqlDataBase db;

        public UsersController()
        {
            this.db = new SqlDataBase();
        }

        [HttpPost()]
        [Route("api/Users/AddUser")]
        public IHttpActionResult AddUser(Register register)
        {
            if (db.CheckIfUsernameExist(register.Username) == 0)
            {
                string currentSalt = Crypto.GenerateSalt();
                string password=Crypto.SHA256(register.Password + currentSalt);
                db.AddUserToDB(register.Username, password, register.Email, currentSalt);
                db.CreateUserInRankigsTableDB(register.Username, 0, 0);
                return Ok();
            }
            return NotFound();           
        }

        [HttpPost()]
        [Route("api/Users/LoginUser")]
        public IHttpActionResult LoginUser(Login login)
        {
            if (db.CheckIfUsernameExist(login.Username) == 0)
            {
                return NotFound();
            }
            if(db.checkPassword(login.Username, login.Password)) 
                return Ok();
            else
                return NotFound();
        }

        [HttpGet]
        [Route("api/Users/UsersRank")]
        public List<UserRank> UsersRank()
        {
            return db.getRankingData();
        }
    }

    public class Register
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }

    public class Login
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}