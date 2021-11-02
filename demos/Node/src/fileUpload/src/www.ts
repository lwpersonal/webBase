import http from 'http';
import app from './app';

const port = process.env.PORT || 8000;
const server = http.createServer(app);

function onError(error: any) {
  console.error(error);
}
function onListening() {
  console.log('Listening on ' + port);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
