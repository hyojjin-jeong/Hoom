const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function bakcendDone(msg) {
    console.log(`The backend says: `, msg);
}

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", input.value, bakcendDone);
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);