using ex3.Data_Base;
using ex3.Models;
using MazeLib;
using Newtonsoft.Json.Linq;
using SearchAlgorithmsLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ex3.Controllers
{
    public class SingleController : ApiController
    {
        Model model;

        SingleController()
        {
            this.model = new Model();
        }

        [HttpGet]
        public IHttpActionResult GenerateMaze(string name, int rows, int cols)
        {
            Maze mazeGenerate = this.model.Generate(name, rows, cols);
            MazeParam maze = new MazeParam();
            this.EditMazeParam(maze, mazeGenerate);
            return Ok(maze);
        }

        private void EditMazeParam(MazeParam maze, Maze mazeGenerate)
        {
            maze.Name = mazeGenerate.Name;
            maze.Rows = mazeGenerate.Rows;
            maze.Cols = mazeGenerate.Cols;
            maze.InitialPosRow = mazeGenerate.InitialPos.Row;
            maze.InitialPosCol = mazeGenerate.InitialPos.Col;
            maze.GoalPosRow = mazeGenerate.GoalPos.Row;
            maze.GoalPosCol = mazeGenerate.GoalPos.Col;
            JObject jmaze = JObject.Parse(mazeGenerate.ToJSON());
            maze.MazePath = jmaze.GetValue("Maze").ToString();
        }

        [HttpGet]
        public IHttpActionResult SolveMaze(string name, int algo)
        {
            Solution<Position> mazeSolve = this.model.Solve(name, algo);
            if (mazeSolve == null)
                return NotFound();
            SolveParam solve = new SolveParam();
            this.EditSolveParam(solve, mazeSolve, name, algo);
            return Ok(solve);
        }

        private void EditSolveParam(SolveParam solve, Solution<Position> mazeSolve, string name, int algo)
        {
            solve.Name = name;
            solve.Algo = algo;
            SolutionRepresent<MazeLib.Direction, MazeLib.Position, int> solRepresent = new MazeSolRepreset(mazeSolve);
            solRepresent.ConvertSolution();
            JObject sol = JObject.Parse(solRepresent.ToJSON());
            solve.MazeSolution = sol.GetValue("Solution").ToString();
        }
    }
}