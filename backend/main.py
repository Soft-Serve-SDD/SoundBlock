# listen
from platform import release
from tracemalloc import start
from venv import create
import yaml
from block import *


def createBlock(type, thing):  # todo modifiers
    return_value = Block()
    if type == "start":
        return_value = Start()
    elif type == "sleep":
        sleeptime = thing.get("sleeptime")
        return_value = Sleep(sleeptime=sleeptime)
    elif type == "loop":
        sleeptime = thing.get("sleeptime")
        iterations = thing.get("iterations")
        return_value = Loop(sleeptime=sleeptime, iterations=iterations)
    elif type == "sample":
        path = thing.get("path")
        rate = thing.get("rate")
        amp = thing.get("amp")
        attack = thing.get("attack")
        release = thing.get("release")
        start = thing.get("start")
        finish = thing.get("finish")
        return_value = Sample(path=path, rate=rate, amp=amp,
                              attack=attack, release=release, start=start, finish=finish)
    else:
        print("ERROR: unexpected or unimplemented block type: ", type)
        return None
    if (thing.get("subblocks") != None):
        for i in thing["subblocks"]: #list of dicts
            for key in i:
                return_value.addSubBlock(createBlock(key, i[key]))
    return return_value


def readInput(input):
    # input (at least in sample) is list of some stupid object who actually likes python goddamnit
    for i in input:
        blocks = []
        for key in i:
            createBlock(key, i[key]).print()


def main():
    with open("stream/yaml_format_example.yaml", "r") as stream:
        try:
            input = yaml.safe_load(stream)
            readInput(input)

        except yaml.YAMLError as exc:
            print(exc)


if __name__ == '__main__':
    main()
