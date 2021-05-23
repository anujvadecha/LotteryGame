import time
import subprocess
import json

#
# while True:
#     cmd = open("scheduler.json", "r")
#     subprocess.run(json.loads(cmd.read())["command"], shell=True)
#     time.sleep(30)


from GameMasterApp.assign_task import assign_lottery_timings

while True:
    assign_lottery_timings()
    time.sleep(30)
