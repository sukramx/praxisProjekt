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
            .css('border', '1px solid')
            .css('border-color', 'blue')
            .css('width', '100px')
            .css('height', '100px')
            .css('position', 'absolute');
        return inset;
    }

    //Erstellt ein neues Element welches unterhalb der Vergleichsbox angesiedelt wird.
    createInsetBox(){
        let src = getElementsByClassName(document, 'picture');
        let anzahl = $(src).length;
        let hoehe = 100 + parseInt(this.inset.css('height'));
        this.div = $('<div></div>').appendTo('#testBox');

        console.log(hoehe);
        this.div.css('position', 'relative')
            .css('border', '1px solid')
            .css('min-height', hoehe+'px')
            .css('margin', '5px 5px 5px 5px');
        this.div.resizable();



        //Erzeuge Div für die Elemente um die Farben zu ändern
        let colorDiv =  $('<div></div>').appendTo(this.div);
        colorDiv.css('position', 'relative')
            .css('float', 'left');

        //Erzeuge Input für die Farbgebung der Ränder
        this.input =  $('<input type="color" value="'+ this.getRandomColor() +'">').appendTo(colorDiv);
        this.inset.css('border-color', this.input.val());
        this.div.css('border-color', this.inset.css('border-left-color'))
            .css('position', 'relative');

        //Erzeuge Button für die Änderung der Ränder
        this.button = $('<button>Change Color</button>').appendTo(colorDiv);
        this.button.click( ()  => {
            this.changeColor();
        })
            .css('position', 'relative')
            .css('display', 'block');



        //Erzeuge Div für Breit und Höhe
        let sizeDiv = $('<div></div>').appendTo(this.div);
        sizeDiv.css('position', 'relative')
            .css('float', 'left');

        //Erzeuge Input für die Breite
        this.inputW = $('<input type="number" value="'+ parseInt(this.inset.css('width')) +'">').appendTo(sizeDiv);
        this.inputW.css('position', 'relative')
            .css('display', 'block');

        //Erzeuge Input für die Höhe
        this.inputH = $('<input type="number" value="'+ parseInt(this.inset.css('height')) +'">').appendTo(sizeDiv);
        this.inputH.css('position', 'relative')
            .css('display', 'block')
            .attr('onchange',this.changeInputSize(undefined, this.inputH.val()));





        //Erzeuge div für Aspect Ratio
        let checkDiv = $('<div></div>').appendTo(this.div);
        sizeDiv.css('position', 'relative')
            .css('float', 'left');

        //Erzeuge Checkbox für Aspect Ratio
        this.checkBox=$('<input type="checkbox">').appendTo(checkDiv);
        this.checkBox.css('position', 'relative')
            .css('display', 'block');

        //Erzeuge Input für Aspect Ratio
        let inputA = $('<div></div>').appendTo(checkDiv);
        inputA.css('position', 'relative')
            .css('display', 'block');
        this.inputA = $('<input type="text" value="1:1" >').appendTo(inputA);
        $('<label for="'+this.inputA+'">ascpect ratio</label>').appendTo(inputA);



        //Erzeuge Div wo die Inset Vorschaubilder hineinkommen
        this.imgDiv = $('<div></div>').appendTo(this.div);
        this.imgDiv.css('min-height', '100px')
            .css('position', 'relative')
            .css('display', 'inline-block')
            .css('float', 'left')
            .css('margin', '10px 10px 10px 10px');

        //Erzeuge Inset Vorschaubilder
        for(let i=0; i<anzahl; i++){
            let imgView = $('<div)></div>').appendTo(this.imgDiv);
            imgView.css('height', this.inset.css('height'))
                .css('width', this.inset.css('height'))
                //.css('float', 'left')
                .css('margin', '5px 5px 5px 5px')
                .css('background-image', 'url('+$(src[i]).children('img').attr('src')+')')
                .css('display', 'inline-block');
        }
        return this.div;
    }

    //Wird aufgerufen, wenn das Inset bewegt wird. Aendert die background-position von jedem Bild in der insetBox
    changePosition(){
        let x = - this.inset.position().left;
        let  y = - this.inset.position().top;
        this.imgDiv.children().css('background-position', x+'px '+y+'px');
    }

    //Wird aufgerufen, wenn das Inset in der Größe verändert wird. Ändert die Höhe und Breite von jedem Bild in der insetBox
    changeSize(){
        let h = this.inset.css('height');
        let w = this.inset.css('width');

        this.imgDiv.children().css('width', w)
            .css('height',h);

        this.inputH.val(parseInt(h));
        this.inputW.val(parseInt(w));
        this.imgDiv.css('min-height', (parseInt(h))+'px');
    }

    changeInputSize(w, h) {
        if (w != undefined)
            this.inset.css('width', w);
        if (h != undefined)
            this.inset.css('height', h);
        try {
            this.changeSize();
        }catch{}

    }


        get position(){
        return this.inset.position();
    }

    changeColor(){
        let value = this.input.val();
        console.log(value)
        this.inset.css('border-color', value);
        this.insetBox.css('border-color', value);
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }








}