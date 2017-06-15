using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Collections.Concurrent;

namespace ex3
{
    public class MultiplayerHub : Hub
    {
        private static ConcurrentDictionary<string, string> connectedUsers =
            new ConcurrentDictionary<string, string>();

        public void Connect(string username)
        {
            connectedUsers[username] = Context.ConnectionId;
        }

        public void SendMessage(string username)
        {
            string recipientId = connectedUsers[username];
            if (recipientId == null)
                return;
            Clients.Client(recipientId).gotMessage("hello");
        }
    }
}