#!/bin/bash
pkill npm
base="$(dirname "$BASH_SOURCE")" 

echo "Preparing to run Sonic-Pi Frontend"
cd $base/../frontend
npm install --force
echo "Running Sonic-Pi Frontend"
npm start &
cd ../backend
echo "Running Sonic-Pi Backend"
python3 main.py &
