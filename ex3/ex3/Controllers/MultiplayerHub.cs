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
    [HubName("multiplayerHub")]
    public class MultiplayerHub : Hub
    {
        public static List<string> users = new List<string>();
        Model model = new Model();
        SqlDataBase db = new SqlDataBase();

        public override Task OnConnected()
        {
            users.Add(Context.ConnectionId);
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stoped)
        {
            users.Remove(Context.ConnectionId);
            return base.OnDisconnected(stoped);
        }

        public void ServerErrorMsg(string errorMsg, string client)
        {
            Clients.Client(client).error(errorMsg);
        }

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

        public void UpdateWin(string username)
        {
            int userId = db.GetUserIdByName(username);
            db.UpdateWinsByUser(userId);
        }

        public void UpdateLoss(string username)
        {
            int userId = db.GetUserIdByName(username);
            db.UpdateLossesByUser(userId);
        }

        public void Close(string mazename)
        {
            string client = Context.ConnectionId;
            model.Close(mazename, client);
        }
    }
}