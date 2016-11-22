$(document).ready(function () {

    Parse.initialize("8sLqR4oSLiT7Tsy85JMYr9a64y9kry01ehpUUewO", "bjkxqZM4jf7uoCnrRKFaR75yAqr9MnFqLWiVUKYJ");

    setTimeout(function () {
        mixpanel.track("Page viewed");
    }, 500);

    $('.btn-subscribe').on('click', function () {
        var email = $(this).prev('input').val(),
            EmailObject = Parse.Object.extend("Email"),
            emailObject = new EmailObject(),
            $errMsg = $(this).next('p'),
            $successMsg = $(this).next('p').next('p');

        mixpanel.track("Subscribe button clicked");

        if (!validateEmail(email)) {
            $errMsg.show();
            return false;
        }

        $errMsg.hide();
        $successMsg.hide();

        emailObject.save({ email: email }).then(function (object) {
            $successMsg.show();
            mixpanel.track("Sent Email", { email: email });
            fbq('track', 'Lead');
        });

        return false;
    });

    $('.popup-with-form').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#email',

        // When elemened is focused, some mobile browsers in some cases zoom in
        // It looks not nice, so we disable it:
        callbacks: {
            beforeOpen: function () {
                if ($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#name';
                }
            }
        }
    });

    //Track events
    (function trackEvents() {

        $('.nav li a').on('click', function () {
            var text = $(this).text();

            mixpanel.track("Navbar", { option: text });
        });

        $('.home .btn').on('click', function () {
            mixpanel.track("Home - sign up now button clicked");
        });

        $('#flyanywhere .video-btn').on('click', function () {
            mixpanel.track("Fly anywhere - see video button clicked");
        });

    })();

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
});