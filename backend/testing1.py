# This works for sonic pi 2.11, running python on windows cmd, this works for me:
#   set_server_parameter('127.0.0.1',4557,4559)
# For sonic pi 4.2 maybe this can work? but havent gotten it running,
# the commands show up in "cues" in sonic pi but not sure what that really means. 
# it is in the docs what cues are but I dont understand     -Julian
#   set_server_parameter('128.113.147.129',4560)
# pip install python-sonic


from psonic import *
import random 
import os


set_server_parameter('127.0.0.1',4557,4559)

def switch_slashes(s):
    return s.replace('\\','/')

class ForLoop:
    def __init__(self, sleeptime=1, iterations=1, sleepstep=0):
        self.blocks = []
        self.sleeptime = sleeptime
        self.iterations = iterations
        self.sleepstep = sleepstep

    def add_block(self, sample):
        self.blocks.append(sample)

    def add_sleeptime(self, sleeptime):
        self.sleeptime += sleeptime
        if sleeptime < 0:
            self.sleeptime = 0
    
    def play(self):
        for i in range(self.iterations):
            for b in self.blocks:
                b.play()
            self.add_sleeptime(self.sleepstep)
            sleep(self.sleeptime)

class Sample:
    def __init__(self, path, rate=1, ratestep=0, amp=1, attack=0, release=0, start=0, finish=1):
        self.path = switch_slashes(path)
        self.rate = rate
        self.ratestep = ratestep
        self.amp = amp
        self.attack = attack
        self.release = release
        self.start = start
        self.finish = finish

    def add_rate(self, rate):
        self.rate += rate

    def play(self):
        self.add_rate(self.ratestep)
        sample(self.path, attack=self.attack, release=self.release, rate=self.rate, amp=self.amp, start=self.start, finish=self.finish)

class Sleep:
    def __init__(self, sleeptime=1, sleepstep=0):
        self.sleeptime = sleeptime
        self.sleepstep = sleepstep

    def add_sleeptime(self, sleeptime):
        was = self.sleeptime
        self.sleeptime += sleeptime
        if self.sleeptime < 0:
            self.sleeptime = was

    def play(self):
        self.add_sleeptime(self.sleepstep)
        sleep(self.sleeptime)

class Workspace:
    def __init__(self):
        self.loops = []

    def add_loop(self, loop):
        self.loops.append(loop)

    def play(self):
        for b in self.loops:
            b.play()


loop1 = ForLoop(sleeptime=0, iterations=6, sleepstep=0)
for path in os.listdir('backend/samples'):
    path = os.path.abspath('backend/samples/' + path)
    loop1.add_block(Sample(path, rate=4, ratestep=-0.5))
    loop1.add_block(Sleep(sleeptime=0.2, sleepstep=-0.03))

workspace = Workspace()
workspace.add_loop(loop1)
workspace.play()
