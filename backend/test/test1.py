""" old testing code

import sys
import os
sys.path.append(os.path.abspath('backend'))
from psonic import *
from block import *
import yaml

def read_yaml_file_to_dict(filename):
    with open(filename, 'r') as f:
        return yaml.load(f, Loader=yaml.FullLoader)

def yaml_read():
    print(read_yaml_file_to_dict('backend/yaml_format_example.yaml'))

def test_start_block():
    set_server_parameter('127.0.0.1', 4557, 4559)
    start = Start()
    sample1 = Sample(path=os.path.abspath('backend\samples\key_slime.wav'))
    start.addSubBlock(sample1)
    start.play()

def test_start_block_2():
    set_server_parameter('127.0.0.1', 4557, 4559)
    start = Start()
    sample1 = Sample(path=os.path.abspath('backend\samples\key_slime.wav'))
    loop1 = Loop(sleeptime=0.5, iterations=4)
    loop1.addSubBlock(sample1)
    start.addSubBlock(loop1)
    start.play()

def test_loop():
    set_server_parameter('127.0.0.1', 4557, 4559)
    loop1 = Loop(sleeptime=0.5, iterations=5)
    sample1 = Sample(path=os.path.abspath('backend\samples\key_slime.wav'))
    loop1.addSubBlock(sample1)
    loop1.play()

def test_deltaSleeptime():
    set_server_parameter('127.0.0.1', 4557, 4559)
    loop1 = Loop(sleeptime=0.5, iterations=5)
    sample1 = Sample(path=os.path.abspath('backend\samples\key_slime.wav'))
    loop1.addSubBlock(sample1)
    modifier = deltaSleeptime(delta=-0.1)
    loop1.addModifier(modifier)
    loop1.play()

def test_deltaRate():
    set_server_parameter('127.0.0.1', 4557, 4559)
    loop1 = Loop(sleeptime=0.5, iterations=4)
    sample1 = Sample(path=os.path.abspath('backend\samples\key_slime.wav'))
    loop1.addSubBlock(sample1)
    modifier = deltaRate(rateDelta=0.5)
    sample1.addModifier(modifier)
    loop1.play()


if __name__ == '__main__':
    test_start_block_2()
    test_loop()
    test_deltaSleeptime()
    test_deltaRate()


"""