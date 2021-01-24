let man = "X";
let fieldSquare = "F";
let hole = "O";
let hat = "H";


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

        let hatX = width - 2;
        let hatY = Math.floor(Math.random()*height);

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
        fieldVisual.style.backgroundColor = "green";
        fieldVisual.style.position = "relative";
        fieldVisual.id = "fieldVisual";
        fieldDiv.append(fieldVisual);

        for (let y = 0; y <this.field.length; y++) {
            for (let x = 0; x < this.field[0].length; x++) {
                if (this.field[y][x] == hole) {
                    let holeDiv = document.createElement('div');
                    holeDiv.style.height = "50px";
                    holeDiv.style.width = "50px";
                    holeDiv.style.backgroundColor = "black";
                    holeDiv.style.position = "absolute";
                    holeDiv.style.top = y*50 + "px";
                    holeDiv.style.left = x*50 + "px";
                    holeDiv.style.zIndex = 1;
                    holeDiv.classList.add("hole");
                    fieldVisual.append(holeDiv);
                }

                if (this.field[y][x] == hat) {
                    let holeDiv = document.createElement('div');
                    holeDiv.style.height = "50px";
                    holeDiv.style.width = "50px";
                    holeDiv.style.backgroundColor = "blue";
                    holeDiv.style.position = "absolute";
                    holeDiv.style.top = y*50 + "px";
                    holeDiv.style.left = x*50 + "px";
                    holeDiv.style.zIndex = 1;
                    holeDiv.id = "hat";
                    fieldVisual.append(holeDiv);
                }

                if (this.field[y][x] == man) {
                    let holeDiv = document.createElement('div');
                    holeDiv.style.height = "50px";
                    holeDiv.style.width = "50px";
                    holeDiv.style.backgroundColor = "red";
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

    static checkPos() {
        let manPosY = document.getElementById("man").style.top;
        let manPosX = document.getElementById("man").style.left;
        let hatPosY = document.getElementById("hat").style.top;
        let hatPosX = document.getElementById("hat").style.left;
        let fieldHeight = document.getElementById("fieldVisual").style.height;
        let fieldWidth = document.getElementById("fieldVisual").style.width;
        let holes = document.getElementsByClassName("hole");
        
        manPosY = Number(manPosY.substring(0, manPosY.length - 2));
        manPosX = Number(manPosX.substring(0, manPosX.length - 2));
        hatPosY = Number(hatPosY.substring(0, hatPosY.length - 2));
        hatPosX = Number(hatPosX.substring(0, hatPosX.length - 2));
        fieldHeight = Number(fieldHeight.substring(0, fieldHeight.length - 2));
        fieldWidth = Number(fieldWidth.substring(0, fieldWidth.length - 2));
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
        console.log("hole coords", holeArrayXY[0]);
        if (manPosY == hatPosY && manPosX == hatPosX) {
            document.getElementById("announcementDiv").innerText = "Congratulations! You found your hat!";
            Field.endGame();
        }
        if (manPosY < 0 || manPosX < 0 || manPosY >= fieldHeight || manPosX >= fieldWidth) {
            document.getElementById("announcementDiv").innerText = "You've fallen off of the plane of existence and evaporated into the ether!";
            Field.endGame();
        }
        for (let XYpair = 0; XYpair < holeArrayXY.length; XYpair++) {
            let holePosX = holeArrayXY[XYpair][0];
            let holePosY = holeArrayXY[XYpair][1];
            if (manPosX == holePosX && manPosY == holePosY) {
                document.getElementById("announcementDiv").innerText = "You fell down a deep, deep hole and broke all your bones!";
                Field.endGame();
            }
        }
    }

    /*  
    static moveMan(event) {
        let x = event.keycode;
        if (x == 40) {
            let manPos = document.getElementById("man").style.top;
            let newPos = Number(manPos.substring(0, manPos.length - 2));
            newPos += 50;
            console.log(newPos);
            newPos = newPos.toString() +"px";
            console.log(newPos);
            document.getElementById("man").style.top = newPos;
        }
    }
    */

    static startGame() {
        let gameField = new Field(Field.fieldFromInput());
        gameField.print();
        gameField.generateBrowserField();
        document.getElementById("controlDiv").style.display = "block";
        document.getElementById("buttonDiv").style.display = "block";
        document.getElementById("setupDiv").style.display = "none";
        document.getElementById("announcementDiv").style.display = "block";
        document.getElementById("announcementDiv").textContent = "You dropped your hat. You need to find your hat!";
    }
    
}

//let newField = new Field(Field.createField(20, 10, 10));
//newField.print();
//newField.generateBrowserField();

document.getElementById("start").addEventListener("click", Field.startGame);
document.getElementById("up").addEventListener("click", Field.up);
document.getElementById("right").addEventListener("click", Field.right);
document.getElementById("left").addEventListener("click", Field.left);
document.getElementById("down").addEventListener("click", Field.down);
document.getElementById("reset").addEventListener("click", Field.reset);
//window.addEventListener("keydown", Field.moveMan);