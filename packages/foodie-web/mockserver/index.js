const http = require('http');
const connect = require('connect');
const mockserver = require('mockserver');
const corser = require('corser');

// mockserver.headers = ['Origin'];

const mock = connect();

const pathToMocks = 'mockserver/mocks';
const port = 4012;

// Apply middlewares
mock.use(corser.create({ // Deals with browser CORS preflight OPTIONS request
  methods: corser.simpleMethods.concat(['PATCH, PUT, DELETE, OPTIONS']),
  requestHeaders: corser.simpleRequestHeaders.concat(['Origin, X-Requested-With, Authorization'])
}));
mock.use(mockserver(pathToMocks));

// Start mock server
http.createServer(mock).listen(port, () => {
  console.log(`Mock server started and listening on port ${port}!`); // eslint-disable-line no-console
});