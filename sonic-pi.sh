pkill npm
echo "Preparing to run Sonic-Pi Frontend"
cd frontend
npm install
echo "Running Sonic-Pi Frontend"
npm start &
cd ../backend
echo "Running Sonic-Pi Backend"
python3 main.py &
