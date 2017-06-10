using SearchAlgorithmsLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ex3.Models
{
    /// <summary>
    /// interface - represention format of solution.
    /// </summary>
    /// <typeparam name="T1">Direction</typeparam>
    /// <typeparam name="T2">Position</typeparam>
    /// <typeparam name="T3">present</typeparam>
    interface SolutionRepresent<T1, T2, T3>
    {
        /// <summary>
        /// convert solution to represention format.
        /// </summary>
        /// <returns>solution at represention format</returns>
        List<T3> ConvertSolution();

        /// <summary>
        /// get the direction from current state to seconde state.
        /// </summary>
        /// <param name="current">one state</param>
        /// <param name="toState">second state</param>
        /// <returns>the direction from current state to seconde state</returns>
        T1 GetDirectionState(State<T2> current, State<T2> toState);

        /// <summary>
        /// represent solution object at json format.
        /// </summary>
        /// <returns>solution object at json format</returns>
        string ToJSON();
    }
}
