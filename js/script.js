
var path = require('path');
var fs = require('fs');


function getTrainingParams () {
    var trainDataPath = document.getElementById('train_data_path').files[0].path;
    var testSize = document.getElementById('test_size').value;
    var shuffle = document.getElementById('shuffle').checked;
    var missingValueOption = document.getElementById('missing-values').value;
    var encodingOption = document.getElementById('encoding').value;
    var scalingMethod = document.getElementById('scale').value;
    var scalingTarget = document.getElementById('scale-target').value;
    var modelType = document.getElementById('model-type').value;
    var algorithm = document.getElementById('algorithm').value;
    var target = document.getElementById('target').value;
    
    var datasetOptions = {
        type: "csv",
        split: {
            test_size: parseFloat(testSize),
            shuffle: shuffle
        },
        preprocess: {
            missing_values: missingValueOption,
            encoding: {type: encodingOption},
            scale: {
                method: scalingMethod,
                target: scalingTarget
            }
        }
    }

    var modelOptions = {
        type: modelType,
        algorithm: algorithm,

    }
    var trainingParams = JSON.stringify({
        dataset: datasetOptions,
        model: modelOptions,
        target: [target]
    }, null, 4);

    console.log(`training parameters: ${trainingParams}`);
    var currPath = path.join(__dirname, '../');
    console.log("path => ", currPath);

    fs.writeFile("test.json", trainingParams, function(err) {
        if (err) {
            console.log(err);
        }
    });

    const payload = {
        cmd: "fit",
        data_path: trainDataPath,
        yaml_path: currPath + "test.json"
    }
    //console.log(`payload: ${JSON.stringify(payload)}`);
    sendToPython(JSON.stringify(payload));

}

function getEvaluationParams () {
    console.log("getting eval params");
    let evalDataPath = document.getElementById('eval-data-path').files[0].path;
    let payload = {
        cmd: "evaluate",
        data_path: evalDataPath
    };
    console.log(`evaluation payload: ${JSON.stringify(payload)}`);
    sendToPython(JSON.stringify(payload));
}

function getPredictParams () {
    alert("getting prediction params");
    let predictDataPath = document.getElementById('pred-data-path').files[0].path;
    let payload = {
        cmd: "predict",
        data_path: predictDataPath
    };
    alert(`evaluation payload: ${JSON.stringify(payload)}`);
    sendToPython(JSON.stringify(payload));
}

function sendToPython(arg) {
    var python = require('python-shell');
    var path = require('path');

    var pyPath = path.join(__dirname, '..', 'py/')
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

