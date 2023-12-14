const socket = io();

const welcome = document.getElementById("welcome");
const roomForm = welcome.querySelector("#roomname");
const room = document.getElementById("room");
const nameForm = welcome.querySelector("#name");
const nameeditBtn = room.querySelector("#nameedit");
const nameeditForm = room.querySelector("#name1");

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
    const msgInput = room.querySelector("#msg input");
    const value = msgInput.value;
    socket.emit("new_message",msgInput.value, roomName, () => {
        addMessage(`You: ${value}`);
    });
    msgInput.value = "";
}

function behindForm() {
    nameForm.hidden = true;
}
function handelNameSubmit(event) {
    event.preventDefault();
    const nameInput = welcome.querySelector("#name input");
    socket.emit("nickname", nameInput.value, behindNameForm);
    nameInput.value = "";
}
function behindNameEditForm(){
    nameeditForm.hidden = true;
}
function handelEditNameSubmit(event) {
    event.preventDefault();
    const nameInput = room.querySelector("#name1 input");
    socket.emit("nickname", nameInput.value, behindNameEditForm);
    nameInput.value = "";
}
function shownameEdit() {
    nameeditForm.hidden = false;
    nameeditForm.addEventListener("submit",handelEditNameSubmit);
}
function showRoom(msg) {
    welcome.hidden = true;
    room.hidden = false;
    nameeditForm.hidden = true;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
    const msgForm = room.querySelector("#msg");
    msgForm.addEventListener("submit", handelMessageSubmit);
    nameeditBtn.addEventListener("click", shownameEdit);
}

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = roomForm.querySelector("input");
    socket.emit("enter_room", input.value, showRoom);
    roomName = input.value;
    input.value = "";
}

roomForm.addEventListener("submit", handleRoomSubmit);
nameForm.addEventListener("submit", handelNameSubmit);

socket.on("welcome", (user) => {
    addMessage(`${user} arrived :)`);
});

socket.on("bye", (left) => {
    addMessage(`${left} left :(`);
});

socket.on("new_message", addMessage);

socket.on("room_change", (rooms) => {
    const roomlist = welcome.querySelector("ul");
    roomlist.innerHTML = "";
    if (rooms.lenth === 0) {
        return;
    }
    rooms.forEach((room) => {
        const li = document.createElement("li");
        li.innerText = room;
        roomlist.append(li);
    });
});