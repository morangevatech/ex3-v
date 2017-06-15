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

    var multiplayerHub = $.connection.MultiplayerHub;

    $.connection.hub.start().done(function () {
        $("#btnStartGame").click(function () {
            if (!startValid()) {
                return false;
            }
            showLoading();
            multiplayerHub.server.connect();
        })

        multiplayerHub.server.sendMessage();

        multiplayerHub.client.gotMessage = function () {
            alert("message");
        };      
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
})(jQuery);