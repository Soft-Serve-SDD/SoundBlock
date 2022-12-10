# SoundBlock

Soundblock is a block-based interface for Sonic Pi, a music programming language. 
Similar to scratch, it allows the user to write non-code code, using loop blocks 
and music blocks to do so. Soundblock provides music lovers a way to make sounds differently, 
but without the steep learning curve of coding.

### Instructions to download

Our backend depends on Sonic Pi v2.11.0  
The download link can be found here:  https://github.com/sonic-pi-net/sonic-pi/releases/tag/v2.11.0

NOTE: Please read our conventions here contributing: https://github.com/Soft-Serve-SDD/SoundBlock/blob/dev/coding_standards.md

#### Developer instructions 1 : making changes
1. Clone this repo: `https://github.com/Soft-Serve-SDD/SoundBlock`
2. Open up two terminals
3. `cd` into the repo directory
4. In one terminal, run the frontend
```
cd frontend
npm install    % This only needs to be run once for every update
npm start
```
5. In another terminal, run the backend.
```
cd backend
python main.py
```

Note: For there be sound, Sonic Pi needs to be running in the background. 

#### Instructions 2 : Running application 
We should have a `bat` and `sh` file. This runs the above commands 2-5 for you. Double click on `sonic-pi`.
