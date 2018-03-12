const utils = require('utility');

function md5Pwd(pwd) {
    const salt = 'shgdy2ghjs73hj89f7erjkwe7832jhbb';
    return utils.md5(utils.md5(pwd + salt));
}

module.exports = {
    md5Pwd
}