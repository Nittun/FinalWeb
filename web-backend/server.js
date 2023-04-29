const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const food = [
  { name: 'Pizza', price: 200 },
  { name: 'Burger', price: 150 },
  { name: 'Tacos', price: 60 },
  { name: 'Fries', price: 45 },
  { name: 'PadThai', price: 150 },
  { name: 'Graprao', price: 60 },
  { name: 'Tom Yum', price: 45 },
  { name: 'Ketchup Dog', price: 45 },

];

const drinks = [
  { name: 'Water', price: 7 },
  { name: 'Coke', price: 10 },
  { name: 'Fanta', price: 15 },
  { name: 'Tea', price: 20 },
]

const io = new Server({
  cors: {
    origin: "http://localhost:3000"
  }
});

io.listen(4000);

var confirmMenu = []

io.on('connection', (socket) => {
  socket.join('room1');
  socket.to('room1').emit('food', food);
  socket.to('room1').emit('drinks', drinks) 
  socket.to('room1').emit('menu', confirmMenu)
  console.log('Connected');
  socket.on('data' ,(menu) => {
    console.log(menu);
    confirmMenu = menu
    console.log("confirmMenu: " + JSON.stringify(confirmMenu))
    temp = true
  })
  socket.to('room1').emit('staffMenu', confirmMenu);

});





