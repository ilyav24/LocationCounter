const cron = require("node-cron");
let shell = require("shelljs");

cron.schedule("0 * * ? * * ",function(){
    console.log("Scheduler running. . .");
    
});