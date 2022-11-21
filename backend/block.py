from abc import ABCMeta, abstractmethod
from email import iterators
from psonic import *

def switch_slashes(s):
    if s is not None:
        return s.replace('\\', '/')
    return None

# Abstract Classes

class Block:
    __metaclass__ = ABCMeta

    def __init__(self):
        # blocks that can exist on their own (can be played)
        self.subBlocks = []
        self.modifiers = []  # blocks that cannot be played and act to modify the current Block

    # adds to sublock array if element to add is a block
    def addSubBlock(self, subBlock):
        if (isinstance(subBlock, Block)):  # input validation
            self.subBlocks.append(subBlock)
            return 1
        return 0

    def addModifier(self, modifier):
        if (isinstance(modifier, Modifier)):
            self.modifiers.append(modifier)
            return 1
        return 0

    @abstractmethod
    def play(self):
        for i in self.subBlocks:
            if (isinstance(i, Block)):  # input validation
                i.play()
        for m in self.modifiers:
            if (isinstance(m, Modifier)):  # input validation
                m.modify(self)
    
    def print(self, buffer = ""): #debug if blocks are working correctly
        print(buffer, self)
        for i in self.subBlocks:
            if (isinstance(i, Block)):
                i.print(buffer + " ") #todo modifiers


class Modifier:  # assuming all modifications will happen post block
    @abstractmethod
    def modify(self, block):
        pass

# Block child classes

class Sleep(Block):
    def __init__(self, sleeptime):
        super().__init__()
        self.sleeptime = sleeptime

    def play(self):
        sleep(self.sleeptime)
        return 1

class Start(Block): #everything will be a subblock of Start; would make recording easier
    def record(self, path):
        start_recording() #TODO recording; make sure this starts recording appropriately 
        self.play()
        stop_recording() #TODO recording; make sure this stops recording appropriately
        save_recording(path)

class Loop(Block):
    def __init__(self, sleeptime, iterations, interval=0):
        super().__init__()
        self.iterations = iterations
        self.sleep = Sleep(sleeptime)

    @in_thread
    def play(self):
        for i in range(self.iterations):
            super().play()
            self.sleep.play()


class Sample(Block):
    def __init__(self, path, rate=1, amp=1, attack=0, release=0, start=0, finish=1):
        super().__init__()
        self.path = switch_slashes(path)
        self.rate = rate
        self.amp = amp
        self.attack = attack
        self.release = release
        self.start = start
        self.finish = finish

    def play(self):
        print('playing sample ', self.path)
        sample(self.path, attack=self.attack, release=self.release,
               rate=self.rate, amp=self.amp, start=self.start, finish=self.finish)
        return super().play()

# Modifier child classes


class deltaSleeptime(Modifier):
    def __init__(self, delta):
        self.delta = delta

    def modify(self, block):
        if (isinstance(block, Sleep)):
            if (block.sleeptime + self.delta > 0):
                block.sleeptime += self.delta
        elif (isinstance(block, Loop)):
            if (block.sleep.sleeptime + self.delta > 0):
                block.sleep.sleeptime += self.delta
        return super().modify(block)


class deltaRate(Modifier):
    def __init__(self, rateDelta):
        self.rateDelta = rateDelta

    def modify(self, block):
        if (isinstance(block, Sample)):
            block.rate += self.rateDelta
        return super().modify(block)


class deltaFinish(Modifier):
    def __init__(self, finishDelta):
        self.finishDelta = finishDelta

    def modify(self, block):
        if (isinstance(block, Sample)):
            if (block.finish + self.finishDelta > 0 and block.finish + self.finishDelta < 1):
                block.finish += self.finishDelta
        return super().modify(block)

