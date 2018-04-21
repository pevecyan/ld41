let engine;

function setup(){
    engine  = new Engine();
    engine.setup();
}

function draw(){
    engine.draw();
}

function keyPressed(){engine.keyPressed()}
