const path = require('path');

module.exports = {
    allowedDevOrigins: ['diplom'],
    images: {
        qualities: [75, 100],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'app')],
    },
};