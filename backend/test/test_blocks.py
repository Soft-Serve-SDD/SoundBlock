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
        capture_io_output = io.StringIO()
        sys.stdout = capture_io_output
        loopblock = Loop(10, 10, 1)
        loopblock.print()
        line_split = capture_io_output.getvalue().splitlines()
        if DEBUG:
            sys.stdout = sys.__stdout__
            print(capture_io_output.getvalue())
        self.assertTrue("Loop" in line_split[0])
        self.assertEqual(loopblock.sleep.sleeptime, 10)
        self.assertEqual(loopblock.iterations, 10)

    def testSubblockSample(self):
        capture_io_output = io.StringIO()
        sys.stdout = capture_io_output
        loopblock = Loop(10, 10, 1)
        loopblock.addsubblock(Sample(path=os.path.abspath('backend\samples\key_slime.wav')))
        loopblock.print()
        if DEBUG:
            sys.stdout = sys.__stdout__
            print(capture_io_output.getvalue())
        line_split = capture_io_output.getvalue().splitlines()
        self.assertTrue("Loop" in line_split[0])
        self.assertTrue("Sample" in line_split[1])

    def testSubblockLoop(self):
        capture_io_output = io.StringIO()
        sys.stdout = capture_io_output
        loopblock = Loop(10, 10, 1)
        loopblock2 = Loop(5, 5, 2)
        loopblock.addsubblock(loopblock2)
        loopblock.print()
        line_split = capture_io_output.getvalue().splitlines()
        if DEBUG:
            sys.stdout = sys.__stdout__
            print(capture_io_output.getvalue())
        self.assertTrue("Loop" in line_split[0])
        self.assertTrue("Loop" in line_split[1])


class TestSampleBlock(unittest.TestCase):
    def testSampleConstruction(self):
        capture_io_output = io.StringIO()
        sys.stdout = capture_io_output
        sampleblock = Sample(os.path.abspath('backend\samples\key_slime.wav'), 1, 2, 3, 4, 5, 6)
        sampleblock.print()
        line_split = capture_io_output.getvalue().splitlines()
        if DEBUG:
            sys.stdout = sys.__stdout__
            print(capture_io_output.getvalue())
        self.assertTrue("Sample" in line_split[0])
        self.assertEqual(sampleblock.path, os.path.abspath('backend/samples/key_slime.wav'))
        self.assertEqual(sampleblock.rate, 1)
        self.assertEqual(sampleblock.amp, 2)
        self.assertEqual(sampleblock.attack, 3)
        self.assertEqual(sampleblock.release, 4)
        self.assertEqual(sampleblock.start, 5)
        self.assertEqual(sampleblock.finish, 6)

    def testSampleModifierDeltaRate(self):
        capture_io_output = io.StringIO()
        sys.stdout = capture_io_output
        sampleblock = Sample(os.path.abspath('backend\samples\key_slime.wav'), 1, 2, 3, 4, 5, 6)
        modifier = DeltaRate(10)
        sampleblock.addmodifier(modifier)
        sampleblock.print()
        if DEBUG:
            sys.stdout = sys.__stdout__
            print(capture_io_output.getvalue())
        line_split = capture_io_output.getvalue().splitlines()
        self.assertTrue("Sample" in line_split[0])
        self.assertTrue("DeltaRate" in line_split[0])
        self.assertEqual(modifier.rateDelta, 10)

    def testSampleModifierDeltaFinish(self):
        capture_io_output = io.StringIO()
        sys.stdout = capture_io_output
        sampleblock = Sample(os.path.abspath('backend\samples\key_slime.wav'), 1, 2, 3, 4, 5, 6)
        modifier = DeltaFinish(10)
        sampleblock.addmodifier(modifier)
        sampleblock.print()
        if DEBUG:
            sys.stdout = sys.__stdout__
            print(capture_io_output.getvalue())
        line_split = capture_io_output.getvalue().splitlines()
        self.assertTrue("Sample" in line_split[0])
        self.assertTrue("DeltaFinish" in line_split[0])
        self.assertEqual(modifier.finishDelta, 10)
