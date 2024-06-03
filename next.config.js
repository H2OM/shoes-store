/** @type {import('next').NextConfig} */
const path = require('path');
 
module.exports = {
    // output: 'export',
    // assetPrefix: '/node/',
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        prependData: `@import "./app/scss/common/_Vars.scss";`
    }
}
