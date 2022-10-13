from abc import ABCMeta, abstractmethod
from email import iterators
from psonic import *
import random  # TODO see if this can be removed
from os import path


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
        for i in self.modifiers:
            if (isinstance(i, Modifier)):  # input validation
                i.modify()


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
        return super().play()


class ForLoop(Block):  # should sleep be separated into its own block?
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
        sample(self.path, attack=self.attack, release=self.release,
               rate=self.rate, amp=self.amp, start=self.start, finish=self.finish)
        return super().play()
# Modifier child classes


class deltaSleeptime(Modifier):
    def __init__(self, delta):
        self.delta = delta

    def modify(self, block):
        if (isinstance(block, Sleep)):
            block.sleeptime += self.delta
        elif (isinstance(block, ForLoop)):
            block.sleep.sleeptime += self.delta
        return super().modify(block)


class deltaSample(Modifier):
    def __init__(self, rateDelta):
        self.rateDelta = rateDelta

    def modify(self, block):
        if (isinstance(block, Sample)):
            block.rate += self.rateDelta
        return super().modify(block)
