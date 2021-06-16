const config = require('../../config'),
controller = require('../controller/index'),
rootPath = config.rootPath;
module.exports = (app) => {
    app.post(`${rootPath}/postzpprjscrum`, controller.postZpprjscrum);
    app.get(`${rootPath}/getscrumdetails`,controller.getScrumDetails);
    app.put(`${rootPath}/updatedetails`,controller.updateRecords);
}