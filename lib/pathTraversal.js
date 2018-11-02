/* eslint-disable no-sync */
const fs = require('fs');
const joinPath = require('path').join;

/**
 * 遍历指定的目录
 * @param   {string}                   dir    要遍历的目录
 * @param   {traversalFileCallback}    fileCb 文件回调
 * @param   {traversalFolderCallback=} pathCb 目录回调
 * @returns {Promise<void>} 无
 * 
 * @callback traversalFileCallback   文件回调
 * @param   {string} file 文件目录
 * @returns {void} 无
 * 
 * @callback traversalFolderCallback 目录回调
 * @param   {string} folder 目录
 * @returns {void} 无
 */
async function traversal(dir, fileCb, pathCb) {
    const root = joinPath(dir, '');
    const dirs = [root];

    while (dirs.length > 0) {
        const currentPath = dirs.shift();
        const files = fs.readdirSync(currentPath);

        for (let currentFile of files) {
            currentFile = joinPath(currentPath, currentFile);
            const stat = fs.statSync(currentFile);

            if (stat.isFile()) {
                fileCb(currentFile.replace(root, ''));
            } else if (stat.isDirectory()) {
                dirs.push(currentFile);
                if (pathCb !== undefined) {
                    pathCb(currentFile.replace(root, ''));
                }
            } else {
                throw new Error('181101150517');
            }
        }
    }
}

exports.traversal = traversal;
