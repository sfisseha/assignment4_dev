// Controller handler to handle functionality in home page
const roomGenerator = require('../util/roomIdGenerator.js');
var Chatrooms = require('../database.js')

// Example for handle a get request at '/' endpoint.
function createRoom(request, response){
  Chatrooms.Chatroom.find({}, (err, chatrooms) => {
        if (err) return handleError(err);
        result = JSON.stringify(chatrooms);
    });

  var newroomId= roomGenerator.roomIdGenerator();
  var newChatroom = new Chatrooms.Chatroom({
          roomid: newroomId,
          messages: []
  });

  newChatroom.save(function (err, chatroom) {
        if (err) return console.error(err);
        console.log(chatroom.roomid + " saved to chatroom collection.");
    });

  let newPage= "/" + newroomId
  response.redirect(newPage);
}

function getHome(request, response){
  Chatrooms.Chatroom.find(function (err, chatrooms) {
    if (err) return handleError(err);
    console.log(chatrooms)
    result = JSON.stringify(chatrooms);
    chatroomList= JSON.parse(result);
    response.render('home', {title: 'home', list: chatroomList});
  });
}

module.exports = {
    getHome, createRoom
};
