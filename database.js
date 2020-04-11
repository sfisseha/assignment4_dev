const mongoose = require('mongoose');
const db = mongoose.connection;

db.on('error', console.error); // log any errors that occur

// bind a function to perform when the database has been opened
db.once('open', function() {
// perform any queries here, more on this later
  console.log("Connected to DB!");
});

// process is a global object referring to the system process running this
// code, when you press CTRL-C to stop Node, this closes the connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
  console.log('DB connection closed by Node process ending');
  process.exit(0);
  });
});

// you will replace this with your own url and fill in your password in the next step
const url = 'mongodb+srv://sfisseha:G3n3t!!!@cluster0-uovfg.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: true});

var chatroomSchema = new mongoose.Schema({
    roomid: String,
    messages: [{
        messageid: String,
        nickname: String,
        body: String,
        time: Date
    }]
});

var Chatroom = mongoose.model("chatroom", chatroomSchema);

module.exports= {
  Chatroom:Chatroom
};
