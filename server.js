const express = require('express');

const app = express();
let logs = [];

// Capture console logs
const originalLog = console.log;
const originalError = console.error;

console.log = (...args) => {
  const message = args.join(' ');
  logs.push({ type: 'log', message, timestamp: new Date().toLocaleTimeString() });
  if (logs.length > 500) logs.shift();
  originalLog(...args);
};

console.error = (...args) => {
  const message = args.join(' ');
  logs.push({ type: 'error', message, timestamp: new Date().toLocaleTimeString() });
  if (logs.length > 500) logs.shift();
  originalError(...args);
};

// Express routes
app.get('/', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Discord Bot Status</title>
      <style>
        body { font-family: monospace; background: #1e1e1e; color: #d4d4d4; padding: 20px; }
        #logs { background: #252526; padding: 15px; border-radius: 5px; height: 500px; overflow-y: auto; }
        .log { margin: 5px 0; }
        .log.error { color: #f48771; }
        .log.log { color: #90ee90; }
        .timestamp { color: #858585; margin-right: 10px; }
      </style>
      <script>
        setInterval(() => location.reload(), 2000);
      </script>
    </head>
    <body>
      <h1>Discord Bot - 24/7 Live Logs</h1>
      <div id="logs">
        ${logs.map(log => `<div class="log ${log.type}"><span class="timestamp">[${log.timestamp}]</span>${log.message}</div>`).join('')}
      </div>
    </body>
    </html>
  `;
  res.send(html);
});

const startServer = (port = 3000) => {
  app.listen(port, () => {
    console.log(`Express server running on http://localhost:${port}`);
  });
};

module.exports = { startServer };
