#!/bin/bash

echo "Node Server of HMS-T3-Backend"
# Get the PID listening on port 3000
pid=$(lsof -t -i :3000)

# If PID exists, kill the process
if [ -n "$pid" ]; then
  echo "Killing process with PID $pid"
  kill $pid
else
  echo "No process listening on port 3000"
fi


export PORT=3000
npm ci
npm start --port 3000
