document.title = "Multiplayer Game";
//local storage items to feilds
$("#rows").val(localStorage.getItem("rows"));
$("#cols").val(localStorage.getItem("cols"));

(function ($) {
    //when page upload
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

    //connect to multuplayerhub
    var multiplayer = $.connection.multiplayerHub;

    //recive maze from hub
    multiplayer.client.broadcastMaze = function (maze) {
        document.title = maze.Name;
        var mazecanvas = document.getElementById("mazeCanvas");     
        mazecanvas.tabIndex = 0;
        $("#mazeCanvas").mazeBoard(maze, multiplayer);
        $("#otherMazeCanvas").otherMazeBoard(maze);
        enableJoin();
        hideLoading();
        showCanvas();
        mazecanvas.focus();
    };

    //recive loss msg from hub
    multiplayer.client.broadcastLoss = function () {
        $("#mazeCanvas").PlayerLoss();
        var username = sessionStorage.getItem('loginSession');
        multiplayer.server.updateLoss(username);
        var mazename = document.title;
        multiplayer.server.close(mazename);
    };

    //recive error msg from hub
    multiplayer.client.error = function (msg) {
        hideLoading();
        alert(msg);
    };

    //recive play move from hub 
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

    //start connection to hub
    $.connection.hub.start().done(function () {
        //click on start game button
        $("#btnStartGame").click(function () {
            if (!startValid()) {
                return false;
            }
            LoadingTxt("Wait to another player");
            showLoading();
            disabledJoin();
            var username = sessionStorage.getItem('loginSession');
            var name=$("#name").val();
            var rows =$("#rows").val();
            var cols=$("#cols").val();
            multiplayer.server.start(name, rows, cols);
        });

        //click on join game button
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

    //focus on name field 
    $("#name").focus(function () {
        document.getElementById("name-div").className = "form-group row";
        document.getElementById("name").className = "form-control form-control-sm";
    })

    //focus on rows field
    $("#rows").focus(function () {
        document.getElementById("rows-div").className = "form-group row";
        document.getElementById("rows").className = "form-control form-control-sm";
        $("#errorRowsRange").hide();
    })

    //focus on cols field
    $("#cols").focus(function () {
        document.getElementById("cols-div").className = "form-group row";
        document.getElementById("cols").className = "form-control form-control-sm";
        $("#errorColsRange").hide();
    })

    //check name field validation
    function checkNameValid() {
        if (!$("#name").val()) {
            document.getElementById("name-div").className = "form-group row has-danger";
            document.getElementById("name").className = "form-control form-control-sm form-control-danger";
            return false;
        }
        return true;
    };

    //check rows field validation
    function checkRowsValid() {
        if (!$("#rows").val() || $("#rows").val() < 1 || $("#rows").val() > 100) {
            document.getElementById("rows-div").className = "form-group row has-danger";
            document.getElementById("rows").className = "form-control form-control-sm form-control-danger";
            $("#errorRowsRange").show();
            return false;
        }
        return true;
    };

    //check cols field validation
    function checkColsValid() {
        if (!$("#cols").val() || $("#cols").val() < 1 || $("#cols").val() > 100) {
            document.getElementById("cols-div").className = "form-group row has-danger";
            document.getElementById("cols").className = "form-control form-control-sm form-control-danger";
            $("#errorColsRange").show();
            return false;
        }
        return true;
    };

    //check start form validation
    function startValid() {
        var nameValid = checkNameValid();
        var rowsValid = checkRowsValid();
        var colsValid = checkColsValid();
        if (!nameValid || !rowsValid || !colsValid) {
            return false;
        }
        return true;
    }

    //show option div
    function showOptions() {
        $("#option-div").show();
    }

    //show loading
    function showLoading() {
        $("#loading-maze").show();
    }

    //hide loading
    function hideLoading() {
        $("#loading-maze").hide();
    }

    //change loading txt
    function LoadingTxt(txt) {
        document.getElementById("lodaing-text").innerHTML = txt;
    }

    //show menu of multiplayer
    function showMenuMulti() {
        $("#from-multi").show();
    }

    //hide menu of multiplayer
    function hideMenuMulti() {
        $("#from-multi").hide();
    }

    //show need to login div
    function showNotLogin() {
        $("#not-connected").show();
    }

    //hide need to login div
    function hideNotLogin() {
        $("#not-connected").hide();
    }

    //show canvas
    function showCanvas() {
        $("#myCanvas").show();
        $("#otherCanvas").show();
    }

    //disabled join to game
    function disabledJoin() {
        document.getElementById("btnJoinGame").disabled = true;
        document.getElementById("games").disabled = true;
    }

    //enable join to game
    function enableJoin() {
        document.getElementById("btnJoinGame").disabled = false;
        document.getElementById("games").disabled = false;
    }
})(jQuery);

//put values from server in games to join
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