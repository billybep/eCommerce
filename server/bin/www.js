const http = require('http')
const app = require('../app')
const PORT = process.env.PORT || 3000


http
  .createServer(app)
  .listen(PORT, _=> console.log(`ECommers app running on http://localhost:${PORT}`))