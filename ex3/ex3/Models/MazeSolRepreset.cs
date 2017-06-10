using Newtonsoft.Json.Linq;
using SearchAlgorithmsLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ex3.Models
{
    /// <summary>
    /// implemet represention format of solution.
    /// </summary>
    class MazeSolRepreset : SolutionRepresent<MazeLib.Direction, MazeLib.Position, int>
    {
        /// <summary>
        /// maze name.
        /// </summary>
        string mazeName;

        /// <summary>
        /// origion solution - before convert to format represent.
        /// </summary>
        Solution<MazeLib.Position> solution;

        /// <summary>
        /// solution at represent format. 
        /// </summary>
        List<int> SolRepreset { get; set; }

        /// <summary>
        /// constructor
        /// </summary>
        /// <param name="sol">solution</param>
        public MazeSolRepreset(Solution<MazeLib.Position> sol)
        {
            this.solution = sol;
            this.mazeName = sol.Name;
            List<MazeLib.Direction> solRepreset = new List<MazeLib.Direction>();
            this.SolRepreset = ConvertSolution();
        }

        /// <summary>
        /// convert solution to represention format.
        /// </summary>
        /// <returns>solution at represention format</returns>
        public List<int> ConvertSolution()
        {
            if (this.solution != null)
            {
                List<int> temp = new List<int>();

                for (int i = 0; i < this.solution.BackTrace.Count - 1; i++)
                {
                    temp.Add((int)GetDirectionState(this.solution.BackTrace[i], this.solution.BackTrace[i + 1]));
                }
                return temp;
            }
            return null;
        }

        /// <summary>
        /// get the direction from current state to seconde state.
        /// </summary>
        /// <param name="current">one state</param>
        /// <param name="toState">second state</param>
        /// <returns>the direction from current state to seconde state</returns>
        public MazeLib.Direction GetDirectionState(State<MazeLib.Position> current, State<MazeLib.Position> toState)
        {
            if (current.state.Row == toState.state.Row)
            {
                if (toState.state.Col == current.state.Col + 1)
                    return MazeLib.Direction.Right;
                if (toState.state.Col == current.state.Col - 1)
                    return MazeLib.Direction.Left;
            }
            if (current.state.Col == toState.state.Col)
            {
                if (toState.state.Row == current.state.Row + 1)
                    return MazeLib.Direction.Down;
                if (toState.state.Row == current.state.Row - 1)
                    return MazeLib.Direction.Up;
            }
            return MazeLib.Direction.Unknown;
        }

        /// <summary>
        /// represent solution object at json format.
        /// </summary>
        /// <returns>solution object at json format</returns>
        public string ToJSON()
        {
            JObject mazeSolObj = new JObject();
            mazeSolObj["Name"] = this.mazeName;
            mazeSolObj["Solution"] = string.Join("", this.SolRepreset);
            mazeSolObj["NodesEvaluated"] = this.solution.NodesEvaluated;
            return mazeSolObj.ToString();
        }
    }
}