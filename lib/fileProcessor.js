const marked = require('marked');
const fs = require('fs');
const path = require('path');

const { getMeta } = require('./getMeta');

const asyncReadFile = fs.promises.readFile;
const asyncWriteFile = fs.promises.writeFile;
const joinPath = path.join;

/**
 * 对文件进行处理，并获取文件信息
 * @param {string} root 起始目录
 * @param {string} file 相对于起始目录的根目录
 * @returns {Promise<Map<string,string>>} 文件的相关信息
 */
const fileProcessor = async (root, file) => {
    const outRoot = './_pub';
    const filePath = joinPath(root, file);
    const outPath = joinPath(outRoot, file)
        .replace(/\.md$/ui, '.html');
    const utf8 = { encoding: 'utf8' };

    const txt = await asyncReadFile(filePath, utf8);
    const meta = getMeta(txt);
    const mark = marked(txt);
    let temple = await asyncReadFile('./res/temple/index.html', utf8);

    temple = temple
        .replace('$title$', 'sinopia')
        .replace('$markdown$', mark);

    await asyncWriteFile(outPath, temple, utf8);

    return meta;
};

exports.fileProcessor = fileProcessor;
