let check = true;
$(document).ready(function(){
    var showBox = $('#crosshair');

    //ZoomBox
    var divCompareOffsetTop=showBox.offset().top;
    $('#zoomBox').css('top',(divCompareOffsetTop))
        .css('position', 'absolute');
    $('#zTopLeft').css('background-image', document.getElementById('topleft').style.backgroundImage);
    document.getElementById('zTopLeft').style.backgroundSize = (1400) +'px '+ (800)+'px';
    $('#zTopRight').css('background-image', document.getElementById('topright').style.backgroundImage);
    //$('#zBottomLeft').css('background-image', document.getElementById('bottomleft').style.backgroundImage);
    //$('#zBottomRight').css('background-image', document.getElementById('bottomright').style.backgroundImage);


    //Draggable Items Set
    let anzahl = $('#boxes').text();
    showBox.on('mousemove', function (e) {
        var parentOffset = $(this).offset();
        //or $(this).offset(); if you really just want the current element's offset
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        //alert("Hello World " + relY);

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

                document.getElementById('zTopLeft').style.backgroundPosition = "-"+relX*1.5+"px -"+relY*1.5+"px";
                document.getElementById('zTopRight').style.backgroundPosition = "-"+relX/2+"px -"+relY/2+"px";
                document.getElementById('zBottomLeft').style.backgroundPosition = "-"+relX/2+"px -"+relY/2+"px";
                document.getElementById('zBottomRight').style.backgroundPosition = "-"+relX/2+"px -"+relY/2+"px";
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

    var startX, startY, endX, endY, endWidth, endHeight,down, imagine;
    imagine = $('<div id="imagine" width="100px" height="100px">TEST</div>').appendTo('#crosshair');
    showBox.on('mousedown',function f(e) {

        let parentOffset = $(this).offset();

        startX = e.pageX - parentOffset.left;
        startY = e.pageY - parentOffset.top;



        imagine.css('z-index', '9999')
                .css('top', startY)
                .css('left', startX)
                .css('border', '1px solid red')
                .css('position', 'absolute')
                .css('z-index', '100');

        down = true;

        });
    showBox.on('mouseup', function (e) {
        let parentOffset = $(this).offset();

        endX = e.pageX - parentOffset.left;
        endY = e.pageY - parentOffset.top;
        down = false;
    });

    showbox.on('movemove', function (e) {
        if(check){
            let parentOffset = $(this).offset();
            alert('bis hier hin?');
            endWidth = e.pageX - parentOffset.left - startX;
            endHeight = e.pageY - parentOffset.top - startY;


            imagine.css('width', endWidth)
                .css('height', endHeight);
        }
    });

    var lens = $('<div>test</div>').appendTo('#crosshair');








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

function createLens(e) {
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    /*calculate the position of the lens:*/
    x = pos.x
    y = pos.y
    /*prevent the lens from being positioned outside the image:*/
    /*
    if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
    if (y < 0) {y = 0;}
    */




}
