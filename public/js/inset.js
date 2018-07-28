//"user sctrict";

class Inset {

    constructor(){
        this.inset=this.createInset();
        this.inset.resizable({handles:'all', autoHide:true, aspectRatio:false, containment:'parent'});
        this.inset.draggable({containment: 'parent', stop: this.changePosition()});

        this.insetBox = this.createInsetBox();

    }

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


    get position(){
        return this.inset.position();
    }
    get getHeight(){
        return parseInt(this.inset.css('height'));
    }
    get getWidth(){
        return parseInt(this.inset.css('width'));
    }
    get getInset(){
        return this.inset;
    }
    set setHeight(height){
        this.inset.css('height', height);
    }
    set getWidth(width){
        this.inset.css('width', width);
    }
    set setInsetBox(insetBox){
        this.insetBox=insetBox;
    }
    set setInset(inset){
        this.inset = inset;
    }




    changePosition(){
        let x = this.inset.position().left;
        let  y = this.inset.position().top;
        try {
            this.insetBox.children().css('backgroud-position', x+"px "+y+"px");
        }catch{

        }

    }



}