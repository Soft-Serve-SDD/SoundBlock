from abc import ABCMeta, abstractmethod
from email import iterators
from psonic import *
import random  # TODO see if this can be removed
import os


def switch_slashes(s):
    return s.replace('\\', '/')

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
            # for m in self.modifiers:
            #     if (isinstance(m, Modifier)):  # input validation
            #         m.modify(i)
        for m in self.modifiers:
            if (isinstance(m, Modifier)):  # input validation
                m.modify(self)
        


class Modifier:  # assuming all modifications will happen post block
    @abstractmethod
    def modify(self, block):
        pass

# Block child classes


class Sleep(Block):
    def __init__(self, sleeptime):
        self.sleeptime = sleeptime

    def play(self):
        sleep(self.sleeptime)
        return 1


class Loop(Block):
    def __init__(self, sleeptime, iterations):
        super().__init__()
        self.iterations = iterations
        self.sleep = Sleep(sleeptime)

    def play(self):
        for i in range(self.iterations):
            super().play()
            self.sleep.play()


class Sample(Block):
    def __init__(self, path, rate=1, amp=1, attack=0, release=0, start=0, finish=1):
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
        return 1

# Modifier child classes


class deltaSleeptime(Modifier):
    def __init__(self, delta):
        self.delta = delta

    def modify(self, block):
        if (isinstance(block, Sleep)):
            if (block.sleeptime + self.delta > 0):
                block.sleeptime += self.delta
        elif (isinstance(block, Loop)):
            block.sleep.sleeptime += self.delta
        return super().modify(block)


class deltaSample(Modifier):
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


if __name__ == "__main__":
    set_server_parameter('127.0.0.1', 4557, 4559)
    loop1 = Loop(sleeptime=0.01, iterations=16)
    sample1 = Sample(path=os.path.abspath('backend\samples\key_slime.wav'))
    loop1.addSubBlock(sample1)
    modifier = deltaSample(rateDelta=0.5)
    modifier2 = deltaSleeptime(delta=1)
    modifier2 = deltaFinish(finishDelta=-0.03)
    sample1.addModifier(modifier)
    loop1.addModifier(modifier2)
    loop1.play()
