let man = "X";
let fieldSquare = "F";
let hole = "O";
let hat = "H";
let score = 0;
let lives = 1;



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
        
        fieldVisual.addEventListener('click', Field.manageMovement);
        fieldDiv.append(fieldVisual);

        document.getElementById("earth").style.display = "block";

        for (let y = 0; y <this.field.length; y++) {
            for (let x = 0; x < this.field[0].length; x++) {
                if (this.field[y][x] == hole) {
                    let asteroidImage = document.createElement('img');
                    asteroidImage.src = "resources/images/asteroid.gif";
                    asteroidImage.style.height = "50px";
                    asteroidImage.style.width = "50px";
                    asteroidImage.classList.add("hole");
                    asteroidImage.style.position = "absolute";
                    asteroidImage.style.top = y*50 + "px";
                    asteroidImage.style.left = x*50 + "px";
                    asteroidImage.style.zIndex = 1;
                    asteroidImage.classList.add("hole");
                    fieldVisual.append(asteroidImage);
                }

                if (this.field[y][x] == hat) {
                    let issImage = document.createElement('img');
                    issImage.src = "resources/images/astronaut.gif";
                    issImage.style.maxHeight = "50px";
                    issImage.style.maxWidth = "50px";
                    issImage.style.transform = "scaleY(-1)";
                    issImage.style.position = "absolute";
                    issImage.style.top = y*50 + "px";
                    issImage.style.left = x*50 + "px";
                    issImage.style.zIndex = 1;
                    issImage.id = "hat";
                    fieldVisual.append(issImage);
                }

                if (this.field[y][x] == man) {
                    let ufoImage = document.createElement('img');
                    ufoImage.src = "resources/images/ufo.gif";
                    ufoImage.id = "ufo";
                    ufoImage.style.height = "50px";
                    ufoImage.style.width = "50px";
                    ufoImage.style.position = "absolute";
                    ufoImage.style.top = y*50 + "px";
                    ufoImage.style.left = x*50 + "px";
                    ufoImage.style.zIndex = 2;
                    ufoImage.id = "man";
                    fieldVisual.append(ufoImage);
                }
            }
        }


    }

    static hideAnnouncementDiv() {
        let annDiv = document.getElementById("announcementDiv");
        annDiv.style.display = "none";
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
        lives = 1;
        score = 0;
    }

    static endGame() {
        document.getElementById("fieldVisual").removeEventListener("click", Field.manageMovement);
        this.displayScore();
        let resetButton = document.createElement('input');
        resetButton.type = "button";
        resetButton.value = "Play Again";
        resetButton.addEventListener('click', Field.reset);
        document.getElementById("announcementDiv").style.display = "inline-block";
        document.getElementById("announcementDiv").append(resetButton);
        document.getElementById("buttonDiv").style.display = "none";
        document.getElementById("reset").style.display = "block";
    }

    
    static manageMovement(ev) {
        console.log(ev.target.tagName, 'clicked');
        let xValue = ev.offsetX;
        let yValue = ev.offsetY;
        if (ev.target.tagName == "IMG") {
            console.log(ev.target);
            let meteor = ev.target;
            let posXStr = meteor.style.left;
            let posYStr = meteor.style.top;
            let posX = Number(posXStr.substring(0, posXStr.length-2));
            let posY = Number(posYStr.substring(0, posYStr.length-2));
            xValue += posX;
            yValue += posY;
            console.log('posX', posX);
            console.log('posY', posY);
        }
        console.log('offsetX', xValue);
        console.log('offsetY', yValue);

        let manPosY = document.getElementById("man").style.top;
        let manPosX = document.getElementById("man").style.left;
        manPosY = Number(manPosY.substring(0, manPosY.length - 2));
        manPosX = Number(manPosX.substring(0, manPosX.length - 2));

        if (yValue < manPosY && xValue > manPosX && xValue < manPosX + 50) {
            Field.up();
            console.log("click above");
        }
        
        else if (yValue > manPosY + 50 && xValue > manPosX && xValue < manPosX + 50) {
            console.log("click below");
            Field.down();
        }
         
        else if (xValue > manPosX + 50 && yValue > manPosY && yValue < manPosY + 50)  {
            console.log("click right");
            Field.right();       
        }

        else if (xValue < manPosX && yValue > manPosY && yValue < manPosY + 50) {
            console.log("click left");
            Field.left();
        }

        else if (xValue > manPosX && xValue < manPosX +50 && yValue > manPosY && yValue < manPosY + 50) {
            console.log("click on");
            Field.hold();
        }
    }


    
 
    static up() {
        let manPos = document.getElementById("man").style.top;
        let newPos = Number(manPos.substring(0, manPos.length - 2));
        newPos -= 50;
        newPos = newPos.toString() +"px";
        document.getElementById("man").style.top = newPos;
        score -= 50;
        Field.checkPos();
    }

    static left() {
        let manPos = document.getElementById("man").style.left;
        let newPos = Number(manPos.substring(0, manPos.length - 2));
        newPos -= 50;
        newPos = newPos.toString() +"px";
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
        newPos = newPos.toString() +"px";
        document.getElementById("man").style.left = newPos;
        score +=50
        Field.checkPos();
    }

    static down() {
        let manPos = document.getElementById("man").style.top;
        let newPos = Number(manPos.substring(0, manPos.length - 2));
        newPos += 50;
        newPos = newPos.toString() +"px";
        document.getElementById("man").style.top = newPos;
        score +=50;
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
            if (child.classList[0] == "hole") {
                let holePosX = child.style.left;
                holePosX = Number(holePosX.substring(0, holePosX.length-2));
                holePosX -= 50;
                if (holePosX < 0) {
                    let fieldVisWidth = fieldVisual.style.width;
                    fieldVisWidth = Number(fieldVisWidth.substring(0, fieldVisWidth.length-2));
                    fieldVisWidth -= 50;
                    holePosX = fieldVisWidth;
                }
                let newHolePosX = `${holePosX}px`;
                child.style.left = newHolePosX;
            }
        }
        
    }

    static displayScore() {
        if (score <= 0) score = 0;
        let scoreDis = document.createElement('p');
        scoreDis.textContent = `Score: ${score} points`;
        announcementDiv.appendChild(scoreDis);
    }

    static checkPos() {
        score -= 25;
        Field.updateHoleCoords();
        let manPosY = document.getElementById("man").style.top;
        let manPosX = document.getElementById("man").style.left;
        manPosY = Number(manPosY.substring(0, manPosY.length - 2));
        manPosX = Number(manPosX.substring(0, manPosX.length - 2));

        let hatPosY = document.getElementById("hat").style.top;
        let hatPosX = document.getElementById("hat").style.left;
        hatPosY = Number(hatPosY.substring(0, hatPosY.length - 2));
        hatPosX = Number(hatPosX.substring(0, hatPosX.length - 2));

        let fieldHeight = document.getElementById("fieldVisual").style.height;
        let fieldWidth = document.getElementById("fieldVisual").style.width;
            
        
        
        fieldHeight = Number(fieldHeight.substring(0, fieldHeight.length - 2));
        fieldWidth = Number(fieldWidth.substring(0, fieldWidth.length - 2));
        let holeArrayXY = Field.determineHoleCoords();

        if (manPosY == hatPosY && manPosX == hatPosX) {
            score += 150;
            document.getElementById("announcementDiv").innerText = "Congratulations! You feast on delicious earthling!";
            document.getElementById("earth").src = "resources/images/explosion1.gif";
            document.getElementById("hat").src = "resources/images/skeleton.gif";
            document.getElementById("hat").style.transform = "scaleY(1)";
            Field.endGame();
        }
        if (manPosY < 0 || manPosX < 0 || manPosY >= fieldHeight || manPosX >= fieldWidth) {
            score -= 150;
            document.getElementById("announcementDiv").innerText = "You've been swept into the cosmic undertow and torn to pieces!";
            document.getElementById("ufo").src = "resources/images/explosion1.gif";
            Field.endGame();
        }
        for (let XYpair = 0; XYpair < holeArrayXY.length; XYpair++) {
            let holePosX = holeArrayXY[XYpair][0];
            let holePosY = holeArrayXY[XYpair][1];
            if (manPosX == holePosX && manPosY == holePosY) {
                lives--;
                document.getElementById("statusBar").textContent = `Lives: ${lives}`;
            }
            if (lives < 0) {
                lives = 0;
                document.getElementById("statusBar").textContent = `Lives: ${lives}`;
                document.getElementById("statusBar").style.color = "red";
                score -= 150;
                document.getElementById("announcementDiv").innerText = "You smashed into an asteroid and broke all your bones!";    
                document.getElementById("man").src = "resources/images/explosion1.gif";
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
        document.getElementById("announcementDiv").style.display = "inline-block";
        document.getElementById("announcementDiv").textContent = "Find and devour the foolish earthling!";
        document.getElementById("statusBar").textContent = `Lives: ${lives}`;
        let okButton = document.createElement("input");
        okButton.type = "button";
        okButton.value = "OK!";
        okButton.addEventListener('click', Field.hideAnnouncementDiv);
        document.getElementById("announcementDiv").append(okButton);
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