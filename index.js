// http://james.darktech.org/api/grade/promises/ezrajrice/it410-promises
'use strict';
const fs = require('fs');
const path = require('path');

var resolvedPath = function (directoryPath, fileName) {
	return new Promise(function (resolve, reject) {
		var val = path.resolve(directoryPath, "./" + fileName);
		resolve(val);
	});
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
	return new Promise(function (resolve, reject) {
		fs.readdir(directoryPath, 'utf8', (err, data) => {
			if (err) reject(err);
			else {
				var contents = [];
				for (var file in data) {
					fs.readFile(file, 'utf8', (err2, data2) => {
						if (err2) reject(err2);
						else contents.append(data2);
					});
				}
				resolve(contents);
			}
		});
	});
}

module.exports.resolvedPath = resolvedPath;
module.exports.readFile = readFile;
module.exports.readDir = readDir;
module.exports.readDirFiles = readDirFiles;
