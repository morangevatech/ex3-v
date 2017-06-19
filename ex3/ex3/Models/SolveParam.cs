using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ex3.Models
{
    /// <summary>
    /// solve param class
    /// </summary>
    public class SolveParam
    {
        /// <summary>
        /// name maze
        /// </summary>
        public String Name { get; set; }

        /// <summary>
        /// algo number
        /// </summary>
        public int Algo { get; set; }

        /// <summary>
        /// maze solution
        /// </summary>
        public string MazeSolution { get; set; }
    }
}