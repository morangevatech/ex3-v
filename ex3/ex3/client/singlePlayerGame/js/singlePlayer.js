src = "../page/js/jquery.mazeBoard.js";

document.title = "Singal Game";
$("#rows").val(localStorage.getItem("rows"));
$("#cols").val(localStorage.getItem("cols"));
if (localStorage.getItem("algo") != null) {
    $('#algo').val(localStorage.getItem("algo"));
}

(function ($) {   
    $("#btnGenerateMaze").click(function () {
        var animated = true;
        $("#loading-maze").show();
        var apiUrl = "../../api/Single/GenerateMaze";
        var maze = {
            Name: $("#name").val(),
            Rows: $("#rows").val(),
            Cols: $("#cols").val(),
            InitialPosRow: null,
            InitialPosCol: null,
            GoalPosRow:null,
            GoalPosCol: null,
            MazePath:null
        };
        $.get(apiUrl, { Name:maze.Name, Rows:maze.Rows, Cols:maze.Cols})
        .done(function (maze) {
            /*alert("Name: " + maze.Name +
                "\nCols: " + maze.Cols +
                "\nRows: " + maze.Rows +
                "\nInitialPosRow: " + maze.InitialPosRow +
                "\nInitialPosCol: " + maze.InitialPosCol +
                "\nGoalPosRow: " + maze.GoalPosRow +
                "\nGoalPosCol: " + maze.GoalPosCol +
                "\nMazePath: " + maze.MazePath);*/
            document.title = maze.Name;
            $("#option-div").show();
            document.getElementById("mazeCanvas").tabIndex = 0;
            $("#mazeCanvas").mazeBoard(maze);
            $("#loading-maze").hide();
            $("#canvas-div").show();
            document.getElementById("mazeCanvas").focus();
    
        })
    })
        $("#btnSolveMaze").click(function () {
        var apiUrl = "../../api/Single/SolveMaze";
        var solution = {
        Name: $("#name").val(),
        Algo: $("#algo").val(),
        MazeSolution: null,
        };
        $.get(apiUrl, { Name: solution.Name, Algo: solution.Algo })
        .done(function (solution) {
            /*alert("Name: " + solution.Name +
                 "\nAlgo: " + solution.Algo +
                 "\nMazeSolution: " + solution.MazeSolution);*/
            $("mazeCanvas").solveMaze(solution);
        })
    })

    $("#btnRestartMaze").click(function(){
        $("mazeCanvas").restartMaze();
        document.getElementById("mazeCanvas").focus();
    })

})(jQuery);