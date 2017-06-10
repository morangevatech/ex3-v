using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.IO;

namespace ex3.Data_Base
{
    public class SqlDataBase
    {
        SqlConnection conn;
        SqlDataReader reader;
        SqlCommand cmd;

        public SqlDataBase()
        {
            this.conn = new SqlConnection(@"Data Source = (LocalDB)\MSSQLLocalDB; AttachDbFilename = |DataDirectory|DB.mdf; Integrated Security = True");            this.reader = null;
            this.cmd = null;
        }

        public void AddUserToDB(string userName, string password, string email)
        {
            try
            {
                this.conn.Open();
                this.cmd = new SqlCommand("insert into Users (UserName,Password,Email) values ('" + userName + "', '" + password + "', '" + email + "')", conn);
                cmd.ExecuteNonQuery();            }
            finally
            {
                this.Close();
            }
        }

        public void CreateUserInRankigsTableDB(string userName, int wins, int losses)
        {
            try
            {
                int id = this.GetUserIdByName(userName);
                this.conn.Open();
                this.cmd = new SqlCommand("insert into UserRankings (ID,UserName,Wins,Losses) values ('" + id + "', '" + userName + "', '" + wins + "','" + losses + "')", conn);
                cmd.ExecuteNonQuery();            }
            finally
            {
                this.Close();
            }
        }

        public void UpdateWinsByUser(int id)
        {
            try
            {
                int wins = this.GetWinsByUserID(id)+1;
                this.conn.Open();
                this.cmd = new SqlCommand("UPDATE UserRankings SET Wins=" + wins + " WHERE ID =" + id, conn);
                cmd.ExecuteNonQuery();
            }
            finally
            {
                this.Close();
            }
        }

        public void UpdateLossesByUser(int id)
        {
            try
            {
                int losses = this.GetLossesByUserID(id) + 1;
                this.conn.Open();
                this.cmd = new SqlCommand("UPDATE UserRankings SET Losses=" + losses + " WHERE ID =" + id, conn);
                cmd.ExecuteNonQuery();
            }
            finally
            {
                this.Close();
            }
        }

        public int GetUserIdByName(string userName)
        {
            try
            {
                this.conn.Open();
                this.cmd = new SqlCommand("select ID from Users where UserName='" + userName + "'", conn);
                this.reader = cmd.ExecuteReader();
                string str = "";
                int id;
                while (this.reader.Read())
                    str += this.reader[0];
                int.TryParse(str, out id);
                return id;
            }
            finally
            {
                this.Close();
            }
        }

        public int GetWinsByUserID(int id)
        {
            try
            {
                this.conn.Open();
                this.cmd = new SqlCommand("select Wins from UserRankings where ID='" + id + "'", conn);
                this.reader = cmd.ExecuteReader();
                string str = "";
                int wins;
                while (this.reader.Read())
                    str += this.reader[0];
                int.TryParse(str, out wins);
                return wins;
            }
            finally
            {
                this.Close();
            }
        }

        public int GetLossesByUserID(int id)
        {
            try
            {
                this.conn.Open();
                this.cmd = new SqlCommand("select Losses from UserRankings where ID='" + id + "'", conn);
                this.reader = cmd.ExecuteReader();
                string str = "";
                int losses;
                while (this.reader.Read())
                    str += this.reader[0];
                int.TryParse(str, out losses);
                return losses;
            }
            finally
            {
                this.Close();
            }
        }

        public void Close()
        {
            if (this.reader != null)
                this.reader.Close();
            if (this.conn != null)
                this.conn.Close();
        }
    }
}