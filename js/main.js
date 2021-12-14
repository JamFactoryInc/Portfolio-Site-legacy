$(document).ready(function() {
    var morpheusConfig = {
            duration: 200,
            rotation: 'none'
        },
        shapesIcon = new SVGMorpheus('#shapes-icon', morpheusConfig),
        infoIcon = new SVGMorpheus('#info-icon', morpheusConfig),
        githubIcon = new SVGMorpheus('#github-icon', morpheusConfig),
        linkedinIcon = new SVGMorpheus('#linkedin-icon', morpheusConfig);

    var icons = {
        'shapes': [shapesIcon, '#projects', '#shapes-icon'],
        'info': [infoIcon, '#welcome-section', '#info-icon']
    }

    var clicked = false;

    $('.current-page').children().css('fill', '#111');

    function resetNav() {
        $('.nav-toggle').children().css('fill', '#AAA');
        $('.nav-toggle').removeClass('current-page');
    }

    $(window).scroll(function() {

        if (!clicked) {
            resetNav();
        } else {
            clicked = false;
        }
        if ($(window).scrollTop() <= 0) {
            $('#info').addClass('current-page');
            $('.current-page').children().css('fill', '#111');
        }
    });

    $('.nav-toggle').mousedown(function() {
        clicked = true;
        resetNav();
        $(this).addClass('current-page');
    });


    $('.nav-toggle').mouseup(function() {
        $(this).children().css('fill', '#111')
    });

    $('.shapes-toggle').click(function() {
        shapesIcon.to('shapes');
        $("#shapes-icon").css("padding-left", "unset");
    })

    $('.project-tile').click(function() {
        window.location.replace(window.location.origin + '/projects/' + this.id + '/html/index.html');
    })

    function morph(iconID) {
        var icon = icons[iconID];
        icon[0].to('link');
        console.log(icon[1]);
        $(this).toggleClass('toggle-on');
        if (!$(this).hasClass('current-page')) {
            if ($(this).hasClass('toggle-on')) {
                icon[0].to($(window).scrollTop() < $(icon[1]).position().top ? 'link' : 'linkup');
                $(icon[2]).css("padding-left", "8px");
            } else {
                icon[0].to(iconID);
                $(icon[2]).css("padding-left", "unset");
                $(icon[2]).css("fill", "#AAA");
            }
        }
    }

    $('.shapes-toggle').hover(function() {
        morph('shapes');
        // $(this).toggleClass('toggle-on');
        // if (!$(this).hasClass('current-page')) {
        //     if ($(this).hasClass('toggle-on')) {
        //         shapesIcon.to($(window).scrollTop() < $('#projects').position().top ? 'link' : 'linkup');
        //         $("#shapes-icon").css("padding-left", "8px");
        //     } else {
        //         shapesIcon.to('shapes');
        //         $("#shapes-icon").css("padding-left", "unset");
        //         $("#shapes-icon").css("fill", "#AAA");
        //     }
        // }
    });

    $('.info-toggle').hover(function() {
        morph('info');
        // $(this).toggleClass('toggle-on');
        // if (!$(this).hasClass('current-page')) {
        //     if ($(this).hasClass('toggle-on')) {
        //         infoIcon.to($(window).scrollTop() <= $('#welcome-section').position().top ? 'link' : 'linkup');
        //         $("#info-icon").css("padding-left", "8px");
        //     } else {
        //         infoIcon.to('info');
        //         $("#info-icon").css("padding-left", "unset");
        //         $("#info-icon").css("fill", "#AAA");
        //     }
        // }
    });

    $('.github-toggle').hover(function() {
        $(this).toggleClass('toggle-on');

        if ($(this).hasClass('toggle-on')) {
            githubIcon.to('exlink');
        } else {
            githubIcon.to('github');
            $("#github-icon").css("fill", "#AAA");
        }
    });

    $('.linkedin-toggle').hover(function() {
        $(this).toggleClass('toggle-on');

        if ($(this).hasClass('toggle-on')) {
            linkedinIcon.to('exlink');
        } else {
            linkedinIcon.to('linkedin');
            $("#linkedin-icon").css("fill", "#AAA");
        }
    });


    $('.info-toggle').click(function() {
        infoIcon.to('info');
        $("#info-icon").css("padding-left", "unset");
    })

});