src = "../page/js/jquery.mazeBoard.js";

//title of page, put local storage values in fields.
document.title = "Singal Game";
$("#rows").val(localStorage.getItem("rows"));
$("#cols").val(localStorage.getItem("cols"));
if (localStorage.getItem("algo") != null) {
    $('#algo').val(localStorage.getItem("algo"));
}

(function ($) {
    //click on generate maze button
    $("#btnGenerateMaze").click(function () {
        $("#error-msg-solve").hide();
        if (!generateValid()) {
            return false;
        }
        showLoading();
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
        //get request
        $.get(apiUrl, { Name: maze.Name, Rows: maze.Rows, Cols: maze.Cols })
        .done(function (maze) {
            /*alert("Name: " + maze.Name +
                "\nCols: " + maze.Cols +
                "\nRows: " + maze.Rows +
                "\nInitialPosRow: " + maze.InitialPosRow +
                "\nInitialPosCol: " + maze.InitialPosCol +
                "\nGoalPosRow: " + maze.GoalPosRow +
                "\nGoalPosCol: " + maze.GoalPosCol +
                "\nMazePath: " + maze.MazePath);*/
            var mazecanvas = document.getElementById("mazeCanvas");
            document.title = maze.Name;
            showOptions();
            mazecanvas.tabIndex = 0;
            $("#mazeCanvas").mazeBoard(maze);
            hideLoading();
            showCanvas();
            mazecanvas.focus();
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 500) {
                alert("error in connection to server");
            }
        });
    })
      //click on solve maze button    $("#btnSolveMaze").click(function () {
        var msgError = document.getElementById("error-msg-solve");
        $("#error-msg-solve").hide();
        if (!checkNameValid()) {
            return false;
        }
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
            if (document.title != solution.Name)
            {
                msgError.innerHTML = "# can't solve another game, you are play in game named: '" + document.title + "'";
                $("#error-msg-solve").show();
                return false;
            }
            $("mazeCanvas").solveMaze(solution);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 404) {
                msgError.innerHTML = "# name of maze doesn't exist at maze single player pool";
                $("#error-msg-solve").show();
            }
            if (jqXHR.status == 500) {
                alert("error in connection to server");
            }            
        });
    })

    //click on restart maze button
    $("#btnRestartMaze").click(function(){
        $("mazeCanvas").restartMaze();
        document.getElementById("mazeCanvas").focus();
    })

    //focus on name field.
    $("#name").focus(function () {
        document.getElementById("name-div").className = "form-group row";
        document.getElementById("name").className="form-control form-control-sm";
    })

    //focus on rows field.
    $("#rows").focus(function () {
        document.getElementById("rows-div").className = "form-group row";
        document.getElementById("rows").className = "form-control form-control-sm";
        $("#errorRowsRange").hide();
    })

    //focus on cols field.
    $("#cols").focus(function () {
        document.getElementById("cols-div").className = "form-group row";
        document.getElementById("cols").className = "form-control form-control-sm";
        $("#errorColsRange").hide();
    })

    //check if name field is valid
    function checkNameValid() {
        if (!$("#name").val()) {
            document.getElementById("name-div").className = "form-group row has-danger";
            document.getElementById("name").className = "form-control form-control-sm form-control-danger";
            return false;
        }
        return true;
    };

    //check if rows field is valid
    function checkRowsValid() {
        if (!$("#rows").val() || $("#rows").val() < 1 || $("#rows").val()>100) {
            document.getElementById("rows-div").className = "form-group row has-danger";
            document.getElementById("rows").className = "form-control form-control-sm form-control-danger";
            $("#errorRowsRange").show();
            return false;
        }
        return true;
    };

    //check if cols field is valid
    function checkColsValid() {
        if (!$("#cols").val() || $("#cols").val() < 1 || $("#cols").val() > 100) {
            document.getElementById("cols-div").className = "form-group row has-danger";
            document.getElementById("cols").className = "form-control form-control-sm form-control-danger";
            $("#errorColsRange").show();
            return false;
        }
        return true;
    };

    //check if generate fields are valid
    function generateValid() {
        var nameValid = checkNameValid();
        var rowsValid = checkRowsValid();
        var colsValid = checkColsValid();
        if (!nameValid || !rowsValid || !colsValid) {
            return false;
        }
        return true;
    }

    //shoe option part - after generate maze
    function showOptions() {
        $("#option-div").show();
    }

    //show loading spinner
    function showLoading() {
        $("#loading-maze").show();
    }

    //hide loading spinner
    function hideLoading() {
        $("#loading-maze").hide();
    }

    //show canvas
    function showCanvas() {
        $("#canvas-div").show();
    }
})(jQuery);