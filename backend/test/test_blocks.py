import unittest
import io
import sys
import os
from psonic import *
from block.block import *
import yaml

DEBUG = False

"""run: python3 -m unittest discover 
in the backend directory"""
class TestLoopBlock(unittest.TestCase):
    def testLoopConstruction(self):
        capture_IO_output = io.StringIO()
        sys.stdout = capture_IO_output
        loopBlock = Loop(10,10,1)
        loopBlock.print()
        line_split = capture_IO_output.getvalue().splitlines()
        if DEBUG:
            sys.stdout = sys.__stdout__
            print(capture_IO_output.getvalue())
        self.assertTrue("Loop" in line_split[0])
        self.assertEqual(loopBlock.sleep.sleeptime, 10)
        self.assertEqual(loopBlock.iterations, 10)
        

    def testSubblockSample(self):
        capture_IO_output = io.StringIO()
        sys.stdout = capture_IO_output
        loopBlock = Loop(10,10,1)
        loopBlock.addSubBlock(Sample(path=os.path.abspath('backend\samples\key_slime.wav')))
        loopBlock.print()
        if DEBUG:
            sys.stdout = sys.__stdout__
            print(capture_IO_output.getvalue())
        line_split = capture_IO_output.getvalue().splitlines()
        self.assertTrue("Loop" in line_split[0])
        self.assertTrue("Sample" in line_split[1])
    
    def testSubblockLoop(self):
        capture_IO_output = io.StringIO()
        sys.stdout = capture_IO_output
        loopBlock = Loop(10,10,1)
        loopBlock2 = Loop(5,5,2)
        loopBlock.addSubBlock(loopBlock2)
        loopBlock.print()
        line_split = capture_IO_output.getvalue().splitlines()
        if DEBUG:
            sys.stdout = sys.__stdout__
            print(capture_IO_output.getvalue())
        self.assertTrue("Loop" in line_split[0])
        self.assertTrue("Loop" in line_split[1])

class TestSampleBlock(unittest.TestCase):
    def testSampleConstruction(self):
        capture_IO_output = io.StringIO()
        sys.stdout = capture_IO_output
        sampleBlock = Sample(os.path.abspath('backend\samples\key_slime.wav'),1,2,3,4,5,6)
        sampleBlock.print()
        line_split = capture_IO_output.getvalue().splitlines()
        if DEBUG:
            sys.stdout = sys.__stdout__
            print(capture_IO_output.getvalue())
        self.assertTrue("Sample" in line_split[0])
        self.assertEqual(sampleBlock.path, os.path.abspath('backend/samples/key_slime.wav'))
        self.assertEqual(sampleBlock.rate, 1)
        self.assertEqual(sampleBlock.amp, 2)
        self.assertEqual(sampleBlock.attack, 3)
        self.assertEqual(sampleBlock.release, 4)
        self.assertEqual(sampleBlock.start, 5)
        self.assertEqual(sampleBlock.finish, 6)

    def testSampleModifierDeltaRate(self):
        capture_IO_output = io.StringIO()
        sys.stdout = capture_IO_output
        sampleBlock = Sample(os.path.abspath('backend\samples\key_slime.wav'),1,2,3,4,5,6)
        modifier = deltaRate(10)
        sampleBlock.addModifier(modifier)
        sampleBlock.print()
        if DEBUG:
            sys.stdout = sys.__stdout__
            print(capture_IO_output.getvalue())
        line_split = capture_IO_output.getvalue().splitlines()
        self.assertTrue("Sample" in line_split[0])
        self.assertTrue("deltaRate" in line_split[0])
        self.assertEqual(modifier.rateDelta, 10)

    def testSampleModifierDeltaFinish(self):
        capture_IO_output = io.StringIO()
        sys.stdout = capture_IO_output
        sampleBlock = Sample(os.path.abspath('backend\samples\key_slime.wav'),1,2,3,4,5,6)
        modifier = deltaFinish(10)
        sampleBlock.addModifier(modifier)
        sampleBlock.print()
        if DEBUG:
            sys.stdout = sys.__stdout__
            print(capture_IO_output.getvalue())
        line_split = capture_IO_output.getvalue().splitlines()
        self.assertTrue("Sample" in line_split[0])
        self.assertTrue("deltaFinish" in line_split[0])
        self.assertEqual(modifier.finishDelta, 10)