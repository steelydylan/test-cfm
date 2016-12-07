var Nightmare = require('nightmare');
var assert = require("assert");
var fs = require('fs');
var pkg = require("./package.json");
require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
var textField = require("./fields/text.html");


describe('カスタムフィールドメーカーのテスト',function(){
  var nightMare = Nightmare(pkg.nightMare);

  it('ValidatorとConverterの動作確認',function(done){
      nightMare
      .goto(pkg.url)
      .type('[data-bind*="title"]', '講師名')
      .type('[data-bind*="name"]', 'teacher_name')
      .check('[data-bind*="openValidator"]')
      .check('[data-action*="showConverter"]')
      .click('[data-action*="addConverter(r)"]')
      .click('[data-action*="addConverter(n)"]')
      .click('[data-action*="addConverter(a)"]')
      .click('[data-action*="addConverter(s)"]')
      .click('[data-action*="addConverter(k)"]')
      .click('[data-action*="addConverter(h)"]')
      .click('[data-action*="addConverter(c)"]')
      .click('[data-action*="hiddenConverter"]')
      .check('[data-bind*="openValidator"]')
      .select('[data-bind="validator.0.option"]',"required")
      .type('[data-bind="validator.0.message"]',"値が入力されていません")
      .click('[data-action*="addValidator"]')
      .select('[data-bind="validator.1.option"]',"minLength")
      .type('[data-bind="validator.1.value"]',"10")
      .type('[data-bind="validator.1.message"]',"10文字以上の文字を入力してください")
      .check('[data-action*="toggleCss"]')
      .check('[data-bind*="noSearch"]')
      .click('[data-action*="submit"]')
      .evaluate(function () {
        return document.querySelector('.prettyprint').innerText.slice(0,-1);
      })
      .then(function (result) {
        assert.equal(result,textField);
        done();
      })
      .catch(function (error) {
        done(error);
      });
  });
})