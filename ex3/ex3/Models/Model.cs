using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Sockets;
using System.Web.Http;
using SearchAlgorithmsLib;
using MazeGeneratorLib;
using MazeLib;

namespace ex3.Models
{
    public class Model
    {
        /// <summary>
        /// pool of solution - singal player.
        /// </summary>
        static Dictionary<string, Solution<Position>> solutionsSinglePlayerPool = new Dictionary<string, Solution<Position>>();

        /// <summary>
        /// pool of mazes - singal player.
        /// </summary>
        static Dictionary<string, Maze> mazesSinglePlayerPool= new Dictionary<string, Maze>();

        /// <summary>
        /// pool of Game - multi player.
        /// </summary>
        //Dictionary<string, Game> mazesMultiPlayerPool;
        static Dictionary<string, Game> multiPlayersGames = new Dictionary<string, Game>();

        static Dictionary<string, Game> clientsAtGame= new Dictionary<string, Game>();

        /// <summary>
        /// list of games that can join.
        /// </summary>
        static List<string> gamesToJoin= new List<string>();

        /// <summary>
        /// constructor
        /// </summary>
        /// <param name="con">controller</param>
        public Model()
        {
            /*
            this.solutionsSinglePlayerPool = new Dictionary<string, Solution<Position>>();
            this.mazesSinglePlayerPool = new Dictionary<string, Maze>();
            //this.mazesMultiPlayerPool = new Dictionary<string, Maze>();
            this.multiPlayersGames = new Dictionary<string, Game>();
            this.clientsAtGame = new Dictionary<TcpClient, Game>();
            this.gamesToJoin = new List<string>();
            */
        }

        /// <summary>
        /// Generate a maze for single player.
        /// </summary>
        /// <param name="name">maze name</param>
        /// <param name="rows">number of rows at maze.</param>
        /// <param name="cols">number of cols at maze.</param>
        /// <returns>maze</returns>
        public Maze Generate(string name, int rows, int cols)
        {
            IMazeGenerator mazeGenerator = new DFSMazeGenerator();
            Maze maze = mazeGenerator.Generate(rows, cols);
            maze.Name = name;
            if (!mazesSinglePlayerPool.ContainsKey(name))
            {
                mazesSinglePlayerPool.Add(name, maze);
            }
            else
            {
                mazesSinglePlayerPool[name] = maze;
                if (solutionsSinglePlayerPool.ContainsKey(name))
                    solutionsSinglePlayerPool.Remove(name);
                //Console.WriteLine("previous maze with the same name overrided");
            }
            return maze;
        }

        /// <summary>
        /// solve the maze problem - singal player.
        /// </summary>
        /// <param name="name">maze name</param>
        /// <param name="algo">0-bfs, 1-dfs</param>
        /// <returns>get solution of maze problem</returns>
        public Solution<Position> Solve(string name, int algo)
        {
            if (mazesSinglePlayerPool.ContainsKey(name))
            {
                if (!solutionsSinglePlayerPool.ContainsKey(name))
                {
                    ISearcher<Position> searchAlgo;
                    Solution<Position> solution;
                    Maze maze = mazesSinglePlayerPool[name];
                    Adapter<Position> adapter = new MazeToSearchableAdapter<Position>(maze);
                    ISearchable<Position> searchableMaze = new Searchable<Position, Direction>(adapter);
                    switch (algo)
                    {
                        case 0:
                            searchAlgo = new Bfs<Position>();
                            break;
                        case 1:
                            searchAlgo = new Dfs<Position>();
                            break;
                        default:
                            //Error at algorithem numeber: 0 - for bfs, 1 - for dfs
                            return null;
                    }
                    solution = searchAlgo.Search(searchableMaze);
                    solutionsSinglePlayerPool.Add(name, solution);
                }
                return solutionsSinglePlayerPool[name];
            }
            //name of maze doesn't exist at maze single player pool"
            return null;
        }

        /// <summary>
        /// Generate a maze for two players.
        /// </summary>
        /// <param name="name">maze name</param>
        /// <param name="rows">number of rows at maze.</param>
        /// <param name="cols">number of cols at maze.</param>
        /// <returns>maze</returns>
        public bool Start(string name, int rows, int cols, string client)
        {
            Maze maze = GenerateMultiPlayresMaze(name, rows, cols);
            if (maze == null)
                return false;
            gamesToJoin.Add(name);
            Game game = new Game(name, maze, client);
            multiPlayersGames.Add(name, game);
            clientsAtGame.Add(client, game);
            return true;
        }

        private Maze GenerateMultiPlayresMaze(string name, int rows, int cols)
        {
            Maze maze;
            if (!multiPlayersGames.ContainsKey(name))
            {
                IMazeGenerator mazeGenerator = new DFSMazeGenerator();
                maze = mazeGenerator.Generate(rows, cols);
                maze.Name = name;
            }
            else
            {
                //"Error: exist maze with the same name at multiplayer pool"
                return null;
            }
            return maze;
        }

        /// <summary>
        /// list of games that can join - two players.
        /// </summary>
        /// <returns>list of games that can join</returns>
        public List<string> List()
        {
            return gamesToJoin;
        }

        /// <summary>
        /// join to game of two players.
        /// </summary>
        /// <param name="name">maze name</param>
        /// <returns>maze</returns>
        public Maze Join(string name, string client)
        {
            if (!gamesToJoin.Contains(name))
                //"Error: game doesn't exist in list games to join"
                return null;
            gamesToJoin.Remove(name);
            if (multiPlayersGames.ContainsKey(name))
            {
                Game game = multiPlayersGames[name];
                if (game.AddSecondPlayer(client))
                {
                    clientsAtGame.Add(client, game);
                    return game.Maze;
                }
            }
            return null;
        }



        /// <summary>
        /// play one move, in two playres game.
        /// </summary>
        /// <param name="move">direction of player at maze.</param>
        /// <returns>the move</returns>
        public string Play(Direction move, string client)
        {
            Game game = clientsAtGame[client];
            return null;
        }

        /// <summary>
        /// close the maze between to playres.
        /// </summary>
        /// <param name="name">maze name</param>
        /// <returns>true - Succeeded in close</returns>
        public string Close(string name, string client)
        {
            Game game = clientsAtGame[client];
            if (game.Name == name)
            {
                if (gamesToJoin.Contains(name))
                    gamesToJoin.Remove(name);
                game.DisConnectPlayer(client);
                clientsAtGame.Remove(client);
                string otherPlayer = game.GetOtherPlayer(client);
                if (otherPlayer != null)
                    clientsAtGame.Remove(otherPlayer);
                multiPlayersGames.Remove(name);
                return null;
            }
            return "Error try to close not exist game or game of others player";
        }

        /// <summary>
        /// check if client participate in multiplayer game.
        /// </summary>
        /// <param name="client">client</param>
        /// <returns>true if participate, otherwise not</returns>
        public bool IsParticipate(string client)
        {
            if (!clientsAtGame.ContainsKey(client))
                //"Error: client don't Participating in multi player game"
                return false;

            return true;
        }

        /// <summary>
        /// get other participate at game.
        /// </summary>
        /// <param name="client">client</param>
        /// <returns>other participate at game</returns>
        public string GetOtherParticipate(string client)
        {
            if (IsParticipate(client))
            {
                Game game = clientsAtGame[client];
                string otherParticipate = game.GetOtherPlayer(client);
                return otherParticipate;
            }
            return null;
        }
    }
}