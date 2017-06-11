using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace ex3
{
    public class MultiplayerHub : Hub
    {
        public void Hello()
        {
            Clients.All.hello();
        }
    }
}