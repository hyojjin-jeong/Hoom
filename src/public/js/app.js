const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(message){
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
}

function handelMessageSubmit(event) {
    event.preventDefault();
    const msgInput = room.querySelector("input");
    const value = msgInput.value;
    socket.emit("new_message",msgInput.value, roomName, () => {
        addMessage(`You: ${value}`);
    });
    msgInput.value = "";
}

function showRoom(msg) {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
    const roomForm = room.querySelector("form");
    roomForm.addEventListener("submit", handelMessageSubmit);
}

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", input.value, showRoom);
    roomName = input.value;
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", () => {
    addMessage("Someone Joined :)");
});

socket.on("bye", () => {
    addMessage("Someone lefted :(");
});

socket.on("new_message", addMessage);