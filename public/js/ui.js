let check = true;
var insets = [];
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


        $('#crosshair').droppable({
            drop: function(e, ui) {
                let check = $(ui.draggable).attr('class');

                if (check.search('picture') >= 0) {
                    var parentOffset = $(this).offset();
                    let relX = e.pageX - parentOffset.left;
                    let relY = e.pageY - parentOffset.top;
                    var picture = $(ui.draggable).children().attr('src');
                    var target;
                    if (relX < $(this).width() / 2) {
                        if (relY < $(this).height() / 2) {
                            target = $('#topleft');
                        } else {
                            target = $('#bottomleft');
                        }
                    } else {
                        if (relY < $(this).height() / 2) {
                            target = $('#topright');
                        } else {
                            target = $('#bottomright');
                        }
                    }
                    target.css('background-image', 'url("' + picture + '")');
                }
            }
        });


       // For freeze the crosshair
    }).on('click',function () {
        check=!check;
    });

    // language=JQuery-CSS
    $('#testBox')
        .mousedown(function() {
            // set fixed height to prevent scroll jump
            // when dragging from bottom
            $(this).height($(this).height());
        }).mouseup(function () {
        // set height back to auto
        // when user just clicked on item
        $(this).height('auto');
    })
    .sortable({
        start: function() {
            $(this).height($(this).height());
        },
        stop: function() {
            // dragging is happening
            // and scroll jump was prevented,
            // we can set it back to auto
            $(this).height('auto');
        }
    });



    var tempCheck;
    // Set the thumb pictures draggable
    $("#draggable, div.picture").draggable({
        containment:'document',
        revert: true,
        stack : 'div',
        start: function (event, ui) {
            $('#topleft').css('width', '350px')
                .css('height', '200px');
            $('#topright').css('height', '200px');
            $('#bottomleft').css('width', '350px');
            tempCheck = check;
            check = false;
        },
        stop: function (event, ui) {
            check=tempCheck;
        }
    });

});


/**
 * This function creates a new Inset into the compareBox
 */

function createInset() {
    let inset = new Inset();
    insets.push(inset);
}

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
