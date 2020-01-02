    var rectangle = {
        x: 100,
        y: 250,
        diameter: 100,
    };

    var positionElips = {
        x: 150,
        y: 200,
        diameter: 100,
    };

    // se crea esta variable para almacenar la instancia del objeto triangulo que se mueve. esto dice: ("hola yo soy el triangulo que se mueve")
    var tMove;

    function calculatePositionTriang(x, y, diameter= 100) {
        return {
            x1: x,
            y1: y,
            x2: x + diameter / 2,
            y2: y - diameter,
            x3: x + diameter,
            y3: y,
        }
    };
    
    // inicial status of element when they dont move
    var movingElement = null;
    // esto identifica cuando se esta dentro del area del triangulo
    function trianCollision(px, py, x1, y1, x2, y2, x3, y3) {

        // get the area of the triangle
        var areaOrig = floor(abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1)));
        //console.log("totalArea: " + areaOrig);

        // get the area of 3 triangles made between the point and the corners of the triangle
        var area1 = floor(abs((x1 - px) * (y2 - py) - (x2 - px) * (y1 - py)));
        var area2 = floor(abs((x2 - px) * (y3 - py) - (x3 - px) * (y2 - py)));
        var area3 = floor(abs((x3 - px) * (y1 - py) - (x1 - px) * (y3 - py)));
        //console.log("areaSum: " + (area1 + area2 + area3));

        // if the sum of the three areas equals the original, we're inside the triangle
        if (area1 + area2 + area3 <= areaOrig) {
            return true;
        }
        return false;
    }

     // esto identifica cuando se esta dentro del area del circulo
     function ellipseCollision(mouseX, mouseY, x, y, diameter) {
        // calcular si la posicion del mouse cae dentro del area del circulo que le llega como parametro (x, y, diameter)
        if (ellipse) {
            return true;
        }
        return false;
    }


    // eso define la posicion del triangulo con relleno que se mueve (x, y, diametro)
    var positionTMove = calculatePositionTriang(350, 125, 100);


    //el setup se ejecuta una sola vez
    function setup() {
        createCanvas(600, 400);
    }

    function mousePressed() {
        if (trianCollision(mouseX, mouseY, positionTMove.x1, positionTMove.y1, positionTMove.x2, positionTMove.y2, positionTMove.x3, positionTMove.y3)) {
        movingElement = 'triang';
        }
    }

    function mouseDragged() {
        if (movingElement == 'triang') {
            positionTMove = calculatePositionTriang(mouseX, mouseY)
        }
    }

    // esto define que el mouse se tranforme en una mano cuando esta sobre mis elementos (triangulo, rectangulo o cuadrado)
    function hoverElement() {
        cursor('grab');
    }

    function mouseMoved() {
        // posicion del triangulo (ahora para cambiar el cursor)
        if (trianCollision(mouseX, mouseY, positionTMove.x1, positionTMove.y1, positionTMove.x2, positionTMove.y2, positionTMove.x3, positionTMove.y3)) {
            hoverElement();
        } else {
            cursor();
        }
        // posicion del circulo (ahora para cambiar el cursor)
        if (elipseCollision(mouseX, mouseY, positionElips.x, positionElips.y, positionElips.diameter)) {
            hoverElement();
        } else {
            cursor();
        }
    }

//----------------------------------------------


    function draw() {
        background(170, 150, 0);

        //cuadrado
        noFill();
        strokeWeight(10);
        stroke(0, 0, 100);
        //el 75 es la suma del radio del circulo (la mitad) + el espacio disponible de 400 entre 4 (400-300)/4)
        rect(rectangle.x, positionElips.y + 75, rectangle.diameter, rectangle.diameter);


        //positionElipse
        noFill();
        stroke(0, 0, 100);
        ellipse(positionElips.x, positionElips.y, positionElips.diameter, positionElips.diameter);

        //triangulo
        noFill();
        stroke(0, 0, 100);
        const triang = calculatePositionTriang(100, positionElips.y - 75, 100)
        triangle(triang.x1, triang.y1, triang.x2, triang.y2, triang.x3, triang.y3);

        //----------------- aca empiezan las formas que se mueven

        // cuadrado 
        fill(120, 30, 10);
        noStroke();
        // el 75 es la suma del radio del circulo (la mitad) + el espacio disponible de 400 entre 4 (400-300)/4)
        rect(rectangle.x + 250, positionElips.y + 75, rectangle.diameter, rectangle.diameter);


        // positionElipse 
        fill(200, 0, 0);
        noStroke();
        ellipse(positionElips.x + 250, positionElips.y, positionElips.diameter, positionElips.diameter);

        // triangulo
        fill(255, 0, 0);
        noStroke();
        // TMove es cuando creo el triangulo, es decir, cuando le digo la posicion x, y(abajo izq), x, y(arriba), x, y(abajo derecha).
        // este es el triangulo que se crea y que se puede mover
        tMove = triangle(positionTMove.x1, positionTMove.y1, positionTMove.x2, positionTMove.y2, positionTMove.x3, positionTMove.y3);

    };