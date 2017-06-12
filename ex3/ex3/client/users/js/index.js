$('.toggle').on('click', function() {
  $('.container').stop().addClass('active');
});

$('.close').on('click', function() {
  $('.container').stop().removeClass('active');
});


(function ($) { 
    $("#btnLogin").click(function () {
        var username = $('input[id=username-login]').val();
        var password = $('input[id=password-login]').val();
        if (!username || !password) {
            alert("field null");
            return false;
        }
    });

    $("#btnRegister").click(function () {
        var username = $('input[id=username-register]').val();
        var password = $('input[id=password-register]').val();
        var confirm = $('input[id=confirm-password]').val();
        var email = $('input[id=email]').val();
        if (!username || !password || !confirm || !email) {
            alert("field null");
            return false;
        }
        if (password != confirm) {
            alert("pass not equal");
            return false;
        }
        if (!email.includes('@')) {
            alert("email");
        }
        var apiUrl = "../../api/Users/AddUser";
        var register = {
            Username: username,
            Password: password,
            Email: email
        };
        $.post(apiUrl, { Username: register.Username, Password: register.Password, Email: register.Email })
        //$.post(apiUrl, register)
        .done(function () {
            alert("add");
        })
        .fail(function () {
            alert("Error: username exist in system, choose another")
        });
    });

})(jQuery);