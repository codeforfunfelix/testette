let asteroids = Array.from(document.querySelectorAll('.asteroid'));

let lastZIndex = 1;
let asteroidHandlers = [];

let score = 0;
let pause = false;

let incorrect = [];

setInterval(_ => {
    if (pause) return;
    let asteroid = asteroids[Math.floor(Math.random() * asteroids.length)];
    asteroid.style.top = -200;
    asteroid.style.left = Math.floor(Math.random() * (window.innerWidth - 200));
    asteroid.style["z-indez"] = lastZIndex + 1;
    lastZIndex++;
    asteroid.style.display = 'block';
    if (incorrect.includes(asteroid.innerText)) asteroid.style.color = 'red';
    let top = -200;
    let interval = setInterval(_ => {
        if (pause) return;      
        top += 5;
        asteroid.style.top = top;
        if (top > window.innerHeight + 200) { 
            asteroid.remove();
            clearInterval(interval);
            for (let i in asteroidHandlers) {
                if (asteroidHandlers[i][0] == asteroid.getAttribute("data-definition")) {
                    asteroidHandlers.splice(i, 1);
                }
            }
            pause = true;
            document.querySelector("#correct-answer h2").innerText = `${asteroid.innerText} ${asteroid.getAttribute("data-definition")}`;
            document.querySelector("#correct-answer").classList.add("show");
            document.querySelector("#correct-answer input").onkeyup = e => {
                if (document.querySelector("#correct-answer input").value.trim().toLowerCase() == asteroid.getAttribute("data-definition").trim().toLowerCase()) {
                    document.querySelector("#correct-answer").classList.remove("show")
                    document.querySelector("#correct-answer input").value = "";
                    pause = false;
                    document.querySelector("#type-bar input").focus();
                }
            }
            if (asteroid.style.color == 'red') {
                document.querySelector("#game-over span").innerText = score;
                document.querySelector("#game-over").classList.add('show');
            } else {
                incorrect.push(asteroid.innerText);
            }
        }
    }, 25);
    asteroidHandlers.push([asteroid.getAttribute("data-definition"), _ => {
        asteroid.remove();
        for (let i in asteroidHandlers) {
            if (asteroidHandlers[i][0] == asteroid.getAttribute("data-definition")) {
                asteroidHandlers.splice(i, 1);
            }
        }
        clearInterval(interval);
    }]);
}, 5000);

document.querySelector("#type-bar input").addEventListener('keyup', e => {
    if (e.key == 'Enter') {
        for (let asteroidHandler of asteroidHandlers) {
            if (asteroidHandler[0].toLowerCase().trim() == document.querySelector("#type-bar input").value.toLowerCase().trim()) {
                asteroidHandler[1]();
                score++;
                document.querySelector("#score-display").innerText = score;
            }
        }
        document.querySelector("#type-bar input").value = "";
    }
});