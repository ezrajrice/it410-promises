// http://james.darktech.org/api/grade/promises/ezrajrice/it410-promises
'use strict';
const fs = require('fs');
const path = require('path');

var resolvedPath = function (directoryPath, fileName) {
	var val = path.resolve(directoryPath, "./" + fileName);
	return val;
}

var readFile = function (file) {
	return new Promise(function (resolve, reject) {
		fs.readFile(file, 'utf8', (err, data) => {
			if (err) reject(err);
			else resolve(data);
		});
	});
}

var readDir = function (directoryPath) {
	return new Promise(function (resolve, reject) {
		fs.readdir(directoryPath, 'utf8', (err, data) => {
			if (err) reject(err);
			else resolve(data);
		});
	});
}

var readDirFiles = function (directoryPath) {
	var promise_files = readDir(directoryPath);
	return promise_files.then(function (fileNames) {
		var arr = [];
		for (var i = 0; i < fileNames.length; i++) {
			var file_path = resolvedPath(directoryPath, fileNames[i]);
			arr.push(readFile(file_path));
		}
		return Promise.all(arr);
	});
}

module.exports.resolvedPath = resolvedPath;
module.exports.readFile = readFile;
module.exports.readDir = readDir;
module.exports.readDirFiles = readDirFiles;

// Testing readDirFiles
// var file_directory = 'C:\\Users\\ezraj\\OneDrive\\Documents\\Masters Degree\\2017 Winter\\IT 410\\it410-promises\\files';
// var file_name = 'test1.txt';

// readDirFiles(file_directory)
// 	.then(function(value) {
// 		console.log(value);
// 	})