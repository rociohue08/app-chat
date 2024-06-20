
// Conectar con el servidor de Socket.IO
const socket = io();

// Enviar mensaje al servidor
const form = document.getElementById('form');
const input = document.getElementById('input');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
});

// Función para agregar mensajes al DOM
function addMessage(msg, className) {
  const item = document.createElement('li');
  item.textContent = msg;
  if (className) {
    item.classList.add(className);
  }
  document.getElementById('messages').appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
}

// Escuchar mensajes de chat
socket.on('chat message', (msg) => {
  addMessage(msg);
});

