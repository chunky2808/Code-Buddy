$(function() {

    //creating a web socket

    var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
    //agar https(secure) then use wss ,otherwise if http then use ws
    console.error(message)
    var chatsock = new ReconnectingWebSocket(ws_scheme + '://' + window.location.host + "/chat" + window.location.pathname);
    //reconnect issues bcoz of heroku 60 second timer
    
    //creating a web socket

    //function taking care when data recieved over web socket
    chatsock.onmessage = function(message) {
        var data = JSON.parse(message.data);
        //parsing message data
        var chat = $("#chat")
        var ele = $('<tr></tr>')

        //appending various info of chat (pulling data out of recieved message)
        ele.append(
            $("<td></td>").text(data.timestamp)
        )
        ele.append(
            $("<td></td>").text(data.handle)
        )
        ele.append(
            $("<td></td>").text(data.message)
        )
        //appending various info of chat(pullng data out of recieved message)
        chat.append(ele)
    };
    //function taking care of chat details


    //when chat form is submitted ,the relevent data is passed over websocket
    //created function to do the above action
    $("#chatform").on("submit", function(event) {
        var message = {
            handle: $('#handle').val(),
            message: $('#message').val(),
        }
        //sending data to web socket in JSON format
        chatsock.send(JSON.stringify(message));
        //sending data to web socket in JSON format

        $("#message").val('').focus();
        //focus used to point keyboard cursor on it
        return false;
    });
});