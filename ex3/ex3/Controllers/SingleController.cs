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
    /// <summary>
    /// sigalplayer controller
    /// </summary>
    public class SingleController : ApiController
    {
        /// <summary>
        /// the model
        /// </summary>
        Model model;

        /// <summary>
        /// constructor
        /// </summary>
        SingleController()
        {
            this.model = new Model();
        }

        /// <summary>
        /// generate maze
        /// </summary>
        /// <param name="name">maze name</param>
        /// <param name="rows">rows</param>
        /// <param name="cols">cols</param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GenerateMaze(string name, int rows, int cols)
        {
            try {
                Maze mazeGenerate = this.model.Generate(name, rows, cols);
                MazeParam maze = new MazeParam();
                maze.EditMazeParam(mazeGenerate);
                return Ok(maze);
            }
            catch
            {
                return InternalServerError();
            }
        }

        /// <summary>
        /// solve maze
        /// </summary>
        /// <param name="name">name</param>
        /// <param name="algo">algo</param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult SolveMaze(string name, int algo)
        {
            try {
                Solution<Position> mazeSolve = this.model.Solve(name, algo);
                if (mazeSolve == null)
                    return NotFound();
                SolveParam solve = new SolveParam();
                this.EditSolveParam(solve, mazeSolve, name, algo);
                return Ok(solve);
            }
            catch
            {
                return InternalServerError();
            }
        }

        /// <summary>
        /// edit solve param
        /// </summary>
        /// <param name="solve">solve param</param>
        /// <param name="mazeSolve">maze solve</param>
        /// <param name="name">maze name</param>
        /// <param name="algo">algo</param>
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