import Cookies from "js-cookie";
import * as signalR from "@microsoft/signalr";


const token = Cookies.get("token");

let connection ;

export const startConnection = () => {
  connection = new signalR.HubConnectionBuilder()
    .withUrl("https://zerobyte.localto.net/hubs/chat", {
      accessTokenFactory: () => token,
    })
    .withAutomaticReconnect()
    .build();

  return connection.start().then(() => connection);
};

export const onMessageReceived = (callback) => {
  connection.on("ReceiveMessage", callback);
};

export const sendMessage = (recipientId, message) => {
  return connection.invoke("SendMessage", recipientId, message);
};

export const stopConnection = () => {
  if (connection) {
    connection.stop();
  }
};
