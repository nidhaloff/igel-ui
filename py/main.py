import sys
import json
import time
from igel import Igel

arg = sys.argv[1]

payload = json.loads(arg)
print(f"Executing {payload['cmd']} command", flush=True)
print(f"path to the data \n {payload['data_path']}", flush=True)
#print(f"path to the yaml file \n {payload['yaml_path']}")

Igel(**payload)
sys.stdout.flush()