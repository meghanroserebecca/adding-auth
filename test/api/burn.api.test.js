const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const childProcess = require('child_process');
const assert = chai.assert;

// const app = require('../../lib/app');
// const mongoose = require('mongoose');

// const connection = require('../../lib/connection');

// describe('burner API', () => {
//     before(() => mongoose.connection.dropDatabase());

//     const request = chai.request(app);

//     let patrick
// });