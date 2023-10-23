const canvas = document.querySelector('canvas');

canvas.width = 800;
canvas.height = 580;

const contx = canvas.getContext('2d');

players_width = 20;
players_height = 30;

// Player1

const player1 = [
    {x : 10,y:0},
    {x : 10,y:30},
    {x : 10,y:60}
]

// Player2

const player2 = [
    {x : (canvas.width - players_width) - 10,y:0},
    {x : (canvas.width - players_width) - 10,y:30},
    {x : (canvas.width - players_width) - 10,y:60}
]

// Drawing Player1

const DrawPlayer1 = () => {
    contx.fillStyle = '#ddd';
    player1.forEach((position,index) => {
        if(index == 1){
            contx.fillStyle = 'white';
        } 
        contx.fillRect(position.x , position.y , players_width,players_height);
        contx.fillStyle = '#ddd';  
    })
}
// Drawing Player2

const DrawPlayer2 = () => { 
    player2.forEach((position,index) => {
        if(index == 1){
            contx.fillStyle = 'white';
        } 
        contx.fillRect(position.x , position.y , players_width,players_height);
        contx.fillStyle = '#ddd';  
    })
}
// Moving Players

let directionPlayer1 , directionPlayer2
const MovePlayers = () => {
    if(!directionPlayer1 & !directionPlayer2)return
    if(directionPlayer1 == 'down' && player1[player1.length - 1].y + players_height <= canvas.height){
        player1.forEach((position) => {position.y += 5})
    }
    if(directionPlayer1 == 'up' &&  player1[0].y > 0){
        player1.forEach((position) => {position.y -= 5})
    }
    if(directionPlayer2 == 's' && player2[player2.length - 1].y + players_height <= canvas.height){
        player2.forEach((position) => { position.y += 5})
    }
    if(directionPlayer2 == 'w' && player2[0].y > 0){
        player2.forEach((position) => {position.y -= 5})
    }
    
}
window.addEventListener('keydown' , ({key}) => {
    if(key == 'ArrowDown'){
        directionPlayer1 = 'down';
    }
    if(key == 'ArrowUp' ){
        directionPlayer1 = 'up';
    }
    if(key == 's' ){
        directionPlayer2 = 's';
    }
    if(key == 'w'){
        directionPlayer2 = 'w';
    }
});
window.addEventListener('keyup' , ({key}) =>{
    if(key == 'ArrowDown' || key == 'ArrowUp'){
        directionPlayer1 = null;
    }
    if(key == 's' || key == 'w'){
        directionPlayer2 = null;
    };
})


// Ball

const Ball = {
 
    position:{
        x : canvas.width/2,
        y : canvas.height/2
    },
    velocity:{
        x:5.5,
        y:5.5
    },
    radiusX : 8,
    radiusY : 8,
}

// Drawing Ball

const DrawingBall = () => {
    contx.fillStyle = 'd4bebc';
    contx.beginPath();
    contx.ellipse(Ball.position.x, Ball.position.y, Ball.radiusX, Ball.radiusY, 0, 0 ,2 * Math.PI);
    contx.fill()
}

// Moving Ball

const moving = ['inclined-right-up','inclined-right-down','inclined-left-up','inclined-left-down']

let direction = moving[Math.round((moving.length - 1) * Math.random())];



const MoveBall = () => {
    switch(direction){
        case 'inclined-right-up' : 
            Ball.position.x += Ball.velocity.x;
            Ball.position.y -= Ball.velocity.y;
            break
        case 'inclined-right-down' : 
            Ball.position.x += Ball.velocity.x;
            Ball.position.y += Ball.velocity.y;
            break
        case 'inclined-left-up' : 
            Ball.position.x -= Ball.velocity.x;
            Ball.position.y -= Ball.velocity.y;
            break
        case 'inclined-left-down' : 
            Ball.position.x -= Ball.velocity.x;
            Ball.position.y += Ball.velocity.y;
            break
    } 
}
// Score

const ScorePlayer1 = () => {
    document.getElementById('player1_score').innerHTML = parseInt(document.getElementById('player1_score').innerHTML) + 1;
    
}
const ScorePlayer2 = () => {
    document.getElementById('player2_score').innerHTML = parseInt(document.getElementById('player2_score').innerHTML) + 1;
    
}

// Collisions Ball

const collisionsBall = () => {
    if(Ball.position.y - Ball.radiusY <= 0 && direction == 'inclined-right-up'){
        direction = 'inclined-right-down'
    }
    if(Ball.position.y - Ball.radiusY <= 0 && direction == 'inclined-left-up'){
        direction = 'inclined-left-down'
    }
    if(Ball.position.x + Ball.radiusX >= canvas.width && direction == 'inclined-right-down'){
        direction = 'inclined-left-down'
        ScorePlayer1();
        if( Ball.velocity.x < 9.5 && Ball.velocity.y < 9.5){
            Ball.velocity.x += 0.1;
            Ball.velocity.y += 0.1;
        }
    } 
    if(Ball.position.x  + Ball.radiusX >= canvas.width && direction == 'inclined-right-up'){
        direction = 'inclined-left-up'
        ScorePlayer1();
        if( Ball.velocity.x < 9.5 && Ball.velocity.y < 9.5){
            Ball.velocity.x += 0.1;
            Ball.velocity.y += 0.1;
        }
    }
    if(Ball.position.y + Ball.radiusY >= canvas.height && direction == 'inclined-left-down'){
        direction = 'inclined-left-up'
    }
    if(Ball.position.y + Ball.radiusY >= canvas.height && direction == "inclined-right-down"){
        direction = 'inclined-right-up'
    }
    if(Ball.position.x  - Ball.radiusX <= 0 && direction == 'inclined-left-up'){
        direction = 'inclined-right-up'
        ScorePlayer2();
        if( Ball.velocity.x < 9.5 && Ball.velocity.y < 9.5){
            Ball.velocity.x += 0.1;
            Ball.velocity.y += 0.1;
        }  
    }
    if(Ball.position.x - Ball.radiusX <= 0 && direction == 'inclined-left-down'){
        direction = 'inclined-right-down'
        ScorePlayer2();
        if( Ball.velocity.x < 9.5 && Ball.velocity.y < 9.5){
            Ball.velocity.x += 0.1;
            Ball.velocity.y += 0.1;
        }
    }
    if(Ball.position.x - Ball.radiusX <= player1[0].x + players_width 
        && Ball.position.y + Ball.radiusY >= player1[0].y
        &&  Ball.position.y + Ball.radiusY <= (player1[player1.length - 1].y + players_height) &&
        direction == 'inclined-left-down'){
        direction = 'inclined-right-down'
    }
    if(Ball.position.x - Ball.radiusX <= player1[0].x + players_width 
        && Ball.position.y + Ball.radiusY >= player1[0].y
        && Ball.position.y + Ball.radiusY <= (player1[player1.length - 1].y + players_height) &&
        direction == 'inclined-left-up'){
        direction = 'inclined-right-up'
    }
    if(Ball.position.x + Ball.radiusX >= player2[0].x 
        && Ball.position.y + Ball.radiusY >= player2[0].y
        && Ball.position.y + Ball.radiusY <= player2[player2.length - 1].y + players_height     
        && direction == 'inclined-right-down'){
        direction = 'inclined-left-down'
    }
    if(Ball.position.x + Ball.radiusX >= player2[0].x 
        && Ball.position.y + Ball.radiusY >= player2[0].y
        && Ball.position.y + Ball.radiusY <= player2[player2.length - 1].y + players_height     
        && direction == 'inclined-right-up'){
        direction = 'inclined-left-up'
    }
}
// Game Loop

const GameLoop = () => {
    contx.clearRect(0,0,canvas.width ,canvas.height)
    window.requestAnimationFrame(GameLoop);
    DrawPlayer1();
    DrawPlayer2(); 
    DrawingBall();
    MovePlayers();
    MoveBall();
    collisionsBall();
}

GameLoop()