var geometryUtils = new GeometryUtils();
var canvas, context, c;
var catcherGameOne, runnerGame1;
var firstCatcherGameOTwo, secondCatcherGameTwo, runnerGameTwo;
countOfPlayersGameOne = 1, countOfPlayersGameTwo = 1;

function sqr(x) {
    return x * x;
}

function getMousePos(canvas, evt) {

    var rect = canvas.getBoundingClientRect();

    var mouseX = evt.clientX - rect.left;
    var mouseY = evt.clientY - rect.top;

    return {
        x: mouseX,
        y: mouseY
    };
}

function initGames(two_players_canvas_id, three_players_canvas_id) {
    initGameForTwoPlayers(two_players_canvas_id);
    initGameForThreePlayers(three_players_canvas_id);
}

function initGameForTwoPlayers(canvas_id) {
    countOfPlayersGameOne = 1;
    canvas = document.getElementById(canvas_id);
    context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = backgroundColor.fadeFill;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)

    canvas.addEventListener('click', function (evt) {
        var mousePos = getMousePos(canvas, evt);
        if (countOfPlayersGameOne < 2) {
            catcherGameOne = new Catcher(mousePos.x, mousePos.y, context);
            catcherGameOne.drawCatcher();
            countOfPlayersGameOne++;
        } else if (countOfPlayersGameOne == 2) {
            runnerGame1 = new RunnerGameOne(mousePos.x, mousePos.y, context);
            runnerGame1.drawRunner();
            countOfPlayersGameOne++;
        } else if (countOfPlayersGameOne == 3) {
            runnerGame1.init_from(catcherGameOne.getCoords(), runnerGame1.getCoords());
            setInterval("moveTwoPlayersGame()", 100);
            countOfPlayersGameOne = 4;
        } else {
            runnerGame1.stop = true;
            catcherGameOne.stop = true;
        }
    }, false);
}

function moveTwoPlayersGame() {
    let runnerSpeed = parseInt(document.getElementById("runnerSpeedGameOne").value);
    runnerGame1.moveSimple(runnerSpeed);
    let catcherSpeed = parseInt(document.getElementById("catherSpeedGameOne").value);
    catcherGameOne.moveParallel(runnerGame1, catcherSpeed);
}

function initGameForThreePlayers(canvas_id) {
    countOfPlayersGameTwo = 1;
    canvas = document.getElementById(canvas_id);
    context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = backgroundColor.fadeFill;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)

    canvas.addEventListener('click', function (evt) {
        var mousePos = getMousePos(canvas, evt);
        if (countOfPlayersGameTwo < 2) {
            firstCatcherGameOTwo = new Catcher(mousePos.x, mousePos.y, context);
            firstCatcherGameOTwo.drawCatcher();
            countOfPlayersGameTwo++;
        }
        else if (countOfPlayersGameTwo == 2) {
            secondCatcherGameTwo = new Catcher(mousePos.x, mousePos.y, context);
            secondCatcherGameTwo.drawCatcher();
            countOfPlayersGameTwo++;
        } else if (countOfPlayersGameTwo == 3) {
            runnerGameTwo = new Runner(mousePos.x, mousePos.y, context);
            runnerGameTwo.drawRunner();
            countOfPlayersGameTwo++;
        } else if (countOfPlayersGameTwo == 4) {

            runnerGameTwo.init_from(firstCatcherGameOTwo.getCoords(), runnerGameTwo.getCoords());
            setInterval("moveThreePlayersGame()", 100);
            countOfPlayersGameTwo = 5;
        } else {
            runnerGameTwo.stop = true;
            firstCatcherGameOTwo.stop = true;
            secondCatcherGameTwo.stop = true;
        }
    }, false);
}

function moveThreePlayersGame() {
    let runnerSpeed = parseInt(document.getElementById("runnerSpeedGameTwo").value);
    runnerGameTwo.moveSimple(runnerSpeed);
    let fisrtCatcherSpeed = parseInt(document.getElementById("fisrtCatcherSpeed").value);
    firstCatcherGameOTwo.moveParallel(runnerGameTwo, fisrtCatcherSpeed);
    let secondCatcherSpeed = parseInt(document.getElementById("secondCatcherSpeed").value);
    secondCatcherGameTwo.moveParallel(runnerGameTwo, secondCatcherSpeed);
}