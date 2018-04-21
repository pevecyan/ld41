
class SplashScene extends Scene {

    loaded(){
        console.log('splash loaded');
        setTimeout(() => {
            engine.scenesManager.pushScene('menu');
        }, 2000);
    }
    
    draw(){
        noStroke()
        
        fill('rgb(1, 119, 186)');
        rect(0, 0, this.width(), this.height());
        textAlign(CENTER,CENTER);
        fill(255);
        textSize(30);
        text('GAME NAME', 0, 0, this.width(), this.height())
    }
}   