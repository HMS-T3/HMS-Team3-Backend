#!/bin/bash

echo "Node Server of HMS-T3-Backend"
# Get the PID listening on port 
port=3000
pid=$(lsof -t -i :$port)

# If PID exists, kill the process
if [ -n "$pid" ]; then
  echo "Killing process with PID $pid"
  kill $pid
else
  echo "No process listening on port $port"
fi

echo "Setting environment variables..."
export PORT=$port
export USERNAME_MONGO=hmsteam3infosys
export PASSWORD_MONGO=5BQXsAkw3qRllD7y
export CLUSTER_MONGO=cluster0.ixtp3tq.mongodb.net
export REDIS_URI=rediss://red-cgvni00dh87jokt2kn50:2VXpkfwGVIQ2gnhrugOPPg9MH6PvDUwk@singapore-redis.render.com:6379
export DATABASE_NAME=HMS-T3
export EMAIL_CLIENTID=732795250733-rantu7j4crmnh63dpv232il3es4gg55l.apps.googleusercontent.com
export EMAIL_SECRET=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
export EMAIL_REFRESH_TOKEN=1//04F2VieCvcHqLCgYIARAAGAQSNwF-L9IrdrscU40yHJXNo1djaHu5bm4ZatjhUuulGoeZRPKp41YRs1ykdNw_kBelMt2nabvfYdY
export REDIRECT_URI=https://developers.google.com/oauthplayground
export EMAIL=hmsteam3.infosys@gmail.com
export CLOUDINARY_CLOUD_NAME=dujgzpuyd
export CLOUDINARY_API_KEY=743952579349265
export CLOUDINARY_API_SECRET=Alry7NIIg38maYjOAwzL5AIsIts

# adding commiting files
echo "Adding files to git..."
git add .
git commit -m "Added by Script"

echo "Commit Hash"
git rev-parse HEAD

echo "The total number of commits"
git rev-list --count HEAD

echo "Total Number of Code Lines"
git ls-files | xargs wc -l



# add gitignore file
echo "Adding .gitignore file..."
rm -rf .gitignore
touch .gitignore
echo "/node_modules" >> .gitignore
echo "/.env" >> .gitignore
echo "/run.sh" >> .gitignore
echo "/.DS_Store" >> .gitignore

echo "Starting server..."
echo "Node Version"
node -v
echo "NPM Version"
npm -v

# Install dependencies
rm -rf node_modules
npm ci
npm ls
npm start
npm test
