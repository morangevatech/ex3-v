using MazeLib;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ex3.Models
{
    /// <summary>
    /// maze param class
    /// </summary>
    public class MazeParam
    {
        /// <summary>
        /// name
        /// </summary>
        public String Name { get; set; }

        /// <summary>
        /// rows
        /// </summary>
        public int Rows { get; set; }

        /// <summary>
        /// cols
        /// </summary>
        public int Cols { get; set; }

        /// <summary>
        /// initial pos row
        /// </summary>
        public int InitialPosRow { get; set; }

        /// <summary>
        /// initial pos col
        /// </summary>
        public int InitialPosCol { get; set; }

        /// <summary>
        /// goal pos row
        /// </summary>
        public int GoalPosRow { get; set; }

        /// <summary>
        /// goal pos col
        /// </summary>
        public int GoalPosCol { get; set; }
        
        /// <summary>
        /// maze path
        /// </summary>
        public string MazePath { get; set; }

        /// <summary>
        /// edit maze param
        /// </summary>
        /// <param name="mazeGenerate">maze</param>
        public void EditMazeParam(Maze mazeGenerate)
        {
            this.Name = mazeGenerate.Name;
            this.Rows = mazeGenerate.Rows;
            this.Cols = mazeGenerate.Cols;
            this.InitialPosRow = mazeGenerate.InitialPos.Row;
            this.InitialPosCol = mazeGenerate.InitialPos.Col;
            this.GoalPosRow = mazeGenerate.GoalPos.Row;
            this.GoalPosCol = mazeGenerate.GoalPos.Col;
            JObject jmaze = JObject.Parse(mazeGenerate.ToJSON());
            this.MazePath = jmaze.GetValue("Maze").ToString();
        }
    }
}