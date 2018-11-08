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
const fileProcess = async (outRoot, file) => {

    // todo 更完善的替换规则
    const outFile = file.replace(/\w+[\/\\]/, '');
    const outPath = join(outRoot, outFile)
        .replace(/\.md$/ui, '.txt');

    const txt = await asyncReadFile(file);
    const meta = getMeta(txt, file);
    const mark = marked(txt);

    await asyncWriteFile(outPath, mark);

    // let temple = await asyncReadFile('./res/temple/index.html');

    // temple = temple
    //     .replace('$title$', 'sinopia')
    //     .replace('$markdown$', mark);

    // await asyncWriteFile(outPath, temple);

    return meta;
};

exports.fileProcess = fileProcess;
