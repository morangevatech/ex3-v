(function ($) {
    //click on toggle register
    $('.toggle').on('click', function () {
        $('.container').stop().addClass('active');
        hideLoginError();
    });

    //click on close at register form
    $('.close').on('click', function () {
        $('.container').stop().removeClass('active');
        hideRegisterError();
    });

    //click on login
    $("#btnLogin").click(function () {
        var msgError = document.getElementById("error-msg-login");
        var username = $('input[id=username-login]').val();
        var password = $('input[id=password-login]').val();
        //check validation
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
        showLoadingLogin();
        //send post request to check details
        $.post(apiUrl, { Username: login.Username, Password: login.Password})
        .done(function () {
            createSession(username);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 404) {
                msgError.innerHTML = "# Username not exist or password incorrect";
                showLoginError();
            }
            if (jqXHR.status == 500)
            {
                hideLoadingLogin();
                alert("error in connection to server");
            }                     
        });
    });

    //click on register button
    $("#btnRegister").click(function () {
        var msgError = document.getElementById("error-msg-register");
        var username = $('input[id=username-register]').val();
        var password = $('input[id=password-register]').val();
        var confirm = $('input[id=confirm-password]').val();
        var email = $('input[id=email]').val();
        //check validation
        if (!registerValid(username, password, confirm, email)) {
            return false;
        }
        var apiUrl = "../../api/Users/AddUser";
        var register = {
            Username: username,
            Password: password,
            Email: email
        };
        showLoadingRegister();
        //send post request to check if username doesn't exist and create him
        $.post(apiUrl, { Username: register.Username, Password: register.Password, Email: register.Email })
        .done(function () {
            createSession(username);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status == 404) {
                msgError.innerHTML = "# username exist";
                showRegisterError();
            }
            if (jqXHR.status == 500) {
                hideLoadingRegister()
                alert("error in connection to server");
            }
        });
    });

    //register validation form
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

    //show login error msg
    function showLoginError() {
        hideLoadingLogin();
        $("#error-login").show();
    }

    //hide login error msg
    function hideLoginError() {
        $("#error-login").hide();
    }

    //show register error msg
    function showRegisterError() {
        hideLoadingRegister();
        $("#error-register").show();
    }

    //hide register error msg
    function hideRegisterError() {
        $("#error-register").hide();
    }

    function showLoadingLogin() {
        $("#loading-login").show();
    }

    function hideLoadingLogin() {
        $("#loading-login").hide();
    }

    function showLoadingRegister() {
        $("#loading-register").show();
    }

    function hideLoadingRegister() {
        $("#loading-register").hide();
    }


    //create new session to user
    function createSession(username) {
        sessionStorage.setItem('loginSession', username);
        window.location.href = "../home/index.html";
    }

    //focus on username field in loading form, hide label error
    $("#username-login").focus(function(){
        hideLoginError();
    })

    //focus on password field in loading form, hide label error
    $("#password-login").focus(function () {
        hideLoginError();
    })

    //focus on username field in register form, hide label error
    $("#username-register").focus(function () {
        hideRegisterError();
    })

    //focus on password field in register form, hide label error
    $("#password-register").focus(function () {
        hideRegisterError();
    })

    //focus on confirm password field in register form, hide label error
    $("#confirm-password").focus(function () {
        hideRegisterError();
    })

    //focus on email field in register form, hide label error
    $("#email").focus(function () {
        hideRegisterError();
    })
})(jQuery);