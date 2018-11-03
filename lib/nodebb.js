module.exports = {
    "db": module.parent.parent.require('./database'),
    "async" : module.parent.parent.require('async'),
    "util": module.parent.parent.require('util'),
    "helpers" : module.parent.parent.require('./routes/helpers'),
    "fs" : module.parent.parent.require("fs"),
    "path": module.parent.parent.require("path"),
    "bjs": module.parent.parent.require("benchpressjs"),
    "winston": module.parent.parent.require("winston"),
    "nconf": module.parent.parent.require("nconf"),
    "controllerHelpers" : module.parent.parent.require("./controllers/helpers"),
    "express" : module.parent.parent.require("express"),
    "mkdirp" : module.parent.parent.require("mkdirp"),
}

