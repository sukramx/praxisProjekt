class Inset {
    constructor(inset, insetBox){
        this.inset = inset;
        this.insetBox = insetBox;
        this.inset.css('z-index', '100')
            .css('border', '1px solid red')
            .css('width', '100px')
            .css('height', '100px')
            .css('position', 'absolute');
        this.inset.draggable({containment: parent,stop: this.changePosition()});
    }

    get position(){
        return this.inset.position();
    }
    get height(){
        return parseInt(this.inset.css('height'));
    }
    get width(){
        return parseInt(this.inset.css('width'));
    }
    set height(height){
        this.inset.css('height', height);
    }
    set width(width){
        this.inset.css('width', width);
    }



    changePosition(){
        let x = inset.position().left;
        let  y = inset.position().top;
        this.insetBox.children().css('backgroud-position', x+"px "+y+"px");
    }



}