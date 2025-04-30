$(document).ready(function () {
    $("#contactForm").on("submit", function (e) {
        e.preventDefault();

        const name = $("#name").val();
        const email = $("#email").val();
        const subject = $("#subject").val();
        const message = $("#message").val();

        $("#sendMessageButton").prop("disabled", true);

        $.ajax({
            url: "http://localhost:3000/send-email",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                name: name,
                email: email,
                subject: subject,
                message: message
            }),
            success: function () {
                $('#success').html("<div class='alert alert-success'>");
                $('#success > .alert-success')
                    .html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
                    .append("<strong>Your message has been sent. </strong>")
                    .append('</div>');
                $('#contactForm')[0].reset();
            },
            error: function () {
                $('#success').html("<div class='alert alert-danger'>");
                $('#success > .alert-danger')
                    .html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
                    .append("<strong>Sorry, something went wrong. Please try again later!</strong>")
                    .append('</div>');
            },
            complete: function () {
                setTimeout(function () {
                    $("#sendMessageButton").prop("disabled", false);
                }, 1000);
            }
        });
    });
});
