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
}

const dino1 = new Dinosaur('dino1.png', 50, 0); //50 - startX, 0 - startY (bottom)
dino1.spawn();
