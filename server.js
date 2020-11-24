const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/el-desquite-frontend'));
app.get('/*', function (_req, res) {
    res.sendFile(path.join(__dirname +
        '/dist/el-desquite-frontend/index.html'));
});
app.listen(process.env.PORT || 8080);
