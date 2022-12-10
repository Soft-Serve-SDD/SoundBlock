#!/bin/bash
pkill npm
base="$(dirname "$BASH_SOURCE")"
touch "$base/example.txt"

echo "Preparing to run Sonic-Pi Frontend"
cd $base/src/frontend
npm install --force
echo "Running Sonic-Pi Frontend"
npm start &
cd ../backend
echo "Running Sonic-Pi Backend"
python3 main.py &
