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
export USERNAME_MONGO=hmsteam3infosys
export PASSWORD_MONGO=5BQXsAkw3qRllD7y
export CLUSTER_MONGO=cluster0.ixtp3tq.mongodb.net
export REDIS_URI=rediss://red-cgvni00dh87jokt2kn50:2VXpkfwGVIQ2gnhrugOPPg9MH6PvDUwk@singapore-redis.render.com:6379
export DATABASE_NAME=HMS-T3

npm ci
npm start 
