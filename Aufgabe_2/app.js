var fs = require('fs');
var promise = require('promise');
var chalk = require('chalk');
var obj = [];
var obj2 = [];
var together = [];

var promise1 = new Promise(function (resolve, reject) {
    fs.readFile("staedte.json", function (err, dat) {
        if (err) {            
            reject(err);
        }
        else {            
            resolve(JSON.parse(dat));
        }
        return promise2 = new Promise(function (resolve2, reject2) {
            fs.readFile("mehr_staedte.json", function (err2, dat2) {
                if (err2) {
                    reject2(err2);
                }
                else {
                    resolve2(JSON.parse(dat2));
                }
            });
        });
    });
});

promise1.then(function (result) {
    obj = result;
}).then(function (result) {
    promise2.then(function (result2) {
        obj2 = result2;
    }).then(function (result2) {
        together = obj.cities.concat(obj2.cities);
        for (var i = 0; i < together.length; i++) {
            console.log(chalk.yellow.bold(together[i].name));
            console.log(chalk.blue.bold(together[i].country));
            console.log(chalk.red.bold(together[i].population));
            console.log("----------------------");
        }
    }).catch(function (err2) {
        console.log("fehler2");
    });

}).catch(function (err) {
    console.log("fehler");
});
