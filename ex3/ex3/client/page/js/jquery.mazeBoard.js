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
            context.drawImage(player_image, cellHeight * maze.InitialPosCol, cellWidth * maze.InitialPosRow, cellWidth, cellHeight);
        };
        var goal_image = new Image();
        goal_image.src = "../page/img/jigglypuff.png";
        goal_image.onload = function () {
            context.drawImage(goal_image, cellHeight * maze.GoalPosCol, cellWidth * maze.GoalPosRow, cellWidth, cellHeight);
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
            context.clearRect(currntStateCol * cellHeight, currntStateRow * cellWidth, cellWidth, cellHeight);
        };

        function drawPlayer() {
            context.drawImage(player_image, currntStateCol * cellHeight, currntStateRow * cellWidth, cellWidth, cellHeight);
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



        return this;
    };

    $.fn.mazeBoard.solveMaze = function () {
        alert("soosososo");
    };
})(jQuery);





