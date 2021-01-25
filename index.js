let man = "X";
let fieldSquare = "F";
let hole = "O";
let hat = "H";
let score = 0;


class Field {
    constructor(field) {
        this.field = field;
    }

    static createField(width, height, difficulty) {
        let field = [];
        for (let y = 0; y < height; y++) {
            let row = [];
            for (let x = 0; x < width; x++) {
                let holeProbability = 20 + Number(difficulty);
                if (Math.random()*100 < holeProbability) row.push(hole);
                else row.push(fieldSquare);        
            }
            field.push(row);    
        }

        field[0][0] = man;

        let hatX = Math.floor(Math.random()*width);
        let hatY = height - 2;

        field[hatY][hatX] = hat;


        return field;
    }

    static fieldFromInput() {
        let height = document.getElementById("height").value;
        let width = document.getElementById("width").value;
        let difficulty = document.getElementById("difficulty").value;
        let newField = Field.createField(width, height, difficulty);
        return newField;
    }


    print() {
        let printField = ""
        for (let row = 0; row < this.field.length; row++) {
            let printRow = this.field[row].join('');
            printField += printRow + '\n';
        }
        console.log(printField);
    }

    generateBrowserField() {
        let fieldDiv = document.getElementById("fieldDiv");
        let width = this.field[0].length;
        let height = this.field.length;
        let fieldVisual = document.createElement('div');
        fieldVisual.style.width = width*50 + "px";
        fieldVisual.style.height = height*50 + "px";
        //fieldVisual.style.backgroundImage = "url('https://media.giphy.com/media/cjojgtiigyloyCg3r9/source.gif')";
        fieldVisual.style.marginLeft = "auto";
        fieldVisual.style.marginRight = "auto";
        fieldVisual.style.borderRadius = "10px";
        fieldVisual.style.position = "relative";
        fieldVisual.id = "fieldVisual";
        fieldDiv.append(fieldVisual);

        document.getElementById("earth").style.display = "block";

        for (let y = 0; y <this.field.length; y++) {
            for (let x = 0; x < this.field[0].length; x++) {
                if (this.field[y][x] == hole) {
                    let asteroidImage = document.createElement('img');
                    asteroidImage.src = "resources/images/asteroid.gif";
                    asteroidImage.style.height = "50px";
                    asteroidImage.style.width = "50px";
                    let holeDiv = document.createElement('div');
                    holeDiv.style.height = "50px";
                    holeDiv.style.width = "50px";
                    holeDiv.appendChild(asteroidImage);
                    holeDiv.style.position = "absolute";
                    holeDiv.style.top = y*50 + "px";
                    holeDiv.style.left = x*50 + "px";
                    holeDiv.style.zIndex = 1;
                    holeDiv.classList.add("hole");
                    fieldVisual.append(holeDiv);
                }

                if (this.field[y][x] == hat) {
                    let issImage = document.createElement('img');
                    issImage.src = "resources/images/astronaut.gif";
                    issImage.style.maxHeight = "50px";
                    issImage.style.maxWidth = "50px";
                    issImage.style.transform = "scaleY(-1)";
                    let holeDiv = document.createElement('div');
                    holeDiv.style.height = "50px";
                    holeDiv.style.width = "50px";
                    holeDiv.appendChild(issImage);
                    holeDiv.style.position = "absolute";
                    holeDiv.style.top = y*50 + "px";
                    holeDiv.style.left = x*50 + "px";
                    holeDiv.style.zIndex = 1;
                    holeDiv.id = "hat";
                    fieldVisual.append(holeDiv);
                }

                if (this.field[y][x] == man) {
                    let ufoImage = document.createElement('img');
                    ufoImage.src = "resources/images/ufo.gif";
                    ufoImage.id = "ufo";
                    ufoImage.style.height = "50px";
                    ufoImage.style.width = "50px";
                    let holeDiv = document.createElement('div');
                    holeDiv.style.height = "70px";
                    holeDiv.style.width = "70px";
                    holeDiv.appendChild(ufoImage);
                    holeDiv.style.position = "absolute";
                    holeDiv.style.top = y*50 + "px";
                    holeDiv.style.left = x*50 + "px";
                    holeDiv.style.zIndex = 2;
                    holeDiv.id = "man";
                    fieldVisual.append(holeDiv);
                }
            }
        }


    }

    static reset() {
        let fieldDiv = document.getElementById("fieldDiv");
        if (fieldDiv.hasChildNodes()) {
            fieldDiv.removeChild(fieldDiv.firstChild);
        }
        document.getElementById("reset").style.display = "none";
        document.getElementById("announcementDiv").style.display = "none";
        document.getElementById("controlDiv").style.display = "none";
        document.getElementById("setupDiv").style.display= "block";
        document.getElementById("earth").src = "resources/images/earth.gif";
        document.getElementById("earth").style.display = "none";
        score = 0;
    }

    static endGame() {
        document.getElementById("buttonDiv").style.display = "none";
        document.getElementById("reset").style.display = "block";
    }

 
    static up() {
        let manPos = document.getElementById("man").style.top;
        let newPos = Number(manPos.substring(0, manPos.length - 2));
        newPos -= 50;
        console.log(newPos);
        newPos = newPos.toString() +"px";
        console.log(newPos);
        document.getElementById("man").style.top = newPos;
        Field.checkPos();
    }

    static left() {
        let manPos = document.getElementById("man").style.left;
        let newPos = Number(manPos.substring(0, manPos.length - 2));
        newPos -= 50;
        console.log(newPos);
        newPos = newPos.toString() +"px";
        console.log(newPos);
        document.getElementById("man").style.left = newPos;
        Field.checkPos();
    }

    static hold() {
        Field.checkPos();
    }

    static right() {
        let manPos = document.getElementById("man").style.left;
        let newPos = Number(manPos.substring(0, manPos.length - 2));
        newPos += 50;
        console.log(newPos);
        newPos = newPos.toString() +"px";
        console.log(newPos);
        document.getElementById("man").style.left = newPos;
        Field.checkPos();
    }

    static down() {
        let manPos = document.getElementById("man").style.top;
        let newPos = Number(manPos.substring(0, manPos.length - 2));
        newPos += 50;
        console.log(newPos);
        newPos = newPos.toString() +"px";
        console.log(newPos);
        document.getElementById("man").style.top = newPos;
        Field.checkPos();
    }

    static determineHoleCoords() {
        let holes = document.getElementsByClassName("hole");
        let holeArrayXY = [];
        for (let hole = 0; hole < holes.length; hole++) {
            let holeCoords = [];
            let holePosX = holes[hole].style.left;
            let holePosY = holes[hole].style.top;
            holePosX = Number(holePosX.substring(0, holePosX.length - 2));
            holePosY = Number(holePosY.substring(0, holePosY.length - 2));
            holeCoords.push(holePosX, holePosY);
            holeArrayXY.push(holeCoords);
        }
        return holeArrayXY;
    }

    static updateHoleCoords() {
        let fieldVisual = document.getElementById("fieldVisual"); 
        let fieldVisChildren = fieldVisual.children;
        for (let i = 0; i < fieldVisChildren.length; i++) {
            let child = fieldVisChildren[i];
            console.log("chilren: ", child.classList);
            if (child.classList[0] == "hole") {
                let holePosX = child.style.left;
                holePosX = Number(holePosX.substring(0, holePosX.length-2));
                holePosX -= 50;
                if (holePosX < 0) {
                    console.log("holePosY too low: ", holePosX);
                    let fieldVisWidth = fieldVisual.style.width;
                    fieldVisWidth = Number(fieldVisWidth.substring(0, fieldVisWidth.length-2));
                    fieldVisWidth -= 50;
                    holePosX = fieldVisWidth;
                    console.log("new holePosX: ", holePosX);
                }
                let newHolePosX = `${holePosX}px`;
                child.style.left = newHolePosX;
            }
        }
        
    }

    static checkPos() {
        Field.updateHoleCoords();
        let manPosY = document.getElementById("man").style.top;
        let manPosX = document.getElementById("man").style.left;
        let hatPosY = document.getElementById("hat").style.top;
        let hatPosX = document.getElementById("hat").style.left;
        let fieldHeight = document.getElementById("fieldVisual").style.height;
        let fieldWidth = document.getElementById("fieldVisual").style.width;
            
        manPosY = Number(manPosY.substring(0, manPosY.length - 2));
        manPosX = Number(manPosX.substring(0, manPosX.length - 2));
        hatPosY = Number(hatPosY.substring(0, hatPosY.length - 2));
        hatPosX = Number(hatPosX.substring(0, hatPosX.length - 2));
        fieldHeight = Number(fieldHeight.substring(0, fieldHeight.length - 2));
        fieldWidth = Number(fieldWidth.substring(0, fieldWidth.length - 2));
        let holeArrayXY = Field.determineHoleCoords();

        console.log("hole coords", holeArrayXY[0]);
        if (manPosY == hatPosY && manPosX == hatPosX) {
            document.getElementById("announcementDiv").innerText = "Congratulations! You feast on delicious earthling!";
            document.getElementById("earth").src = "resources/images/explosion1.gif";
            Field.endGame();
        }
        if (manPosY < 0 || manPosX < 0 || manPosY >= fieldHeight || manPosX >= fieldWidth) {
            document.getElementById("announcementDiv").innerText = "You've been swept into the cosmic undertow and torn to pieces!";
            document.getElementById("ufo").src = "resources/images/explosion1.gif";
            Field.endGame();
        }
        for (let XYpair = 0; XYpair < holeArrayXY.length; XYpair++) {
            let holePosX = holeArrayXY[XYpair][0];
            let holePosY = holeArrayXY[XYpair][1];
            if (manPosX == holePosX && manPosY == holePosY) {
                document.getElementById("announcementDiv").innerText = "You smashed into an asteroid and broke all your bones!";    
                document.getElementById("ufo").src = "resources/images/explosion1.gif";
                Field.endGame();
            }
        }
    }


    static startGame() {
        let gameField = new Field(Field.fieldFromInput());
        gameField.print();
        gameField.generateBrowserField();        
        document.getElementById("controlDiv").style.display = "block";
        document.getElementById("buttonDiv").style.display = "block";
        document.getElementById("setupDiv").style.display = "none";
        document.getElementById("announcementDiv").style.display = "block";
        document.getElementById("announcementDiv").textContent = "Find and devour the foolish earthling!";
    }
    
}

//let newField = new Field(Field.createField(20, 10, 10));
//newField.print();
//newField.generateBrowserField();

document.getElementById("start").addEventListener("click", Field.startGame);
document.getElementById("up").addEventListener("click", Field.up);
document.getElementById("down").addEventListener("click", Field.down);
document.getElementById("hold").addEventListener("click", Field.hold);
document.getElementById("left").addEventListener("click", Field.left);
document.getElementById("right").addEventListener("click", Field.right);
document.getElementById("reset").addEventListener("click", Field.reset);
//window.addEventListener("keydown", Field.moveMan);