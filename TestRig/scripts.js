var windowWidth = $(window).width();
var windowHeight = $(window).height();

$(window).resize(function() {
    var widthChange = windowWidth - $(window).width();
    if (widthChange > 20 || widthChange < -20) {
        windowWidth = $(window).width();
        generate();
    }
    var heightChange = windowHeight - $(window).height();
    if (heightChange > 20 || heightChange < -20) {
        windowHeight = $(window).height();
        generate();
    }
});

function generate() {
    console.log("Change detected. Now " + $(window).width() + "x" + $(window).height() + ".");
}

function darken(id,percent) {
    /*DEBUG*/
        if (0>percent || 1<percent) {
            console.log("Bad percentage: "+percent);
        }
        if ($('#'+id).size() != 1) {
            console.log("Bad id: "+id+" (" + $('#'+id).size() +" occurrences in document)")
        }
    /*END DEBUG*/
    if('opacity' in document.body.style) {
        $('#'+id).first().parent().css("background-color","rgb(0,0,0)");
        $('#'+id).first().css("opacity",1-percent);
    } else {
        console.log("Browser does not support opacity.")
    } 
}

function lighten(id,percent) {
    /*DEBUG*/
        if (0>percent || 1<percent) {
            console.log("Bad percentage: "+percent);
        }
        if ($('#'+id).size() != 1) {
            console.log("Bad id: "+id+" (" + $('#'+id).size() +" occurrences in document)")
        }
    /*END DEBUG*/
    if('opacity' in document.body.style) {
        $('#'+id).first().parent().css("background-color","rgb(255,255,255)");
        $('#'+id).first().css("opacity",1-percent);
    } else {
        console.log("Browser does not support opacity.")
    }
}