let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
}
let countFood = 0;
let record = 0;

document.getElementById("countFood").innerHTML = 0;//pontuação
document.getElementById("countFoodRecord").innerHTML = 0;//recorde do jogador

function ciarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha(){
    for(i=0; i<snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){ //criar fruta
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event){ //direçao da cobra
    if(event.keyCode == 37 && direction != "right"){
        direction = "left";
    }
    if(event.keyCode == 38 && direction != "down"){
        direction = "up";
    }
    if(event.keyCode == 39 && direction != "left"){
        direction = "right";
    }
    if(event.keyCode == 40 && direction != "up"){
        direction = "down";
    }
}

function inicarJogo(){
    
    if(snake[0].x > 15 * box && direction == "right"){//direçao da cobra
        snake[0].x = 0;
    }
    if(snake[0].x < 0 && direction == "left"){
        snake[0].x = 16 * box;
    }
    if(snake[0].y > 15 * box && direction == "down"){
        snake[0].y = 0;
    }
    if(snake[0].y < 0 && direction == "up"){
        snake[0].y = 16 * box;
    }
    
    for(i=1; i < snake.length; i++){ //checar colisao da cabeça com o corpo da cobra
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
           // alert("Gamer Over");
           let reload = confirm("Gamer Over! Deseja reiniciar o jogo?");
           if(reload){
                for(i=1;i<=countFood;i++){ //retirar as frutas da cobra
                    snake.pop();
                }
            food.x= Math.floor(Math.random() * 15 + 1) * box;
            food.y = Math.floor(Math.random() * 15 + 1) * box;
            if(countFood>=record){//comparar a pontuaçao com o recorde
                record = countFood;
                document.getElementById("countFoodRecord").innerHTML = record;//recorde do jogador
            }
            countFood = 0;
            document.getElementById("countFood").innerHTML = countFood;//pontuação
            jogo = setInterval(inicarJogo, 100);
            }
        }
    }

    ciarBG();
    criarCobrinha();
    drawFood();
    
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction=="right"){ //movimentaçao da cobra
        snakeX += box;
    }
    
    if(direction=="left"){
        snakeX -= box;
    }
    
    if(direction=="up"){
        snakeY -= box;
    }
    
    if(direction=="down"){
        snakeY += box;
    }

    if(snakeX != food.x || snakeY != food.y){ // snake come a fruta
        snake.pop();
    } else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        document.getElementById("countFood").innerHTML = ++countFood;//pontuação
    }

    let newHead = { //cabeça da cobra
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(inicarJogo, 100);
