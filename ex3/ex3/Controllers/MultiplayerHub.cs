using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System.Threading.Tasks;
using MazeLib;
using ex3.Models;
using ex3.Data_Base;

namespace ex3
{
    /// <summary>
    /// multiplayer hub
    /// </summary>
    [HubName("multiplayerHub")]
    public class MultiplayerHub : Hub
    {
        /// <summary>
        /// users list
        /// </summary>
        public static List<string> users = new List<string>();

        /// <summary>
        /// the model
        /// </summary>
        Model model = new Model();

        /// <summary>
        /// data base class
        /// </summary>
        SqlDataBase db = new SqlDataBase();

        /// <summary>
        /// on connected task
        /// </summary>
        /// <returns></returns>
        public override Task OnConnected()
        {
            users.Add(Context.ConnectionId);
            return base.OnConnected();
        }

        /// <summary>
        /// on disconnected task
        /// </summary>
        /// <param name="stoped">stoped</param>
        /// <returns></returns>
        public override Task OnDisconnected(bool stoped)
        {
            users.Remove(Context.ConnectionId);
            return base.OnDisconnected(stoped);
        }

        /// <summary>
        /// send server error msg
        /// </summary>
        /// <param name="errorMsg">error msg</param>
        /// <param name="client">client to send</param>
        public void ServerErrorMsg(string errorMsg, string client)
        {
            Clients.Client(client).error(errorMsg);
        }

        /// <summary>
        /// start multi player game
        /// </summary>
        /// <param name="name">name maze</param>
        /// <param name="rows">rows</param>
        /// <param name="cols">cols</param>
        public void Start(string name, int rows, int cols)
        {         
            try
            {
                string client = Context.ConnectionId;
                bool succeed = model.Start(name, rows, cols, client);
                if (succeed == false)
                    this.ServerErrorMsg("# exist maze with the same name at multiplayer pool or maze generate failed", client);
            }
            catch
            {
                string client = Context.ConnectionId;
                this.ServerErrorMsg("# server error - 500", client);
            }
        }

        /// <summary>
        /// join to multiplayer game
        /// </summary>
        /// <param name="name">maze name</param>
        public void Join(string name)
        {
            try
            {
                string client = Context.ConnectionId;
                Maze maze = model.Join(name, client);
                MazeParam mazeParam = new MazeParam();
                mazeParam.EditMazeParam(maze);
                string otherClient = this.model.GetOtherParticipate(client);
                foreach(string currUser in users)
                {
                    if (currUser == otherClient)
                        Clients.Client(otherClient).broadcastMaze(mazeParam);
                }
                Clients.Client(client).broadcastMaze(mazeParam);
            }
            catch
            {
                string client = Context.ConnectionId;
                string otherClient = this.model.GetOtherParticipate(client);
                if (otherClient != null)
                    this.ServerErrorMsg("# server error - 500", otherClient);
                this.ServerErrorMsg("# server error - 500", client);
            }
        }

        /// <summary>
        /// play move
        /// </summary>
        /// <param name="name">maze name</param>
        /// <param name="move">move</param>
        public void Play(string name, string move)
        {
            try {
                string client = Context.ConnectionId;
                string otherClient = this.model.GetOtherParticipate(client);
                foreach (string currUser in users)
                {
                    if (currUser == otherClient)
                        Clients.Client(otherClient).broadcastMove(move);
                }
            }
            catch
            {
                string client = Context.ConnectionId;
                string otherClient = this.model.GetOtherParticipate(client);
                if (otherClient != null)
                    this.ServerErrorMsg("# server error - 500", otherClient);
                this.ServerErrorMsg("# server error - 500", client);
            }
        }

        /// <summary>
        /// player win
        /// </summary>
        /// <param name="username">winner username</param>
        public void Win(string username)
        {            
            string client = Context.ConnectionId;
            string otherClient = this.model.GetOtherParticipate(client);
            if (otherClient == null)
                this.ServerErrorMsg("# other client close connection", client);
            foreach (string currUser in users)
            {
                if (currUser == otherClient)
                    Clients.Client(otherClient).broadcastLoss();
            }
            this.UpdateWin(username);
        }

        /// <summary>
        /// update db that player win
        /// </summary>
        /// <param name="username">player username</param>
        public void UpdateWin(string username)
        {
            int userId = db.GetUserIdByName(username);
            db.UpdateWinsByUser(userId);
        }

        /// <summary>
        /// update db that player loss
        /// </summary>
        /// <param name="username">player username</param>
        public void UpdateLoss(string username)
        {
            int userId = db.GetUserIdByName(username);
            db.UpdateLossesByUser(userId);
        }

        /// <summary>
        /// close game
        /// </summary>
        /// <param name="mazename">maze name</param>
        public void Close(string mazename)
        {
            string client = Context.ConnectionId;
            model.Close(mazename, client);
        }
    }
}