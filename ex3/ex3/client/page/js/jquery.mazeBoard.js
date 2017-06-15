(function ($) {
    //mazeboard plugin - canvas
    $.fn.mazeBoard = function (maze) {
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
                    checkIfWinner();
                    break;
                case 39:
                    rightArrowPressed();
                    checkIfWinner();
                    break;
                case 38:
                    upArrowPressed();
                    checkIfWinner();
                    break;
                case 40:
                    downArrowPressed();
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
                setTimeout(function () {
                    removeKeyboardListener();
                    context.clearRect(0, 0, myCanvas.width, myCanvas.height);
                    var winner_image = new Image();
                    winner_image.src = "../page/img/crown.svg";
                    winner_image.onload = function () {
                        context.drawImage(winner_image, 50, 100, myCanvas.width - 90, myCanvas.height - 100);
                    };
                    context.font = "72px Arial"
                    context.fillText("Winner", 100, 100);
                }, 200);              
            }
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
        };

        //right arrow pressed
        function rightArrowPressed() {
            if (currntStateCol + 1 <= cols - 1 && maze.MazePath[currntStateRow * cols + (currntStateCol + 1)] == 0)
            {
                clearPlayer();
                currntStateCol += 1;
                drawPlayer();
            }                
        };

        //up arrow pressed
        function upArrowPressed() {
            if (currntStateRow - 1 >= 0 && maze.MazePath[(currntStateRow - 1) * cols + currntStateCol] == 0)
            {
                clearPlayer();
                currntStateRow -= 1;
                drawPlayer();
            }                
        };

        //down arrow pressed
        function downArrowPressed() {
            if (currntStateRow + 1 <= rows - 1 && maze.MazePath[(currntStateRow + 1) * cols + currntStateCol] == 0) {
                clearPlayer();
                currntStateRow += 1;
                drawPlayer();
            }               
        };

        //reset currnt state values
        function resetCurrntState() {
            currntStateRow = maze.InitialPosRow;
            currntStateCol = maze.InitialPosCol;
        };

        //restart maze
        $.fn.restartMaze = function () {
            resetCurrntState();
            drawMaze();
            addKeyboardListener();
            checkIfWinner();
            return this;
        };

        //solve maze
        $.fn.solveMaze = function (solution) {          
            var path = solution.MazeSolution;
            removeKeyboardListener();
            resetCurrntState();
            drawMaze();
            for (i = 0; i < path.length; i++) {
                doSetTimeout(path[i],i);
            }
            //end message
            setTimeout(function () {
                context.clearRect(0, 0, myCanvas.width, myCanvas.height);
                var endAnimation_image = new Image();
                endAnimation_image.src = "../page/img/compass.svg";
                endAnimation_image.onload = function () {
                    context.drawImage(endAnimation_image, 100, 150, myCanvas.width-200, myCanvas.height-200);
                };
                context.font = "32px Arial"
                context.fillText("Animation Ended", 75, 100);
            }, path.length * 130);

            //do set time out
            function doSetTimeout(index,i) {
                setTimeout(function () { moveAnimation(index); }, i*130);
            };

            //animation move
            function moveAnimation(index) {
                    switch (index) {
                        case '0':
                            leftArrowPressed();
                            break;
                        case '1':
                            rightArrowPressed();
                            break;
                        case '2':
                            upArrowPressed();
                            break;
                        case '3':
                            downArrowPressed();
                            break;
                    }
            };
            return this;
        };
        return this;
    };
})(jQuery);








