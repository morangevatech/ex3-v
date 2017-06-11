$("#rows").val(localStorage.getItem("rows"));
$("#cols").val(localStorage.getItem("cols"));

var chat = $.connection.MultiplayerHub;chat.client.broadcastMessage = function (name, message) {
    alert("broadcastMessage");
};var username = prompt('Enter your name:');$.connection.hub.start().done(function () {
    $('#start-game').click(function () {
        // Call the Send method on the hub
        chat.server.send(username,  alert("ok"));
    });
});