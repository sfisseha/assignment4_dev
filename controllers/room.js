// Controller handler to handle functionality in room page
const roomGenerator = require('../util/roomIdGenerator.js');
var Chatrooms = require('../database.js')
var moment= require('moment');

// Example for handle a get request at '/:roomName' endpoint.
function getRoom(request, response) {
  let name = request.params.roomName;
  let messages;
  Chatrooms.Chatroom.find({roomid:name}, (err, rooms) => {
    if (err) return handleError(err);
    if (rooms.length != 0) {
      messages = rooms[0].messages;
      messages = JSON.parse(JSON.stringify(messages));
      messages.forEach((message, i) => {
        messages[i].time = moment(message.time).local().format('YYYY-MM-DD HH:mm:ss');
      });
      response.render('room', {title: 'chatroom', roomName: request.params.roomName, newRoomId: roomGenerator.roomIdGenerator(), messagesList: messages});  

    } 
  });
}

function getMessages(request, response) {
  let name = request.params.roomName;
  Chatrooms.Chatroom.find({roomid:name}, (err, rooms) => {
    if (err) return handleError(err);
    const messages = rooms[0].messages;
    response.json(messages);
  });
}

function saveMessage(request, response){
  const name = request.params.roomName;   
  const nickname = request.body.nickname; 
  const message = request.body.message; 
  const time = moment().local().format('YYYY-MM-DD HH:mm:ss');
  Chatrooms.Chatroom.find({roomid: name}, (err, rooms) => {
    if (rooms.length > 0) {
      rooms[0].messages.push({
        nickname: nickname,
        body: message,
        time: time,
      });
      rooms[0].save();
      
      let url = "/" + request.params.roomName + "/messages";
      response.redirect(url);
    }
  });
}


module.exports = {
    getRoom, saveMessage, getMessages
};

