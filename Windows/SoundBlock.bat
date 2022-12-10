@ECHO OFF
ECHO Preparing to run Sonic-Pi Frontend
cd ../frontend
start /b npm install
ECHO Running Sonic-Pi Frontend
start /b npm start
cd ..
cd backend
ECHO Running Sonic-Pi Backend
start /b python3 main.py
PAUSE