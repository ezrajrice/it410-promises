// http://james.darktech.org/api/grade/promises/ezrajrice/it410-promises
'use strict';
const fs = require('fs');
const path = require('path');

export function resolvedPath (directoryPath, fileName) {
	return new Promise(function (resolve, reject) {
		var val = path.resolve(directoryPath, fileName);
		resolve(val);
	});
}

export function readFile (file) {
	return new Promise(function (resolve, reject) {
		fs.readFile(file, 'utf8', (err, data) => {
			if (err) reject(err);
			else resolve(data);
		});
	});
}

export function readDir (directoryPath) {
	return new Promise(function (resolve, reject) {
		fs.readdir(directoryPath, 'utf8', (err, data) => {
			if (err) reject(err);
			else resolve(data);
		});
	});
}

export function readDirFiles (directoryPath) {
	return new Promise(function (resolve, reject) {
		fs.readdir(directoryPath, 'utf8', (err, data) => {
			if (err) reject(err);
			else {
				var contents = [];
				for (file in data) {
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

// tests
// const directory_path = 'C:\\Users\\ezraj\\OneDrive\\Documents\\Masters Degree\\2017 Winter\\IT 410\\it410-promises\\files';
// const fileName = 'test1.txt';

// var test_one = function (directoryPath, fileName) {
// 	var p = resolvedPath(directoryPath, fileName);
// 	p.then(function(value) {
// 		console.log('Testing resolvedPath: ' + value);
// 	})
// 	.catch(function(err) {
// 		console.error(err.stack);
// 	});
// }

// test_one(directory_path, fileName);
