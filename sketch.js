var rectangle = {
    x: 100,
    y: 250,
    diameter: 100,
};

var elips = {
    x: 150,
    y: 200,
    diameter: 100,
};

var tMove;

function createTriang(x, y, diameter=100) {
    return {
        x1: x,
        y1: y,
        x2: x + diameter / 2,
        y2: y - diameter,
        x3: x + diameter,
        y3: y,
    }
};

var movingElement = null;

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



// eso es la posicion del triangulo con relleno que se mueve (x, y, diametro)
var positionTMove = createTriang(350, 125, 100);




function setup() {
    createCanvas(600, 400);
}

function hoverElement() {
    cursor('grab');
}

function mousePressed() {
    if (trianCollision(mouseX, mouseY, positionTMove.x1, positionTMove.y1, positionTMove.x2, positionTMove.y2, positionTMove.x3, positionTMove.y3)) {
    movingElement = 'triang';
    }
}

function mouseDragged() {
    if (movingElement == 'triang') {
        positionTMove = createTriang(mouseX, mouseY)
    }
}

// function mouseReleased(){
//     movingElement = null;
// }

function mouseMoved() {

    if (trianCollision(mouseX, mouseY, positionTMove.x1, positionTMove.y1, positionTMove.x2, positionTMove.y2, positionTMove.x3, positionTMove.y3)) {
        hoverElement();
    } else {
        cursor();
    }
}




function draw() {
    background(170, 150, 0);

    //cuadrado
    noFill();
    strokeWeight(10);
    stroke(0, 0, 100);
    //el 75 es la suma del radio del circulo (la mitad) + el espacio disponible de 400 entre 4 (400-300)/4)
    rect(rectangle.x, elips.y + 75, rectangle.diameter, rectangle.diameter);


    //elipse
    noFill();
    stroke(0, 0, 100);
    ellipse(elips.x, elips.y, elips.diameter, elips.diameter);

    //triangulo
    noFill();
    stroke(0, 0, 100);
    const triang = createTriang(100, elips.y - 75, 100)
    triangle(triang.x1, triang.y1, triang.x2, triang.y2, triang.x3, triang.y3);

    //-----------------

    //cuadrado2
    fill(120, 30, 10);
    noStroke();
    //el 75 es la suma del radio del circulo (la mitad) + el espacio disponible de 400 entre 4 (400-300)/4)
    rect(rectangle.x + 250, elips.y + 75, rectangle.diameter, rectangle.diameter);


    //elipse2
    fill(200, 0, 0);
    noStroke();
    ellipse(elips.x + 250, elips.y, elips.diameter, elips.diameter);

    //triangulo2
    fill(255, 0, 0);
    noStroke();
    //TMove es cuando creo el triangulo, es decir, cuando le digo la posicion x, y(abajo izq), x, y(arriba), x, y(abajo derecha)
    tMove = triangle(positionTMove.x1, positionTMove.y1, positionTMove.x2, positionTMove.y2, positionTMove.x3, positionTMove.y3);
    //tMove.mouseOver(hoverElement);

};