# This works for sonic pi 2.11, running python on windows cmd, this works for me:
#   set_server_parameter('127.0.0.1',4557,4559)
# For sonic pi 4.2 maybe this can work? but havent gotten it running,
# the commands show up in "cues" in sonic pi but not sure what that really means. 
# it is in the docs what cues are but I dont understand     -Julian
#   set_server_parameter('128.113.147.129',4560)


# pip install python-sonic
from psonic import *
import random

set_server_parameter('127.0.0.1',4557,4559)


for i in range(10):
    play(random.choice([60,62,64,65,67,69,71,72]), release=0.1)
    sleep(0.1)
