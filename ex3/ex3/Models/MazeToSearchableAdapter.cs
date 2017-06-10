using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SearchAlgorithmsLib;
using MazeLib;

namespace ex3.Models
{
    /// <summary>
    /// implement adapter to serach problem - maze.
    /// </summary>
    /// <typeparam name="Position">position</typeparam>
    class MazeToSearchableAdapter<Position> : Adapter<MazeLib.Position>
    {
        /// <summary>
        /// adapter of maze.
        /// </summary>
        private Maze adapteeMaze;

        /// <summary>
        /// constructor.
        /// </summary>
        /// <param name="myMaze"></param>
        public MazeToSearchableAdapter(Maze myMaze)
        {
            this.adapteeMaze = myMaze;
        }

        /// <summary>
        /// get initialized state.
        /// </summary>
        /// <returns>initialized state</returns>
        public State<MazeLib.Position> GetIntialized()
        {
            State<MazeLib.Position> start = State<MazeLib.Position>.StatePool.GetState(adapteeMaze.InitialPos);
            return start;

        }

        /// <summary>
        /// get goal state.
        /// </summary>
        /// <returns>goal state</returns>
        public State<MazeLib.Position> GetGoal()
        {
            State<MazeLib.Position> goal = State<MazeLib.Position>.StatePool.GetState(this.adapteeMaze.GoalPos);
            return goal;
        }

        /// <summary>
        /// get name of serach problem.
        /// </summary>
        /// <returns></returns>
        public string GetName()
        {
            return this.adapteeMaze.Name;
        }

        /// <summary>
        /// get state position - call to getState (state pool).
        /// </summary>
        /// <param name="row">in row</param>
        /// <param name="col">in col</param>
        /// <returns>state at positon[row,col]</returns>
        private State<MazeLib.Position> CreatePos(int row, int col)
        {
            MazeLib.Position tempPos = new MazeLib.Position(row, col);
            State<MazeLib.Position> tempState = State<MazeLib.Position>.StatePool.GetState(tempPos);
            return tempState;
        }

        /// <summary>
        /// get all possible neighbors.
        /// </summary>
        /// <param name="current">state to check his neighbors</param>
        /// <returns>list of neighbors of state</returns>
        public List<State<MazeLib.Position>> GetAllPossible(State<MazeLib.Position> current)
        {
            List<State<MazeLib.Position>> temp = new List<State<MazeLib.Position>>();
            int row = current.state.Row;
            int col = current.state.Col;

            if (col >= 0 && col <= this.adapteeMaze.Cols - 1)
            {
                if ((row - 1) >= 0)
                {
                    if (this.adapteeMaze[row - 1, col] == 0)
                        temp.Add(CreatePos(row - 1, col));
                }
                if ((row + 1) <= this.adapteeMaze.Rows - 1)
                {
                    if (this.adapteeMaze[row + 1, col] == 0)
                        temp.Add(CreatePos(row + 1, col));
                }
            }

            if (row >= 0 && row <= this.adapteeMaze.Rows - 1)
            {
                if ((col - 1) >= 0)
                {
                    if (this.adapteeMaze[row, col - 1] == 0)
                        temp.Add(CreatePos(row, col - 1));
                }
                if ((col + 1) <= this.adapteeMaze.Cols - 1)
                {
                    if (this.adapteeMaze[row, col + 1] == 0)
                        temp.Add(CreatePos(row, col + 1));
                }
            }
            return temp;
        }

        /// <summary>
        /// get cost between neighbors.
        /// 0-no neighbor, Weight between two vertex
        /// </summary>
        /// <param name="v">one state - vertex</param>
        /// <param name="u">seconde state - vertex</param>
        /// <returns>distance between neighbors</returns>
        public double CostBetNeg(State<MazeLib.Position> neg1, State<MazeLib.Position> neg2)
        {
            return 1;
        }

        /// <summary>
        /// update patent of state - came from.
        /// </summary>
        /// <param name="current">state</param>
        /// <param name="parent">state's parent</param>
        public void UpdateParent(State<MazeLib.Position> current, State<MazeLib.Position> parent)
        {
            current.CameFrom = parent;
            current.Cost = parent.Cost + CostBetNeg(current, parent);
        }
    }
}