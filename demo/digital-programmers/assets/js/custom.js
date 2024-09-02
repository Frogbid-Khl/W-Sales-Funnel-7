/* ==================================================
	Theme Name: Digital Programmers Template
    Theme URL: https://www.ogwebsolutions.com/
    Author: OG Websolutions Pvt. Ltd.
    Version:  1.0
===================================================== */
jQuery(document).ready(function($) {
    /*=========================================
		# Header
	=========================================*/
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1) {
            $('header').addClass('sticky');
        } else {
            $('header').removeClass('sticky');
        }
    })

    /*=========================================
		## Nav Bar on Mobile
	=========================================*/

    $(" .navbar .nav .nav-item .nav-link").click(function() {
        $(".navbar-collapse").removeClass("show");
        $(".navbar-toggler").removeClass("close");
    })

    $(document).on('click', 'body', function() {
        if ($('#navbarSupportedContent').hasClass('show')) {
            $('#navbarSupportedContent').removeClass('show');
            $(".navbar-toggler").toggleClass("close");
        }
    });

    $(".navbar-toggler").click(function() {
        $(".navbar-toggler").toggleClass("close");
    });



    /*=========================================
        Back to top button
    =========================================*/
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.backtotop').fadeIn(100);
        } else {
            $('.backtotop').fadeOut(100);
        }
    });
    $('.backtotop').click(function() {
        $("html, body").animate({ scrollTop: 0 }, 100);
        return false;
    });
    /*================================================== 
        Copyright year auto update 
    ================================================== */
    $('#copy_rightYears').html(new Date().getFullYear());

    /*=========================================
        ## Smooth Scroll
    =========================================*/

    $(".navbar a[href^='#']").on('click', function(event) {
        event.preventDefault();
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 60
        }, 300);
    });
    /*=========================================
        Registration Form
    =========================================*/
    if ($("#consultationForm").length) {
        $('#consultationForm').validate({
            errorPlacement: function(error, element) {
                return true;
            },
            rules: {
                email: {
                    required: true,
                    email: true
                },
            },
            submitHandler: function(form) {
                var formData = $('#consultationForm').serialize();
                $.ajax({
                    type: 'POST',
                    url: 'assets/php/popup-form.php',
                    dataType: "json",
                    data: formData,
                    success: function(data) {
                        if (data.success) {
                            $('.form-status').addClass('alert alert-success');
                            $('.form-status').text('Your Message Has been Sent Successfully');
                            form.submit();
                            $('.form-status').slideDown().delay(3000).slideUp();
                            $("#consultationForm").trigger("reset");
                            window.location.href = 'thank-you.html';
                        } else {
                            $('.form-status').addClass('alert alert-danger');
                            $('.form-status').text('SMTP connect() failed.');
                            $('.form-status').slideDown().delay(3000).slideUp();
                        }
                    },
                    error: function(xhr, status, error) {
                        $('.form-status').addClass('alert alert-danger');
                        $('.form-status').text('Something Went Wrong');
                        $('.form-status').slideDown().delay(3000).slideUp();
                    }
                });
            }
        });
    }

});



/* ================================================== 
   FAQ 
================================================== */
function close_accordion_section() {
    $('.accordion .accordion-section-title').removeClass('active');
    $('.accordion .accordion-section-content').slideUp(300).removeClass('open');
}

$('.accordion-section-title').click(function(e) {
    // Grab current anchor value
    var currentAttrValue = $(this).attr('href');

    if ($(e.target).is('.active')) {
        close_accordion_section();
    } else {
        close_accordion_section();

        // Add active class to section title
        $(this).addClass('active');
        // Open up the hidden content panel
        $('.accordion ' + currentAttrValue).slideDown(300).addClass('open');
    }

    e.preventDefault();
});