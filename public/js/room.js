var x= window.matchMedia("(max-width: 900px)");
dynamicResize(x);
x.addListener(dynamicResize);
let url= window.location.href;
let roomName = url.substr(url.length - 6);

displayMessage();

function displayMessage(){
  fetch('/' + roomName + '/messages').then(res => res.json()).then(messages => {
    const messageBox = document.getElementById('allMessages');
  
    while(messageBox.firstChild){
        messageBox.removeChild(messageBox.firstChild);
    }

    for(var i=0; i< messages.length; i++){
          var newMessage= document.createElement('div');
          var nickname= document.createElement('div');
          nickname.setAttribute('style', 'font-size: 16px; margin-left: 3px');
          var text= document.createElement('p');
          text.setAttribute('style', 'font-weight: bold; margin-left: 20px;');
          var date= document.createElement('div');
          date.setAttribute('style', 'justify-content: right; margin-left: 400px; font-size: 13px;')

          newMessage.className = "eachMessage";

          nickname.appendChild(document.createTextNode(messages[i].nickname));
          text.appendChild(document.createTextNode(messages[i].body));
          date.appendChild(document.createTextNode(moment(messages[i].time,).format("MMMM Do YYYY, HH:mm:ss")));

          newMessage.appendChild(nickname)
          newMessage.appendChild(text);
          newMessage.appendChild(date);
          messageBox.appendChild(newMessage);
      }
  })
}

setInterval(() => {
  displayMessage();    
}, 3000);

document.getElementById('messageForm').addEventListener('submit', (event) => {  event.preventDefault();
  let nickname = document.getElementById("nicknameField").value;
  let text = document.getElementById("messageField").value;
  let date= document.getElementById("timeStamp").value;
  
  let formData = new FormData();
  formData.append('nickname', nickname);
  formData.append('message', text);
  formData.append('time', date);

  fetch("/" + roomName + "/messages", {
    method: 'post',
    body: JSON.stringify({
      nickname: nickname, 
      message: text,
      time: date,
    }),
    headers: {"Content-Type": "application/json"}
  })
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error:', error);
  });
});

function dynamicResize(){
    if(x.matches){
      document.getElementById("allMessages").style.fontSize= '20px';
    }else{
      document.getElementById("allMessages").style.fontSize= '15px';
    }
}
