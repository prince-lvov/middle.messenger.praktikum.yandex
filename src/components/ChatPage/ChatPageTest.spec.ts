// ./node_modules/.bin/mocha --require ts-node/register components/**/*.spec.ts
import { expect } from 'chai'

const chai = require('chai')
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('POST/ chats', () => {

    it('Unauthorized answer without sing-in', () => {

        let title = {
            'title': 'chat #1'
        }
        chai.request('https://ya-praktikum.tech/api/v2')
            .post('/chats')
            .set('content-type', 'application/json')
            .send(title)
            .end((err, res) => {
                res.should.have.status(401)
            })

    })

})