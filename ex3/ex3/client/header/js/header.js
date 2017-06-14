﻿(function ($) {
    $(document).ready(function () {
        if (sessionStorage.getItem('loginSession')) {
            hideLoginBtn();
            showLogoutBtn();
        }
        else {
            showLoginBtn();
            hideLogoutBtn();
        }
    })

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

})(jQuery);