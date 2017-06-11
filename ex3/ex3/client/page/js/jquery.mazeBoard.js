(function ($) {
    $.fn.mazeBoard = function (maze) {
        var myCanvas = this[0];
        var context = myCanvas.getContext("2d");
        context.clearRect(0, 0, myCanvas.width, myCanvas.height);
        var rows = maze.Rows;
        var cols = maze.Cols;
        var currntStateRow = maze.InitialPosRow;
        var currntStateCol = maze.InitialPosCol;
        var flag=false;
        var cellWidth = myCanvas.width / cols;
        var cellHeight = myCanvas.height / rows;       
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                    if (maze.MazePath[i * cols + j] == 1) {
                        context.fillRect(cellWidth * j, cellHeight * i, cellWidth, cellHeight);
                    }
                }
        }
        var player_image = new Image();
        player_image.src = "../page/img/pokeball.png";      
        player_image.onload = function () {
            context.drawImage(player_image, cellWidth * maze.InitialPosCol,cellHeight * maze.InitialPosRow, cellWidth,cellHeight);
        };
        var goal_image = new Image();
        goal_image.src = "../page/img/jigglypuff.png";
        goal_image.onload = function () {
            context.drawImage(goal_image, cellWidth * maze.GoalPosCol, cellHeight * maze.GoalPosRow, cellWidth, cellHeight);
        };
        
        addKeyboardListener();
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

        function clearPlayer() {
            context.clearRect(currntStateCol * cellWidth, currntStateRow * cellHeight, cellWidth, cellHeight);
        };

        function drawPlayer() {
            context.drawImage(player_image, currntStateCol * cellWidth, currntStateRow * cellHeight, cellWidth, cellHeight);
        };

        function drawGoal() {
            context.drawImage(goal_image, cellWidth * maze.GoalPosCol, cellHeight * maze.GoalPosRow, cellWidth, cellHeight);
        };

        function checkIfWinner() {
            if (currntStateCol == maze.GoalPosCol && currntStateRow == maze.GoalPosRow) {
                alert("winner");
                removeKeyboardListener();
            }
        };

        function removeKeyboardListener() {
            myCanvas.onkeydown = null;
        };

        function addKeyboardListener() {
            myCanvas.onkeydown = moveSelection.bind(this);
        };
        
        function leftArrowPressed() {
            if (currntStateCol - 1 >= 0 && maze.MazePath[currntStateRow * cols + (currntStateCol - 1)] == 0)
            {
                clearPlayer();
                currntStateCol -= 1;
                drawPlayer();
            }                
        };

        function rightArrowPressed() {
            if (currntStateCol + 1 <= cols - 1 && maze.MazePath[currntStateRow * cols + (currntStateCol + 1)] == 0)
            {
                clearPlayer();
                currntStateCol += 1;
                drawPlayer();
            }                
        };

        function upArrowPressed() {
            if (currntStateRow - 1 >= 0 && maze.MazePath[(currntStateRow - 1) * cols + currntStateCol] == 0)
            {
                clearPlayer();
                currntStateRow -= 1;
                drawPlayer();
            }                
        };

        function downArrowPressed() {
            if (currntStateRow + 1 <= rows - 1 && maze.MazePath[(currntStateRow + 1) * cols + currntStateCol] == 0) {
                clearPlayer();
                currntStateRow += 1;
                drawPlayer();
            }               
        };

        function resetCurrntState() {
            currntStateRow = maze.InitialPosRow;
            currntStateCol = maze.InitialPosCol;
        };

        $.fn.restartMaze = function () {
            addKeyboardListener();
            clearPlayer();
            resetCurrntState();
            drawPlayer();
            drawGoal();
            return this;
        };

        $.fn.solveMaze = function (solution) {          
            var path = solution.MazeSolution;
            removeKeyboardListener();
            clearPlayer();
            resetCurrntState();
            drawPlayer();
            drawGoal();
            for (i = 0; i < path.length; i++) {
                doSetTimeout(path[i],i);
            }

            function doSetTimeout(index,i) {
                setTimeout(function () { moveAnimation(index); }, i*130);
            };

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








