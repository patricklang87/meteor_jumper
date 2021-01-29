let man = "X";
let fieldSquare = "F";
let hole = "O";
let altMeteor = "A"
let hat = "H";
let chicken = "C";
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
                let holeProbability = 21 + Number(difficulty);
                let chickenProbability = 1;
                let liklihood = Math.random()*100;
                if (liklihood < chickenProbability) row.push(chicken);
                else if (liklihood < holeProbability) {
                    let asteroidTypeProbability = Math.random()*100;
                    if (asteroidTypeProbability < 5) row.push(altMeteor);
                    else row.push(hole);
                }

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
                    fieldVisual.append(asteroidImage);
                }

                if (this.field[y][x] == altMeteor) {
                    let asteroidImage = document.createElement('img');
                    asteroidImage.src = "resources/images/asteroid2.gif";
                    asteroidImage.style.height = "50px";
                    asteroidImage.style.width = "50px";
                    asteroidImage.classList.add("altMeteor");
                    asteroidImage.classList.add("hole");
                    asteroidImage.style.position = "absolute";
                    asteroidImage.style.top = y*50 + "px";
                    asteroidImage.style.left = x*50 + "px";
                    asteroidImage.style.zIndex = 1;
                    fieldVisual.append(asteroidImage);
                }

                if (this.field[y][x] == chicken) {
                    let chickenImage = document.createElement('img');
                    chickenImage.src = "resources/images/bolt.gif";
                    chickenImage.style.height = "50px";
                    chickenImage.style.width = "50px";
                    chickenImage.style.position = "absolute";
                    chickenImage.style.top = y*50 + "px";
                    chickenImage.style.left = x*50 + "px";
                    chickenImage.style.zIndex = 1;
                    chickenImage.classList.add("chicken");
                    fieldVisual.append(chickenImage);
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
                    issImage.classList.add("hat");
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
        document.getElementById("announcementDiv").style.display = "none";
        document.getElementById("statusBar").style.display = "none";
        document.getElementById("statusBar").style.color = "hotpink";
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
            let audio = document.getElementById("okay");
            audio.play();
            Field.up();
            console.log("click above");
        }
        
        else if (yValue > manPosY + 50 && xValue > manPosX && xValue < manPosX + 50) {
            let audio = document.getElementById("okay");
            audio.play();
            console.log("click below");
            Field.down();
        }
         
        else if (xValue > manPosX + 50 && yValue > manPosY && yValue < manPosY + 50)  {
            let audio = document.getElementById("okay");
            audio.play();
            console.log("click right");
            Field.right();       
        }

        else if (xValue < manPosX && yValue > manPosY && yValue < manPosY + 50) {
            let audio = document.getElementById("okay");
            audio.play();
            console.log("click left");
            Field.left();
        }

        else if (xValue > manPosX && xValue < manPosX +50 && yValue > manPosY && yValue < manPosY + 50) {
            let audio = document.getElementById("okay");
            audio.play();
            console.log("click on");
            Field.hold();
        }
        else {
            let audio = document.getElementById("nuuh");
            audio.play();
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

    static determineElementCoords(element) {
        let holes = document.getElementsByClassName(element);
        let holeArrayXY = [];
        for (let hole = 0; hole < holes.length; hole++) {
            let holeCoords = [];
            let holePosX = holes[hole].style.left;
            let holePosY = holes[hole].style.top;
            holePosX = Number(holePosX.substring(0, holePosX.length - 2));
            holePosY = Number(holePosY.substring(0, holePosY.length - 2));
            holeCoords.push(holePosX, holePosY, holes[hole]);
            holeArrayXY.push(holeCoords);
        }
        return holeArrayXY;
    }

    static updateElementCoords(element, direction) {
        let fieldVisual = document.getElementById("fieldVisual"); 
        let fieldVisChildren = fieldVisual.children;
        for (let i = 0; i < fieldVisChildren.length; i++) {
            let child = fieldVisChildren[i];
            if (child.classList[0] == element) {
                let holePosX = child.style.left;
                let holePosY = child.style.top;
                holePosX = Number(holePosX.substring(0, holePosX.length-2));
                holePosY = Number(holePosY.substring(0, holePosY.length-2));
                if (direction == "left") {
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
                else if (direction == "up") {
                    holePosY -= 50;
                    if (holePosY < 0) {
                        let fieldVisHeight = fieldVisual.style.height;
                        fieldVisHeight = Number(fieldVisHeight.substring(0, fieldVisHeight.length-2));
                        fieldVisHeight -= 50;
                        holePosY = fieldVisHeight;
                    }
                    let newHolePosY = `${holePosY}px`;
                    child.style.top = newHolePosY;
                }    
            }
        }
        
    }

    static displayScore() {
        if (score <= 0) score = 0;
        let scoreDis = document.createElement('p');
        scoreDis.textContent = `Score: ${score} points`;
        announcementDiv.appendChild(scoreDis);
    }

    static moveAstronaut(prob) {
        let randomNum = Math.random()*100;
        if (randomNum < prob) {
            console.log("Moving astronaut");
            if (Math.random() < 0.5) Field.updateElementCoords("hat", "left");
            else Field.updateElementCoords("hat", "up");
        }
    }

    static showColorBackground(color) {
        document.getElementById("statusBar").textContent = `Lives: ${lives}`;
        let painOverlay = document.createElement("div");
        painOverlay.style.backgroundColor = color;
        painOverlay.style.opacity = ".2";
        painOverlay.style.width = "100%";
        painOverlay.style.height = "100%";
        painOverlay.style.zIndex = "5";
        document.getElementById("fieldVisual").append(painOverlay);
        setTimeout(function() {document.getElementById("fieldVisual").removeChild(painOverlay);}, 250)
    }

    static checkPos() {
        score -= 25;
        Field.updateElementCoords("hole", "left");
        Field.updateElementCoords("altMeteor", "up");
        Field.updateElementCoords("chicken", "up");
        Field.moveAstronaut(33);
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
        let holeArrayXY = Field.determineElementCoords("hole");
        let chickenArrayXY = Field.determineElementCoords("chicken");

        if (manPosY == hatPosY && manPosX == hatPosX) {
            score += 150;
            document.getElementById("announcementDiv").innerText = "Congratulations! You feast on delicious earthling!";
            document.getElementById("earth").src = "resources/images/explosion1.gif";
            document.getElementById("hat").src = "resources/images/skeleton.gif";
            let audio1 = document.getElementById("thehumanity");
            audio1.play();
            let audio2 = document.getElementById("nomnom");
            audio2.play();
            document.getElementById("hat").style.transform = "scaleY(1)";
            Field.endGame();
        }


        for (let XYpair = 0; XYpair < chickenArrayXY.length; XYpair++) {
            let chickenPosX = chickenArrayXY[XYpair][0];
            let chickenPosY = chickenArrayXY[XYpair][1];
            if (manPosX == chickenPosX && manPosY == chickenPosY) {
                lives++;
                score += 50;
                Field.showColorBackground("yellow");
                document.getElementById("statusBar").textContent = `Lives: ${lives}`;
                chickenArrayXY[XYpair][2].src = "resources/images/sparkles.gif";
                chickenArrayXY[XYpair][2].classList.remove("chicken");
                let audio = document.getElementById("nomnom");
                audio.play();
            }
        }

        for (let XYpair = 0; XYpair < holeArrayXY.length; XYpair++) {
            let holePosX = holeArrayXY[XYpair][0];
            let holePosY = holeArrayXY[XYpair][1];
            if (manPosX == holePosX && manPosY == holePosY) {
                lives--;
                score -= 50;
                Field.showColorBackground("red");
                let audio = document.getElementById("oof");
                audio.play();
            }
            
        }
        if (lives < 0) {
            lives = 0;
            document.getElementById("statusBar").textContent = `Lives: ${lives}`;
            document.getElementById("statusBar").style.color = "red";
            score -= 100;
            document.getElementById("announcementDiv").innerText = "You smashed into an asteroid and broke all your bones!";    
            document.getElementById("man").src = "resources/images/explosion1.gif";
            Field.endGame();
        }
    }


    static startGame() {
        let gameField = new Field(Field.fieldFromInput());
        gameField.print();
        gameField.generateBrowserField();

        document.getElementById("statusBar").style.display = "block";
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


document.getElementById("start").addEventListener("click", Field.startGame);
