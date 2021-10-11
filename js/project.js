$(document).ready(function() {
    var deg = Math.random() * 360;
    var scrollPercentage = 0;
    var navHeight = $(window).height() / 20;
    var scroll = $('scroll')
    var docHeight = 0;
    var winHeight = 0;
    var scrollHeight = 0;

    $("body").get(0).style.setProperty("--raspberry-third", "hsl(" + (deg + 120) + ", 70%, 70% )");
    $("body").get(0).style.setProperty("--raspberry-vibrant", "hsl(" + (deg + 180) + ", 70%, 70% )");
    $("body").get(0).style.setProperty("--raspberry-r-1", "hsl(" + (deg + 20) + ", 74%, 60% )");
    $("body").get(0).style.setProperty("--raspberry-l-1", "hsl(" + (deg - 20) + ", 74%, 90% )");
    $("body").get(0).style.setProperty("--raspberry-light", "hsl(" + deg + ", 74%, 80% )");
    $("body").get(0).style.setProperty("--raspberry", "hsl(" + deg + ", 74%, 55% )");
    $("body").get(0).style.setProperty("--secondary", "hsl(" + (deg + 40) + ", 74%, 55% )");
    $("body").get(0).style.setProperty("--background-color-light", "hsl(" + deg + ", 74%, 8% )");
    $("body").get(0).style.setProperty("--background-color", "hsl(" + deg + ", 74%, 5% )");
    $("body").get(0).style.setProperty("--background-color-dark", "hsl(" + deg + ", 74%, 3% )");

    $("#jam-icon-svg").css("filter", "hue-rotate( " + (deg + 10) + "deg)");

    setInterval(function() {
        docHeight = $(document).height();
        winHeight = $(window).height();
        navHeight = winHeight / 20;
        scrollPercentage = $(window).scrollTop() / (docHeight - winHeight);
        scrollHeight = (winHeight - navHeight) * winHeight / docHeight;
        scroll.css('height', scrollHeight);
        $('scroll span').html(Math.round(scrollPercentage * 100) + "%");
        scroll.css('top', ((winHeight - navHeight - scrollHeight) * scrollPercentage) + navHeight);
    }, 10);


    $("img").click(function() {
        $('overlay').attr('src', $(this).attr('src'));
        $('overlay').toggleClass('show-overlay')
    })

    $("pre").each(function() {
        $(this).prepend("<div class='pre-before expanded' onclick=\"this.classList.toggle('collapsed');this.classList.toggle('expanded')\">&nbsp;<i class='fas fa-caret-down '></i>&nbsp;" + $(this).attr("name") + "</div>");
    })

    $('.section-title').each(function() {
        $('glossary').append("<button>" + $(this).text() + "</button>");
    });

    $('.pre-before').click(function() {
        $(this).parent().toggleClass('is-collapsed');
    });

    $("*").mousedown(() => {
        $("*").removeClass('highlighted');
    });

    $(".function").mouseup(function() {
        let text = $(this).text()
        $("*").removeClass('highlighted');
        $(".function").filter(function() {
            return $(this).text() === text;
        }).addClass('highlighted');
    });

    $(".class-name").mouseup(function() {
        let text = $(this).text()
        $("*").removeClass('highlighted');
        $(".class-name").filter(function() {
            return $(this).text() === text;
        }).addClass('highlighted');
    });

    /*console.log(Array.from($("code").contents()));

    Array.from($("code").contents()).forEach(element => {
        if (element.nodeName == '#text') {
            var text = element.nodeValue.trim();
            if (text.length > 0)
                console.log(element.nodeName);
        }


    });

    //var words = document.getElementsByTagName("CODE").childNodes[0].nodeValue;



    /*$(".token:not").mouseup(function() {
        $("*").removeClass('highlighted');
        $("#text:contains(" + $(this).text() + ")").addClass('highlighted');
    });*/

    ['#', 'hsl', 'rgb'].forEach(element => {
        $(".string:contains(" + element + ")").each(function() {

            let text = $(this).text().substring(1, $(this).text().length - 1);
            if (isColor(text)) {
                $(this).addClass('color-' + text);
                $(this).attr('style', 'box-shadow: 0px 2px 0 ' + text + " !important");
            }
        })
    });


    function isColor(strColor) {
        const s = new Option().style;
        s.color = strColor;
        return s.color !== '';
    }


})