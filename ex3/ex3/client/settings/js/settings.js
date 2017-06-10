$("#rows").val(localStorage.getItem("rows"));
$("#cols").val(localStorage.getItem("cols"));
if (localStorage.getItem("algo") != null)
{
    $("#algo").val(localStorage.getItem("algo"));
}

$("#form-settings").submit(function(e){
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