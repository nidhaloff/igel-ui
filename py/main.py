import sys
import json
from igel import Igel

arg = sys.argv[1]

payload = json.loads(arg)
print(f"Executing {payload['cmd']} command")
print(f"path to the data \n {payload['data_path']}")
print(f"path to the yaml file \n {payload['yaml_path']}")

Igel(**payload)

sys.stdout.flush()