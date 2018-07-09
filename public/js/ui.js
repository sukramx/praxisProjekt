let check = true;
$(document).ready(function(){
    let showBox = $('#crosshair');



    //Draggable Items Set
    let anzahl = $('#boxes').text();
    showBox.on('mousemove', function (e) {
        let parentOffset = $(this).offset();
        //or $(this).offset(); if you really just want the current element's offset
        let relX = e.pageX - parentOffset.left;
        let relY = e.pageY - parentOffset.top;


        if(check===true) {
            if (anzahl == 2) {
                $('#topleft').css('width', relX.toString());
                //document.getElementById('zTopLeft').style.backgroundPosition = "-"+(relX*document.getElementById('zTopLeft').width)+"px -"+(document.getElementById('zTopLeft').height)+"px";
            }
            else if (anzahl == 3){
                $('#topleft').css('width', relX.toString())
                    .css('height', relY.toString());
                $('#topright').css('height', relY.toString());
            }
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
    });

});

function getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
}



var boxes =[];

function createBox(){
    //alert("Create Box");
    let imagine = $('<div></div>').appendTo('#crosshair');
    //boxes.add(imagine);

    imagine.css('z-index', '100')
        .css('border', '1px solid red')
        .css('width', '100px')
        .css('height', '100px')
        .css('position', 'absolute');
    imagine.draggable({containment:'parent'});
    imagine.resizable({handles:'all', autoHide:true, aspectRatio:true});
    //alert("Box Created");
}