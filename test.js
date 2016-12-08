var Nightmare = require('nightmare')
var assert = require('assert')
var fs = require('fs')
var path = require('path')
var pkg = require('./package.json')
require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8')
}
var nightmare = Nightmare({
    webPreferences  : {
    partition : 'nopersist',
    preload:path.resolve('preload.js')
  },
  show: true
});

describe('カスタムフィールドのテスト',function(){
  it('ValidatorとConverterの動作確認',function(done){
      nightmare.goto(pkg.url)
      .click('[data-action*="historyClear"]')
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
        assert.equal(result,require("./fields/text.html"));
        done();
      })
      .catch(function (error) {
        done(error);
      });
  });

  it('セレクトボタン,ラジオボタン,チェックボックスの動作確認',function(done){
      nightmare
      .click('[data-action*="refresh"]')
      .click('[data-action*="historyClear"]')
      .select('[data-bind*="type"]','select')
      .type('[data-bind*="title"]', '都道府県')
      .type('[data-bind*="name"]', 'prefecture')
      .select('[data-bind*="optionFormat"]','pref')
      .click('[data-action*="addOption"]')
      .check('[data-action*="toggleCss"]')
      .click('[data-action*="submit"]')
      .select('[data-bind*="type"]','option')
      .click('[data-action*="submit"]')
      .select('[data-bind*="type"]','checkbox')
      .click('[data-action*="submit"]')
      .evaluate(function () {
        return document.querySelector('.prettyprint').innerText.slice(0,-1);
      })
      .then(function (result) {
        assert.equal(result,require("./fields/select.html"));
        done();
      })
      .catch(function (error) {
        done(error);
      });
  });

  it('画像fieldの生成',function(done){
      nightmare
      .click('[data-action*="refresh"]')
      .click('[data-action*="historyClear"]')
      .select('[data-bind*="type"]','image')
      .type('[data-bind*="title"]', '講師の画像')
      .type('[data-bind*="name"]', 'teacher_img')
      .select('[data-bind*="normal"]','width')
      .type('[data-bind*="normalSize"]', '100')
      .type('[data-bind*="tiny"]', 'width')
      .type('[data-bind*="tinySize"]', '50')
      .type('[data-bind*="large"]', 'width')
      .check('[data-bind*="alt"]')
      .type('[data-bind*="largeSize"]', '200')
      .type('[data-bind*="square"]', 'width')
      .type('[data-bind*="squareSize"]', '400')
      .check('[data-bind*="resize"]')
      .check('[data-action*="toggleCss"]')
      .click('[data-action*="submit"]')
      .evaluate(function () {
        return document.querySelector('.prettyprint').innerText.slice(0,-1);
      })
      .then(function (result) {
        assert.equal(result,require("./fields/img.html"));
        done();
      })
      .catch(function (error) {
        done(error);
      });
  });
})