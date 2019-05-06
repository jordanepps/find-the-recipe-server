process.env.NODE_ENV = 'test';
process.env.JWT_SECRET =
	'9526DD0E61D1305FBFA33BBEDC3DA1ABCAEDBC2B3F609824AEB65EB1941221B3';
process.env.JWT_EXPIRY = '3m';
require('dotenv').config();
const { expect } = require('chai');
const supertest = require('supertest');

global.expect = expect;
global.supertest = supertest;
