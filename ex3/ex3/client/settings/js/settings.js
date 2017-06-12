$("#rows").val(localStorage.getItem("rows"));
$("#cols").val(localStorage.getItem("cols"));
if (localStorage.getItem("algo") != null)
{
    $("#algo").val(localStorage.getItem("algo"));
}

(function ($) {  
    $("#btnSaveSettings").click(function (e) {
        if (!settingsValid()) {
            return false;
        }
        e.preventDefault();
        var rows = $("#rows").val();
        var cols = $("#cols").val();
        var algo = $("#algo").val();
        localStorage.setItem("rows", rows);
        localStorage.setItem("cols", cols);
        localStorage.setItem("algo", algo);
        $("#form-settings").hide();
        $("#settings-saved").show();
    });

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

    function settingsValid() {
        var rowsValid = checkRowsValid();
        var colsValid = checkColsValid();
        if (!rowsValid || !colsValid) {
            return false;
        }
        return true;
    }
})(jQuery);