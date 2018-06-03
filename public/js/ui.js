let check = true;
$(document).ready(function(){

    let anzahl = $('#boxes').text();
    $('#crosshair').on('mousemove', function (e) {
        var parentOffset = $(this).offset();
        //or $(this).offset(); if you really just want the current element's offset
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        //alert("Hello World " + relY);

        if(check===true) {
            if (anzahl == 2)
                $('#topleft').css('width', relX.toString());
            else if (anzahl > 1) {
                $('#topleft').css('width', relX.toString())
                    .css('height', relY.toString());
                $('#topright').css('height', relY.toString());
                $('#bottomleft').css('width', relX.toString());
            }
        }

    }).on('click',function () {
        check=!check;
    });


    $("#draggable, div.picture").draggable({
        containment:'document',
        revert: true

    });
    $('div.picture').on('mousedown',function () {
        $(this).css('z-index','9999')
    }).on('mouseup',function () {
        $(this).css('z-index','0')
    })



});


