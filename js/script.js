
function sendToPython(arg) {
    var python = require('python-shell');
    var path = require('path')

    var pyPath = path.join(__dirname, 'py/')
    console.log("pypath => ", pyPath)
    var options = {
        scriptPath: pyPath,
        args: [arg]
    }
    
    var igel = python.PythonShell.run('main.py', options, (err, msg) => {
        if (err) throw err;
        console.log("msg : ", msg);
    });
  
  }

var dataPath = "";
var yamlPath = "";

function showDataPath() {
    var val = document.getElementById('data').files[0].path;
     console.log(val);
     dataPath = val;
     //sendToPython("hello python");
}
function showYamlPath() {
    var val = document.getElementById('yaml').files[0].path;
     console.log(val);
     yamlPath = val;
}

function send() {
    var cmd = document.getElementById('cmd').value;
    console.log("cmd: ", cmd);
    const payload = {
        cmd: cmd,
        data_path: dataPath,
        yaml_path: yamlPath
    }
    console.log(`payload: ${JSON.stringify(payload)}`);
    sendToPython(JSON.stringify(payload));
}