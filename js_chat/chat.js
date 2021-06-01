const sendBtn = document.getElementById("sendBtn");
const timeWhite = document.getElementById("time-white");
const timeGreen = document.getElementById("time-green");
const inputMessage = document.getElementById("inputMessage");

let isMySelf = true;

function createMessageBox() {
  const messageBox = document.createElement("div");

  if (isMySelf) {
    messageBox.classList.add("box-right");
  } else {
    messageBox.classList.add("box-left");
  }

  return messageBox;
}

function createMessage(messageText) {
  const message = document.createElement("p");

  message.textContent = messageText;

  message.classList.add("message-box");
  if (isMySelf) {
    message.classList.add("green");
  } else {
    message.classList.add("white");
  }
  return message;
}

inputMessage.addEventListener("keydown", function (e) {
  if (e.isComposing === true) {
    return;
  } else {
    if (e.key === "Enter") {
      const messageText = inputMessage.value;
      if (messageText === "") {
        return;
      }

      const messageBox = createMessageBox();

      const message = createMessage(messageText);

      messageBox.appendChild(message);

      const room = document.getElementById("room");
      room.appendChild(messageBox);

      inputMessage.value = "";
      if (isMySelf) {
        isMySelf = false;
      } else {
        isMySelf = true;
      }
    }
  }
});

sendBtn.addEventListener("click", function () {
  const messageText = inputMessage.value;
  if (messageText === "") {
    return;
  }

  const messageBox = createMessageBox();

  const message = createMessage(messageText);

  messageBox.appendChild(message);

  const room = document.getElementById("room");
  room.appendChild(messageBox);

  inputMessage.value = "";
  if (isMySelf) {
    isMySelf = false;
  } else {
    isMySelf = true;
  }
});
