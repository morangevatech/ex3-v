using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Web;
using MazeLib;

namespace ex3.Models
{
    public class Game
    {
        /// <summary>
        /// player one
        /// </summary>
        Player playerOne;

        /// <summary>
        /// player two
        /// </summary>
        Player playerTwo;

        /// <summary>
        /// game name.
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// maze.
        /// </summary>
        public Maze Maze { get; }

        /// <summary>
        /// constructor
        /// </summary>
        /// <param name="name">game name</param>
        /// <param name="maze">maze</param>
        /// <param name="player2">player one - socket</param>
        public Game(string name, Maze mazeGame, string client)
        {
            this.Name = name;
            this.Maze = mazeGame;
            this.playerOne = new Player(client);
            this.playerTwo = null;
        }

        /// <summary>
        /// wait to anoter player to connect.
        /// </summary>
        /// <returns>true when connected</returns>
        public bool WaitToAnotherPlayer()
        {
            while (this.playerTwo == null) { }
            return true;
        }

        /// <summary>
        /// add second player to game
        /// </summary>
        /// <param name="client">second player</param>
        /// <returns>true if added</returns>
        public bool AddSecondPlayer(string client)
        {
            if (this.playerTwo != null)
            {
                return false;
            }
            this.playerTwo = new Player(client);
            return true;
        }

        /// <summary>
        /// get other player at game.
        /// </summary>
        /// <param name="currentPlayer">current player</param>
        /// <returns>other player at game</returns>
        public string GetOtherPlayer(string currentPlayer)
        {
            if (currentPlayer.Equals(this.playerOne.Client))
            {
                if (this.playerTwo != null)
                    if (this.playerTwo.IsConnected)
                        return this.playerTwo.Client;
            }
            else
            {
                if (this.playerOne != null)
                    if (this.playerOne.IsConnected)
                        return this.playerOne.Client;
            }
            return null;
        }

        /// <summary>
        /// disconnect player
        /// </summary>
        /// <param name="currentPlayer">current player</param>
        public void DisConnectPlayer(string currentPlayer)
        {
            if (currentPlayer.Equals(this.playerOne.Client))
                this.playerOne.IsConnected = false;
            else if (currentPlayer.Equals(this.playerTwo.Client))
                this.playerTwo.IsConnected = false;
        }
    }
}