(function ($) {
    $(document).ready(function () {
        if (sessionStorage.getItem('loginSession')) {
            hideLoginBtn();
            showLogoutBtn();
            showUsername();
        }
        else {
            showLoginBtn();
            hideLogoutBtn();
            hideUsername();
        }
    })

    $("#logout").click(function () {
        sessionStorage.removeItem('loginSession');
    })
    //sessionStorage.setItem('loginSession', login.Username);

    function showLoginBtn() {
        $("#login").show();
    }

    function hideLoginBtn() {
        $("#login").hide();
    }

    function showLogoutBtn() {
        $("#logout").show();
    }

    function hideLogoutBtn() {
        $("#logout").hide();
    }

    function showUsername() {
        document.getElementById("username").innerHTML = "Hello "+ sessionStorage.getItem('loginSession') +"!";
        $("#username").show();
    }

    function hideUsername() {
        $("#username").hide();
    }

})(jQuery);