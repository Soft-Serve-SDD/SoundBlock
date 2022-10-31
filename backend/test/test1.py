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

def test1():
    set_server_parameter('127.0.0.1', 4557, 4559)
    loop1 = Loop(sleeptime=0.5, iterations=16)
    sample1 = Sample(path=os.path.abspath('backend\samples\key_slime.wav'))
    loop1.addSubBlock(sample1)
    modifier = deltaRate(rateDelta=0.5)
    modifier2 = deltaSleeptime(delta=-0.1)
    modifier3 = deltaFinish(finishDelta=-0.03)
    sample1.addModifier(modifier)
    sample1.addModifier(modifier3)
    loop1.addModifier(modifier2)

    start = Start()
    start.addSubBlock(loop1)
    start.play()

test1()
