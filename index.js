'use strict';
const fs = require('fs');
const path = require('path');

function resolvedPath (directoryPath, fileName) {
	return new Promise(function (resolve, reject) {
		var val = path.resolve(directoryPath, '.' + fileName);
		resolve(val);
	});
}

function readFile (file) {
	return new Promise(function (resolve, reject) {
		fs.readFile(file, 'utf8', (err, data) => {
			if (err) reject(err);
			else resolve(data);
		});
	});
}

function readDir (directoryPath) {
	return new Promise(function (resolve, reject) {
		fs.readdir(directoryPath, 'utf8', (err, data) => {
			if (err) reject(err);
			else resolve(data);
		});
	});
}

function readDirFiles (directoryPath) {
	return new Promise(function (resolve, reject) {
		fs.readdir(directoryPath, 'utf8', (err, data) => {
			if (err) reject(err);
			else {
				var contents = [];
				for file in data {
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
