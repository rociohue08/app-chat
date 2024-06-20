// server.js
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Ruta para traer archivos estáticos desde la carpeta public
app.use(express.static('public'));

// conexiones de socket
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');
  io.emit('chat message', '¡Un nuevo usuario se ha conectado!');

  // Escuchar evento 'chat message'
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log(`Mensaje recibido: ${msg}`);
  });

  // desconexiones
  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
    io.emit('chat message', 'Un usuario se ha desconectado');
  });
});

// Inicia el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
