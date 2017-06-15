(function ($) {
    //page upload
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

    //logout click button
    $("#logout").click(function () {
        sessionStorage.removeItem('loginSession');
    })

    //show login button
    function showLoginBtn() {
        $("#login").show();
    }

    //hide login button
    function hideLoginBtn() {
        $("#login").hide();
    }

    //show logout button
    function showLogoutBtn() {
        $("#logout").show();
    }

    //hide logout button
    function hideLogoutBtn() {
        $("#logout").hide();
    }

    //show user name label
    function showUsername() {
        document.getElementById("username").innerHTML = "Hello "+ sessionStorage.getItem('loginSession') +"!";
        $("#username").show();
    }

    //show hide name label
    function hideUsername() {
        $("#username").hide();
    }

})(jQuery);