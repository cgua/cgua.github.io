const marked = require('marked');
const { join } = require('path');

const { getMeta } = require('./getMeta');

const { asyncReadFile, asyncWriteFile } = require('./api/asyncFs');

/**
 * 对文件进行处理，并获取文件信息
 * @param {string} outRoot 输出目录
 * @param {string} file    相对于起始目录的根目录
 * @returns {Promise<Map<string,string>>} 文件的相关信息
 */
const fileProcessor = async (outRoot, file) => {
    const outPath = join(outRoot, file)
        .replace(/\.md$/ui, '.html');

    const txt = await asyncReadFile(file);
    const meta = getMeta(txt);
    const mark = marked(txt);
    let temple = await asyncReadFile('./res/temple/index.html');

    temple = temple
        .replace('$title$', 'sinopia')
        .replace('$markdown$', mark);

    await asyncWriteFile(outPath, temple);

    return meta;
};

exports.fileProcessor = fileProcessor;
