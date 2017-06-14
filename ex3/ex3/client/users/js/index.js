(function ($) {
    $('.toggle').on('click', function () {
        $('.container').stop().addClass('active');
        hideLoginError();
    });

    $('.close').on('click', function () {
        $('.container').stop().removeClass('active');
        hideRegisterError();
    });

    $("#btnLogin").click(function () {
        var msgError = document.getElementById("error-msg-login");
        var username = $('input[id=username-login]').val();
        var password = $('input[id=password-login]').val();
        if (!username || !password) {
            msgError.innerHTML = "# All feilds requered";
            showLoginError();
            return false;
        }
        var apiUrl = "../../api/Users/LoginUser";
        var login = {
            Username: username,
            Password: password
        };
        $.post(apiUrl, { Username: login.Username, Password: login.Password})
        .done(function () {
            createSession();
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 404) {
                msgError.innerHTML = "# Username not exist or password incorrect";
                showLoginError();
            }
            if (jqXHR.status == 500)
            {
                alert("error in connection to server");
            }                     
        });
    });

    $("#btnRegister").click(function () {
        var msgError = document.getElementById("error-msg-register");
        var username = $('input[id=username-register]').val();
        var password = $('input[id=password-register]').val();
        var confirm = $('input[id=confirm-password]').val();
        var email = $('input[id=email]').val();
        if (!registerValid(username, password, confirm, email)) {
            return false;
        }
        var apiUrl = "../../api/Users/AddUser";
        var register = {
            Username: username,
            Password: password,
            Email: email
        };
        $.post(apiUrl, { Username: register.Username, Password: register.Password, Email: register.Email })
        .done(function () {
            createSession();
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 404) {
                msgError.innerHTML = "# username exist";
                showRegisterError();
            }
            if (jqXHR.status == 500) {
                alert("error in connection to server");
            }
        });
    });

    function registerValid(username, password, confirm, email, msgError) {
        var msgError = document.getElementById("error-msg-register");
        if (!username || !password || !confirm || !email) {
            msgError.innerHTML = "# All feilds requered";
            showRegisterError();
            return false;
        }
        if (password != confirm) {
            msgError.innerHTML = "# Passwords not equals";
            showRegisterError();
            return false;
        }
        if (!email.includes('@')) {
            msgError.innerHTML = "# Email must contain '@'";
            showRegisterError();
            return false;
        }
        return true;
    }

    function showLoginError() {
        $("#error-login").show();
    }

    function hideLoginError() {
        $("#error-login").hide();
    }

    function showRegisterError() {
        $("#error-register").show();
    }

    function hideRegisterError() {
        $("#error-register").hide();
    }

    function createSession() {
        sessionStorage.setItem('loginSession', login.Username);
        window.location.href = "../home/index.html";
    }

    $("#username-login").focus(function(){
        hideLoginError();
    })

    $("#password-login").focus(function () {
        hideLoginError();
    })

    $("#username-register").focus(function () {
        hideRegisterError();
    })

    $("#password-register").focus(function () {
        hideRegisterError();
    })

    $("#password-register").focus(function () {
        hideRegisterError();
    })

    $("#email").focus(function () {
        hideRegisterError();
    })
})(jQuery);