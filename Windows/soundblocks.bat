@ECHO OFF
ECHO Preparing to run Soundblocks Frontend
cd ../frontend
start /b npm install
ECHO Running Soundblocks Frontend
start /b npm start
cd ..
cd backend
ECHO Running Soundblocks Backend
start /b python3 main.py
PAUSE