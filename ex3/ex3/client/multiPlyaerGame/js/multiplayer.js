document.title = "Multiplayer Game";
$("#rows").val(localStorage.getItem("rows"));
$("#cols").val(localStorage.getItem("cols"));

(function ($) {
    $(document).ready(function () {
        if (sessionStorage.getItem('loginSession')) {
            hideNotLogin();
            showMenuMulti();
        }
        else {
            hideMenuMulti();
            showNotLogin();
        }
    })

    var multiplayer = $.connection.multiplayerHub;

    multiplayer.client.broadcastMaze = function (maze) {
        document.title = maze.Name;
        var mazecanvas = document.getElementById("mazeCanvas");     
        mazecanvas.tabIndex = 0;
        $("#mazeCanvas").mazeBoard(maze, multiplayer);
        $("#otherMazeCanvas").otherMazeBoard(maze);
        hideLoading();
        showCanvas();
        mazecanvas.focus();
    };

    multiplayer.client.broadcastLoss = function () {
        $("#mazeCanvas").PlayerLoss();
        var username = sessionStorage.getItem('loginSession');
        multiplayer.server.updateLoss(username);
        var mazename = document.title;
        multiplayer.server.close(mazename);
    };

    multiplayer.client.error = function (msg) {
        alert(msg);
    };

    multiplayer.client.broadcastMove = function (move) {
        var otherMaze = $("#otherMazeCanvas");
        switch (move) {
            case "left":
                otherMaze.leftArrowPressed();
                break;
            case "right":
                otherMaze.rightArrowPressed();
                break;
            case "up":
                otherMaze.upArrowPressed();
                break;
            case "down":
                otherMaze.downArrowPressed();
                break;
        }
    };

    $.connection.hub.start().done(function () {
        $("#btnStartGame").click(function () {
            if (!startValid()) {
                return false;
            }
            LoadingTxt("Wait to another player");
            showLoading();
            var username = sessionStorage.getItem('loginSession');
            var name=$("#name").val();
            var rows =$("#rows").val();
            var cols=$("#cols").val();
            multiplayer.server.start(name, rows, cols);
        });

        $("#btnJoinGame").click(function () {
            var gameSelected = $("#games").val();
            if (!gameSelected) {
                alert("non selected value");
            }
            else {
                LoadingTxt("Loading");
                showLoading();
                multiplayer.server.join(gameSelected);
            }
        })
    });

    $("#name").focus(function () {
        document.getElementById("name-div").className = "form-group row";
        document.getElementById("name").className = "form-control form-control-sm";
    })

    $("#rows").focus(function () {
        document.getElementById("rows-div").className = "form-group row";
        document.getElementById("rows").className = "form-control form-control-sm";
        $("#errorRowsRange").hide();
    })

    $("#cols").focus(function () {
        document.getElementById("cols-div").className = "form-group row";
        document.getElementById("cols").className = "form-control form-control-sm";
        $("#errorColsRange").hide();
    })

    function checkNameValid() {
        if (!$("#name").val()) {
            document.getElementById("name-div").className = "form-group row has-danger";
            document.getElementById("name").className = "form-control form-control-sm form-control-danger";
            return false;
        }
        return true;
    };

    function checkRowsValid() {
        if (!$("#rows").val() || $("#rows").val() < 1 || $("#rows").val() > 100) {
            document.getElementById("rows-div").className = "form-group row has-danger";
            document.getElementById("rows").className = "form-control form-control-sm form-control-danger";
            $("#errorRowsRange").show();
            return false;
        }
        return true;
    };

    function checkColsValid() {
        if (!$("#cols").val() || $("#cols").val() < 1 || $("#cols").val() > 100) {
            document.getElementById("cols-div").className = "form-group row has-danger";
            document.getElementById("cols").className = "form-control form-control-sm form-control-danger";
            $("#errorColsRange").show();
            return false;
        }
        return true;
    };

    function startValid() {
        var nameValid = checkNameValid();
        var rowsValid = checkRowsValid();
        var colsValid = checkColsValid();
        if (!nameValid || !rowsValid || !colsValid) {
            return false;
        }
        return true;
    }

    function showOptions() {
        $("#option-div").show();
    }

    function showLoading() {
        $("#loading-maze").show();
    }

    function hideLoading() {
        $("#loading-maze").hide();
    }

    function LoadingTxt(txt) {
        document.getElementById("lodaing-text").innerHTML = txt;
    }

    function showMenuMulti() {
        $("#from-multi").show();
    }

    function hideMenuMulti() {
        $("#from-multi").hide();
    }

    function showNotLogin() {
        $("#not-connected").show();
    }

    function hideNotLogin() {
        $("#not-connected").hide();
    }

    //show canvas
    function showCanvas() {
        $("#myCanvas").show();
        $("#otherCanvas").show();
    }
})(jQuery);

function dropdownFocus() {
    var apiUrl = "../../api/Multiplayer/ListGame";
    $.get(apiUrl)
    .done(function (list) {
        var select = document.getElementById("games");
        select.options.length = 0;
        for (index in list) {
            select.options[select.options.length] = new Option(list[index], list[index]);
        }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status == 500) {
            alert("error in connection to server");
        }
    });
}