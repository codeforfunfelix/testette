let field = document.querySelector("#field");

let time = 0;
let left = 0;

let lastZIndex = 1;
function makeDraggable(elmnt) {
    left += 0.5;
    elmnt.style.left = Math.floor(Math.random() * field.clientWidth) + field.getBoundingClientRect().x;
    elmnt.style.top = Math.floor(Math.random() * field.clientHeight)  + field.getBoundingClientRect().y;

    let partner = document.querySelector(`#${elmnt.getAttribute('data-partner-id')}`);

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        elmnt.style["z-index"] = lastZIndex + 1;
        lastZIndex++;
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        if (Math.abs(elmnt.getBoundingClientRect().x - partner.getBoundingClientRect().x) < 20 && Math.abs(elmnt.getBoundingClientRect().y - partner.getBoundingClientRect().y) < 20) {
            elmnt.style.opacity = 0;
            partner.style.opacity = 0;
            left -= 1;
            setTimeout(_ => {
                elmnt.remove();
                partner.remove();
        }, 1000);
        }

        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

Array.from(document.querySelectorAll("#field .item")).forEach((elmt, i) => {
    makeDraggable(elmt)
})

function getTimeString(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (String(seconds).length == 1) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`
}

document.querySelector("#timer").innerText = getTimeString(0);
let interval = setInterval(_ => {
    time++;
    document.querySelector("#timer").innerText = getTimeString(time);
    if (left == 0) {
        clearInterval(interval)
        document.querySelector("#game-over #time-display").innerText = getTimeString(time);
        document.querySelector("#game-over").classList.add("show");
    }
}, 1000)