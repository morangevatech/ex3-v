(function ($) {
    //mazeboard plugin - canvas
    $.fn.mazeBoard = function (maze, multiplayerhub) {
        var myCanvas = this[0];
        var context = myCanvas.getContext("2d");      
        var rows = maze.Rows;
        var cols = maze.Cols;
        var currntStateRow = maze.InitialPosRow;
        var currntStateCol = maze.InitialPosCol;
        var flag=false;
        var cellWidth = myCanvas.width / cols;
        var cellHeight = myCanvas.height / rows;       
        var player_image = new Image();
        var goal_image = new Image();
        var maze_name = maze.Name;
        drawMaze();
        addKeyboardListener();
        checkIfWinner();
        //draw maze
        function drawMaze() {
            //clear rect
            context.clearRect(0, 0, myCanvas.width, myCanvas.height);
            //draw cells
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    if (maze.MazePath[i * cols + j] == 1) {
                        context.fillRect(cellWidth * j, cellHeight * i, cellWidth, cellHeight);
                    }
                }
            }
            //upload player img
            player_image.src = "../page/img/pokeball.svg";
            player_image.onload = function () {
                context.drawImage(player_image, cellWidth * maze.InitialPosCol, cellHeight * maze.InitialPosRow, cellWidth, cellHeight);
            };
            //upload goal img
            goal_image.src = "../page/img/jigglypuff.svg";
            goal_image.onload = function () {
                context.drawImage(goal_image, cellWidth * maze.GoalPosCol, cellHeight * maze.GoalPosRow, cellWidth, cellHeight);
            };
        };

        //move by keyboard arrows
        function moveSelection(e) {
            switch (e.keyCode) {
                case 37:
                    leftArrowPressed();
                    multiplayerhub.server.play(maze.Name, "left");
                    checkIfWinner();
                    break;
                case 39:
                    rightArrowPressed();
                    multiplayerhub.server.play(maze.Name, "right");
                    checkIfWinner();
                    break;
                case 38:
                    upArrowPressed();
                    multiplayerhub.server.play(maze.Name, "up");
                    checkIfWinner();
                    break;
                case 40:
                    downArrowPressed();
                    multiplayerhub.server.play(maze.Name, "down");
                    checkIfWinner();
                    break;                    
            }
        };

        //clear player
        function clearPlayer() {
            context.clearRect(currntStateCol * cellWidth, currntStateRow * cellHeight, cellWidth, cellHeight);
        };

        //draw player
        function drawPlayer() {
            context.drawImage(player_image, currntStateCol * cellWidth, currntStateRow * cellHeight, cellWidth, cellHeight);
        };

        //draw goal
        function drawGoal() {
            context.drawImage(goal_image, cellWidth * maze.GoalPosCol, cellHeight * maze.GoalPosRow, cellWidth, cellHeight);
        };

        //check if arrived to goal state and show winner message
        function checkIfWinner() {
            if (currntStateCol == maze.GoalPosCol && currntStateRow == maze.GoalPosRow) {
                var username = sessionStorage.getItem('loginSession');
                multiplayerhub.server.win(username);
                setTimeout(function () {
                    removeKeyboardListener();
                    context.clearRect(0, 0, myCanvas.width, myCanvas.height);
                    var winner_image = new Image();
                    winner_image.src = "../page/img/crown.svg";
                    winner_image.onload = function () {
                        context.drawImage(winner_image, 50, 100, myCanvas.width - 90, myCanvas.height - 100);
                    };
                    context.font = "72px Arial"
                    context.fillText("Winner", 70, 100);
                }, 200);              
            }
        };

        //show loss message
        $.fn.PlayerLoss=function() {
                setTimeout(function () {
                    removeKeyboardListener();
                    context.clearRect(0, 0, myCanvas.width, myCanvas.height);
                    var losser_image = new Image();
                    losser_image.src = "../page/img/pikachu.svg";
                    losser_image.onload = function () {
                        context.drawImage(losser_image, 50, 100, myCanvas.width - 80, myCanvas.height - 100);
                    };
                    context.font = "72px Arial"
                    context.fillText("Losser", 70, 110);
                }, 200);
        };

        //remove keyboard listener
        function removeKeyboardListener() {
            myCanvas.onkeydown = null;
        };

        //add keyboard listener
        function addKeyboardListener() {
            myCanvas.onkeydown = moveSelection.bind(this);
        };
        
        //left arrow pressed
        function leftArrowPressed() {
            if (currntStateCol - 1 >= 0 && maze.MazePath[currntStateRow * cols + (currntStateCol - 1)] == 0)
            {
                clearPlayer();
                currntStateCol -= 1;
                drawPlayer();                
            }
            return this;
        };

        //right arrow pressed
        function rightArrowPressed() {
            if (currntStateCol + 1 <= cols - 1 && maze.MazePath[currntStateRow * cols + (currntStateCol + 1)] == 0)
            {
                clearPlayer();
                currntStateCol += 1;
                drawPlayer();             
            }
            return this;
        };

        //up arrow pressed
        function upArrowPressed() {
            if (currntStateRow - 1 >= 0 && maze.MazePath[(currntStateRow - 1) * cols + currntStateCol] == 0)
            {
                clearPlayer();
                currntStateRow -= 1;
                drawPlayer();               
            }
            return this;
        };

        //down arrow pressed
        function downArrowPressed() {
            if (currntStateRow + 1 <= rows - 1 && maze.MazePath[(currntStateRow + 1) * cols + currntStateCol] == 0) {
                clearPlayer();
                currntStateRow += 1;
                drawPlayer();
            }
            return this;
        };

        //reset currnt state values
        function resetCurrntState() {
            currntStateRow = maze.InitialPosRow;
            currntStateCol = maze.InitialPosCol;
        };
    };

    //maze board of the second player 
    $.fn.otherMazeBoard = function (maze) {
        var myCanvas = this[0];
        var context = myCanvas.getContext("2d");
        var rows = maze.Rows;
        var cols = maze.Cols;
        var currntStateRow = maze.InitialPosRow;
        var currntStateCol = maze.InitialPosCol;
        var flag = false;
        var cellWidth = myCanvas.width / cols;
        var cellHeight = myCanvas.height / rows;
        var player_image = new Image();
        var goal_image = new Image();
        drawMaze();
        //draw maze
        function drawMaze() {
            //clear rect
            context.clearRect(0, 0, myCanvas.width, myCanvas.height);
            //draw cells
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    if (maze.MazePath[i * cols + j] == 1) {
                        context.fillRect(cellWidth * j, cellHeight * i, cellWidth, cellHeight);
                    }
                }
            }
            //upload player img
            player_image.src = "../page/img/pokeball.svg";
            player_image.onload = function () {
                context.drawImage(player_image, cellWidth * maze.InitialPosCol, cellHeight * maze.InitialPosRow, cellWidth, cellHeight);
            };
            //upload goal img
            goal_image.src = "../page/img/psyduck.svg";
            goal_image.onload = function () {
                context.drawImage(goal_image, cellWidth * maze.GoalPosCol, cellHeight * maze.GoalPosRow, cellWidth, cellHeight);
            };
        };

        //clear player
        function clearPlayer() {
            context.clearRect(currntStateCol * cellWidth, currntStateRow * cellHeight, cellWidth, cellHeight);
        };

        //draw player
        function drawPlayer() {
            context.drawImage(player_image, currntStateCol * cellWidth, currntStateRow * cellHeight, cellWidth, cellHeight);
        };

        //draw goal
        function drawGoal() {
            context.drawImage(goal_image, cellWidth * maze.GoalPosCol, cellHeight * maze.GoalPosRow, cellWidth, cellHeight);
        };

        //left arrow pressed
        $.fn.leftArrowPressed=function(){
            if (currntStateCol - 1 >= 0 && maze.MazePath[currntStateRow * cols + (currntStateCol - 1)] == 0) {
                clearPlayer();
                currntStateCol -= 1;
                drawPlayer();
            }
            return this;
        };

        //right arrow pressed
        $.fn.rightArrowPressed = function () {
            if (currntStateCol + 1 <= cols - 1 && maze.MazePath[currntStateRow * cols + (currntStateCol + 1)] == 0) {
                clearPlayer();
                currntStateCol += 1;
                drawPlayer();
            }
            return this;
        };

        //up arrow pressed
        $.fn.upArrowPressed = function () {
            if (currntStateRow - 1 >= 0 && maze.MazePath[(currntStateRow - 1) * cols + currntStateCol] == 0) {
                clearPlayer();
                currntStateRow -= 1;
                drawPlayer();
            }
            return this;
        };

        //down arrow pressed
       $.fn.downArrowPressed = function () {
            if (currntStateRow + 1 <= rows - 1 && maze.MazePath[(currntStateRow + 1) * cols + currntStateCol] == 0) {
                clearPlayer();
                currntStateRow += 1;
                drawPlayer();
            }
            return this;
        };

        //reset currnt state values
        function resetCurrntState() {
            currntStateRow = maze.InitialPosRow;
            currntStateCol = maze.InitialPosCol;
        };
    };
})(jQuery);