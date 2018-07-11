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



var colours =[red, blue, green, purpel, pink];

/**
 * This function creates a new box into the compareBox
 */
function createBox(){
    //Create a new Box
    let imagine = $('<div></div>').appendTo('#crosshair');
    //Config box
    imagine.css('z-index', '100')
        .css('border', '1px solid red')
        .css('width', '100px')
        .css('height', '100px')
        .css('position', 'absolute');
    //set Box draggable and resizable
    imagine.draggable({containment:'parent'});
    imagine.resizable({handles:'all', autoHide:true, aspectRatio:true});
    createBoxDiv(imagine);

}

function createBoxDiv(box){
    let src = getElementsByClassName(document, 'picture');
    let anzahl = $(src).length;
    let div = $('<div></div>').appendTo('#testBox');
    div.css('height', box.css('height'));


    for(let i=0; i<anzahl; i++){
        let imgView = $('<div></div>').appendTo(div);
        imgView.css('height', box.css('height'))
            .css('width', box.css('height'))
            .css('float', 'left')
            .css('margin', '5px 5px 5px 5px')
            .css('background-image', 'url('+$(src[i]).children('img').attr('src')+')');

    }

}


//https://stackoverflow.com/questions/1933602/how-to-getelementbyclass-instead-of-getelementbyid-with-javascript
function getElementsByClassName(node,classname) {
    if (node.getElementsByClassName) { // use native implementation if available
        return node.getElementsByClassName(classname);
    } else {
        return (function getElementsByClass(searchClass,node) {
            if ( node == null )
                node = document;
            let classElements = [],
                els = node.getElementsByTagName("*"),
                elsLen = els.length,
                pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)"), i, j;

            for (i = 0, j = 0; i < elsLen; i++) {
                if ( pattern.test(els[i].className) ) {
                    classElements[j] = els[i];
                    j++;
                }
            }
            return classElements;
        })(classname, node);
    }
}
