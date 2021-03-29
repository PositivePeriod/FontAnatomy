const opentype = require("opentype.js");
const fs = require('fs');
const util = require('util')

async function loadFontFromUrl(url) {
    var font = await opentype.load(url);
    return font;
};

var fontName = 'a옛날사진관2.ttf';
var fontUrl = `public/data/${fontName}`;
loadFontFromUrl(fontUrl).then((font) => {
    // console.log(font);
    fs.writeFileSync(`./public/LoadFont/${fontName}.txt`, '\ufeff' + util.inspect(font), { encoding: 'utf8' });
});