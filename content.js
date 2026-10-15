class Dinosaur {
    constructor (imageSrc, startX, startY) {
        this.element = document.createElement('img');
        this.element.src = chrome.runtime.getURL(imageSrc);

        this.element.style.position = 'fixed';
        this.element.style.width = '100px';
        this.element.style.zIndex = '9999';

        //starting position from bottom left corner (startX and startY are sent as parameters)
        this.x = startX; this.element.style.left = startX + 'px';
        this.y = startY; this.element.style.bottom = startY + 'px';
        
        this.speed = 5;
        this.walk_stance = 1; //starting idle stance
        this.facing_right = 1;
        this.forward = 1; //referring to moving sequence order 
        this.current_state = 'idle';
    }

    move_right_img_seq() { //moving sequence shoud be : 1 2 3 2 1 2 3 2 1 2 3 2 1 ...
        this.x = this.x + this.speed;
        this.element.style.left = this.x + 'px';

        if(this.walk_stance == 1)
            this.element.src = chrome.runtime.getURL('dino1walk1.png'); //right back
        else if (this.walk_stance == 2)
            this.element.src = chrome.runtime.getURL('dino1.png'); //still
        else if (this.walk_stance == 3)
            this.element.src = chrome.runtime.getURL('dino1walk2.png'); //right forward

        if (this.forward == 1) {
            if (this.walk_stance == 1)
                this.walk_stance = 2;
            else if (this.walk_stance == 2)
                this.walk_stance = 3;
            else if (this.walk_stance == 3) {
                this.forward = 0;
                this.walk_stance = 2;
            }
        }
        else { //backward
            if (this.walk_stance == 2)
                this.walk_stance = 1;
            else if (this.walk_stance == 1) {
                this.forward = 1;
                this.walk_stance = 2;
            }
        }
    }

    move_left_img_seq() { 
        this.x = this.x - this.speed;
        this.element.style.left = this.x + 'px';

        if(this.walk_stance == 1)
            this.element.src = chrome.runtime.getURL('dino1walk1rev.png'); //right back
        else if (this.walk_stance == 2)
            this.element.src = chrome.runtime.getURL('dino1rev.png'); //still
        else if (this.walk_stance == 3)
            this.element.src = chrome.runtime.getURL('dino1walk2rev.png'); //right forward

        if (this.forward == 1) {
            if (this.walk_stance == 1)
                this.walk_stance = 2;
            else if (this.walk_stance == 2)
                this.walk_stance = 3;
            else if (this.walk_stance == 3) {
                this.forward = 0;
                this.walk_stance = 2;
            }
        }
        else { //backward
            if (this.walk_stance == 2)
                this.walk_stance = 1;
            else if (this.walk_stance == 1) {
                this.forward = 1;
                this.walk_stance = 2;
            }
        }
    }

    idle() {
        if (this.facing_right)
            this.element.src = chrome.runtime.getURL('dino1.png');
        else    
            this.element.src = chrome.runtime.getURL('dino1rev.png');

        this.walk_stance = 1;
    }

    spawn () {
        document.body.appendChild(this.element);
    }
}

const dino1 = new Dinosaur('dino1.png', 50, 0); //50 - startX, 0 - startY (bottom)
dino1.spawn();

let moving_right = true;

setInterval (() => {
    moving_right = !moving_right;
}, 5000);

setInterval(() => {
    if (moving_right)
        dino1.move_right_img_seq();
    else
        dino1.move_left_img_seq();
}, 200);

