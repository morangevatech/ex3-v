using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SearchAlgorithmsLib;

namespace ex3.Models
{
    /// <summary>
    /// interface adapter to serach problem.
    /// </summary>
    /// <typeparam name="T1">type of serach problem</typeparam>
    interface Adapter<T1>
    {
        /// <summary>
        /// get initialized state.
        /// </summary>
        /// <returns>initialized state</returns>
        State<T1> GetIntialized();

        /// <summary>
        /// get goal state.
        /// </summary>
        /// <returns>goal state</returns>
        State<T1> GetGoal();

        /// <summary>
        /// get all possible neighbors.
        /// </summary>
        /// <param name="current">state to check his neighbors</param>
        /// <returns>list of neighbors of state</returns>
        List<State<T1>> GetAllPossible(State<T1> current);

        /// <summary>
        /// get name of serach problem.
        /// </summary>
        /// <returns></returns>
        string GetName();

        /// <summary>
        /// get cost between neighbors.
        /// 0-no neighbor, Weight between two vertex
        /// </summary>
        /// <param name="v">one state - vertex</param>
        /// <param name="u">seconde state - vertex</param>
        /// <returns>distance between neighbors</returns>
        double CostBetNeg(State<T1> v, State<T1> u);

        /// <summary>
        /// update patent of state - came from.
        /// </summary>
        /// <param name="current">state</param>
        /// <param name="parent">state's parent</param>
        void UpdateParent(State<T1> current, State<T1> parent);
    }
}
