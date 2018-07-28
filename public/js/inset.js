//"user sctrict";

class Inset {

    constructor(){
        this.inset=this.createInset();
        this.insetBox = this.createInsetBox();
        this.context = this;
        this.inset.resizable({handles:'all', autoHide:true, aspectRatio:false, containment:'parent', resize: () => {
                this.changeSize();
            }});

        this.inset.draggable({containment:'parent', drag: (event, ui)=> {
                this.changePosition();
            }});
    }

    //Erstellt ein Inset innerhalb der Vergleichsbox
    createInset(){
        let inset = $('<div></div>').appendTo('#crosshair');
        inset
            .css('z-index', '100')
            .css('border', '1px solid red')
            .css('width', '100px')
            .css('height', '100px')
            .css('position', 'absolute');
        return inset;
    }

    //Erstellt ein neues Element welches unterhalb der Vergleichsbox angesiedelt wird.
    createInsetBox(){
        let src = getElementsByClassName(document, 'picture');
        let anzahl = $(src).length;
        let div = $('<div></div>').appendTo('#testBox');
        div.css('height', this.inset.css('height'));

        let insetBoxes = 0;

        for(let i=0; i<anzahl; i++){
            let id = "insetBox"+insets.length+"n"+insetBoxes;
            let imgView = $('<div)></div>').appendTo(div);
            imgView.css('height', this.inset.css('height'))
                .css('width', this.inset.css('height'))
                .css('float', 'left')
                .css('margin', '5px 5px 5px 5px')
                .css('background-image', 'url('+$(src[i]).children('img').attr('src')+')')
                .attr("id", id);
            insetBoxes +=1;
        }
        return div;
    }

    //Wird aufgerufen, wenn das Inset bewegt wird. Aendert die background-position von jedem Bild in der insetBox
    changePosition(){
        let x = - this.inset.position().left;
        let  y = - this.inset.position().top;
        this.insetBox.children().css('background-position', x+'px '+y+'px');
    }

    //Wird aufgerufen, wenn das Inset in der Größe verändert wird. Ändert die Höhe und Breite von jedem Bild in der insetBox
    changeSize(){
        let h = this.inset.css('height');
        let w = this.inset.css('width');

        this.insetBox.children().css('width', w)
            .css('height',h);
    }

    get position(){
        return this.inset.position();
    }









}