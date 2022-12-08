# listen
from platform import release
from tracemalloc import start
from venv import create
import yaml
from block.block import *
import os
import time

YAML_FILENAME = "stream/music.yaml"

def createBlock(type, thing):  # todo modifiers
    return_value = Block()
    print("type: ", type)
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
        path = os.path.abspath("samples/" + path)
        rate = thing.get("rate")
        amp = thing.get("amp")
        attack = thing.get("attack")
        release = thing.get("release")
        start = thing.get("start")
        finish = thing.get("finish")
        deltarate = thing.get("deltarate")
        return_value = Sample(path=path, rate=rate, amp=amp,
                              attack=attack, release=release, start=start, finish=finish)
        return_value.addModifier(deltaRate(deltarate))
    else:
        print("ERROR: unexpected or unimplemented block type: ", type)
        return None
    if (thing.get("subblocks") != None):
        for i in thing["subblocks"]: #list of dicts
            for key in i:
                return_value.addSubBlock(createBlock(key, i[key]))
    return return_value


def readInput(input):
    blocks = []
    export_filename = None
    newblock = None
    for i in input:
        for key in i:
            print("key: ", key)
            if(key != "export"):
                newblock = createBlock(key, i[key])
            else:
                export_filename = i[key]+".wav"
                print("export_wav = ", export_filename)
            if newblock != None:
                blocks.append(newblock)
    return blocks, export_filename

def run():
    from threading import Thread
    set_server_parameter('127.0.0.1', 4557, 4559)
    blocks = []
    with open(YAML_FILENAME, "r") as stream:
        try:
            input = yaml.safe_load(stream)
            blocks, export_path = readInput(input)
        except yaml.YAMLError as exc:
            print(exc)
    
    if(export_path != None):
        start_recording()
    for block in blocks:
        block_thread = Thread(target=block.play)
        block_thread.start()
    if(export_path != None):
        sleep(10)
        stop_recording()
        dir = "../recordings/"
        export_path = dir + export_path
        export_path = os.path.abspath(export_path)
        print("export_path = ", export_path)
        save_recording(export_path)

def detect_changes():
    # detects changes in YAML_FILENAME, and calls run if there are any
    while True:
        old_time = os.path.getmtime(YAML_FILENAME)
        time.sleep(0.1)
        new_time = os.path.getmtime(YAML_FILENAME)
        if (new_time != old_time):
            run()


if __name__ == '__main__':
    detect_changes()
