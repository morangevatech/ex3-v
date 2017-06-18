using MazeLib;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ex3.Models
{
    public class MazeParam
    {
        public String Name { get; set; }
        public int Rows { get; set; }
        public int Cols { get; set; }
        public int InitialPosRow { get; set; }
        public int InitialPosCol { get; set; }
        public int GoalPosRow { get; set; }
        public int GoalPosCol { get; set; }
        public string MazePath { get; set; }

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