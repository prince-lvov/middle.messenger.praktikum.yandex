import LoginPage from './LoginPage.js'

const { expect } = require('chai')

describe('Тест', function() {
  const page = LoginPage()
  console.log(page)
  it('есть заголовок авторизация', function() {
    // `expect()` takes in a parameter value and returns what Chai calls
    // a "chain"
    expect(sum(2, 4)).to.equal(6);
  });
});