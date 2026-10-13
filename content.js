class Dinosaur {
    constructor (imageSrc, startX, startY) {
        this.element = document.createElement('img');
        this.element.src = chrome.runtime.getURL(imageSrc);

        this.element.style.position = 'fixed';

        this.x = startX;
        this.y = startY;
        this.element.style.left = startX + 'px';
        this.element.style.bottom = startY + 'px';
        this.element.style.zIndex = '9999';

        this.element.style.width = '100px';
    }

    spawn () {
        document.body.appendChild(this.element);
    }
    move () {
        let speed = 5;
        let walk_stance = 1;

        let forward = 1;
        let counter = 1;

        setInterval(() => { //walking sequence shoud be : 1 2 3 2 1 2 3 2 1 2 3 2 1 ...
            this.x = this.x + speed;
            this.element.style.left = this.x + 'px';

            if(walk_stance == 1)
                this.element.src = chrome.runtime.getURL('dino1walk1.png'); //right back
            else if (walk_stance == 2)
                this.element.src = chrome.runtime.getURL('dino1.png'); //still
            else if (walk_stance == 3)
                this.element.src = chrome.runtime.getURL('dino1walk2.png'); //right forward

            if (forward == 1) {
                if (walk_stance == 1)
                    walk_stance = 2;
                else if (walk_stance == 2)
                    walk_stance = 3;
                else if (walk_stance == 3) {
                    forward = 0;
                    walk_stance = 2;
                }
            }
            else { //backward
                if (walk_stance == 2)
                    walk_stance = 1;
                else if (walk_stance == 1) {
                    forward = 1;
                    walk_stance = 2;
                }
            }

        }, 175)
    }
}

const dino1 = new Dinosaur('dino1.png', 50, 0); //50 - startX, 0 - startY (bottom)
const dino2 = new Dinosaur('dino2rev.png', 132, 0);

dino1.spawn();
dino1.move();
//dino2.spawn();
