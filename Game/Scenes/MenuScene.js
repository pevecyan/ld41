
class MenuScene extends Scene {

    draw(){
        noStroke()
        fill('rgb(1, 119, 186)');
        rect(0, 0, this.width(), this.height());

        fill(255);
        textAlign(CENTER, BOTTOM);
        textSize(30);
        text('press space to play', 0, 0, this.width(), this.height()-30);
    }

    keyPressed(){
        if (keyCode == 32){ //Space
            engine.scenesManager.pushNewScene(new WorldScene());
        }
    }
}