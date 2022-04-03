import "reflect-metadata";
import app from "./app";
var debug = require("debug")("socketio-s:s");
import * as http from "http";
import socketServer from "./socket";

var port = normalizePort(process.env.PORT || "9000");
app.set("port", port);

var s = http.createServer(app);

s.listen(port);
s.on("error", onError);
s.on("listening", onListening);

const io = socketServer(s);

function normalizePort(aNumber) {
  var port = parseInt(aNumber, 10);

  if (isNaN(port)) {
  
    return aNumber;
  }

  if (port >= 0) {
  
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var stickTo = typeof port === "string" ? "Pipe " + port : "Port " + port;
  console.error(stickTo);

  }

function onListening() {
  var location = s.address();
  var stickTo = typeof location === "string" ? "pipe " + location : "port " + location.port;
  debug("Listening on " + stickTo);

  console.log("s Port: ", port);
}
