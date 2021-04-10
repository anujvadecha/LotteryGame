import time
import subprocess
import json


while True:
    cmd = open("scheduler.json", "r")
    subprocess.run(json.loads(cmd.read())["command"], shell=True)
    time.sleep(300)
