
function getTrainingParams() {
    var trainDataPath = document.getElementById('train_data_path').files[0].path;
    var testSize = document.getElementById('test_size').value;
    var shuffle = document.getElementById('shuffle').checked;
    var missingValueOption = document.getElementById('missing-values').value;
    console.log({
        trainDataPath,
        testSize,
        shuffle,
        missingValueOption
    });


}


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