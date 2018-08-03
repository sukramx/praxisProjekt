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
        let div = $('<div></div>').appendTo('#testBox');

        console.log(hoehe);
        div.css('position', 'relative')
            .css('border', '1px solid')
            .css('min-height', hoehe+'px')
            .css('margin', '5px 5px 5px 5px');



        //Erzeuge Div für Optionen

        let optionDiv = $('<div></div>').appendTo(div);
        optionDiv.css("position", 'relative')
            .css('min-height', '0px')
            .css('display', 'inline-block');

        //Erzeuge Div für die Elemente um die Farben zu ändern
        let colorDiv =  $('<div></div>').appendTo(optionDiv);
        colorDiv.css('position', 'relative')
            .css('display', 'inline-block')
            .css('margin', '0px 5px 0px 5px');

        //Erzeuge Input für die Farbgebung der Ränder
        this.input =  $(`<input type="color" value="${this.getRandomColor()}"'>`).appendTo(colorDiv);
        this.inset.css('border-color', this.input.val());
        div.css('border-color', this.inset.css('border-left-color'))
            .css('position', 'relative');
        this.input
            .css('position', 'relative')
            .css('display', 'block')
            .change(() => {
                this.changeColor();
            });




        //Erzeuge Div für Breit und Höhe
        let sizeDiv = $('<div></div>').appendTo(optionDiv);
        sizeDiv.css('position', 'relative')
            .css('display', 'inline-block')
            .css('margin', '0px 5px 0px 5px');


        let inputWDiv = $('<div></div>'). appendTo(sizeDiv)
            .css('display', 'block')
            .css('position', 'relative');

        //Erzeuge Input für die Breite
        $('<label for="'+this.inputW+'">width :</label>').appendTo(inputWDiv);
        this.inputW = $('<input type="number" value="'+ parseInt(this.inset.css('width')) +'">').appendTo(inputWDiv);
        this.inputW.css('position', 'relative')
            .css('display', 'inline-block')
            .change(() => {
                this.changeInputSize(this.inputW.val(), undefined)
            });




        let inputHDiv = $('<div></div>'). appendTo(sizeDiv)
            .css('display', 'block')
            .css('position', 'relative');

        //Erzeuge Input für die Höhe
        $('<label for="'+this.inputH+'">height:</label>').appendTo(inputHDiv);
        this.inputH = $('<input type="number" value="'+ parseInt(this.inset.css('height')) +'">').appendTo(inputHDiv);
        this.inputH.css('position', 'relative')
            .css('display', 'inline-block')
            .change(() => {
                this.changeInputSize(undefined, this.inputH.val())
            });






        //Erzeuge div für Aspect Ratio
        let checkDiv = $('<div></div>').appendTo(optionDiv);
        checkDiv.css('position', 'relative')
            .css('display', 'inline-block')
            .css('margin', '0px 5px 0px 5px');

        //Erzeuge Checkbox für Aspect Ratio
        let checkBoxDiv = $('<div></div>').appendTo(checkDiv)
            .css('display', 'block')
            .css('position', 'relative');

        this.checkBox=$('<input type="checkbox" value="false">').appendTo(checkBoxDiv);
        this.checkBox.css('position', 'relative')
            .css('display', 'inline-block')
            .change(()=>{
                let val =this.inputA.val();//parseFloat(this.inputA.val());
                console.log(this.checkBox.prop('checked'));
                let options = this.inset.resizable('option');

                if (this.checkBox.prop('checked')){
                    this.inset.resizable( "option", "aspectRatio", val);
                    options.aspectRatio = true;
                    this.inset.resizable('destroy');
                    this.inset.resizable(options);
                    this.changeInputSize(this.inset.css('width'), undefined);
                }else{
                    this.inset.resizable( "option", "aspectRatio", false);
                    options.aspectRatio = false;
                    this.inset.resizable('destroy');
                    this.inset.resizable(options);
                }
            });
        $('<label for="'+this.checkBox+'"> activate ascpect ratio</label>').appendTo(checkBoxDiv);

        //Erzeuge Input für Aspect Ratio
        let aspectDiv = $('<div></div>').appendTo(checkDiv);
        aspectDiv.css('position', 'relative')
            .css('display', 'block');
        this.inputA = $('<input type="text" value="1" >').appendTo(aspectDiv)
            .change(()=>{
                this.changeInputSize(this.inset.css('height'), undefined);
            });
        $('<label for="'+this.inputA+'"> ascpect ratio value</label>').appendTo(aspectDiv);



        //Erzeuge Div wo die Inset Vorschaubilder hineinkommen
        let imgDiv = $('<div class="imgDiv"></div>').appendTo(div);

        imgDiv
            .css('position', 'relative')
            .css('min-height', '10px')
            .css('margin', '5px 5px 5px 5px');


        //Erzeuge Inset Vorschaubilder
        for(let i=0; i<anzahl; i++){
            let imgView = $('<div></div>').appendTo(imgDiv);
            imgView
                .css('position', 'relative')
                .css('display', 'inline-block')
                .css('height', this.inset.css('height'))
                .css('width', this.inset.css('height'))
                .css('margin', '5px 5px 5px 5px')
                .css('background-image', 'url('+$(src[i]).children('img').attr('src')+')');
        }



        this.imgDiv = imgDiv;
        return div;
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
        if (this.checkBox.prop('checked')){
            let val = parseFloat(this.inputA.val());
            this.inset.css('height', (parseInt(w)/val)+"px");
        }
        if (h != undefined)
            this.inset.css('height', h);
        if (this.checkBox.prop('checked')){
            let val = parseFloat(this.inputA.val());
            this.inset.css('width', (parseInt(h)*val)+"px");
        }
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
        try {
            this.insetBox.css('border-color', value);
        }catch{}

    }
    changeColor2(input){
        let value = input.val();
        console.log(value);
        this.inset.css('border-color', value);
        try {
            this.insetBox.css('border-color', value);
        }catch{}

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