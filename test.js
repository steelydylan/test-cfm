var Nightmare = require('nightmare');
var chai = require('chai')
var expect = chai.expect;
var fs = require('fs');
var pkg = require("./package.json");
require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
var textField = require("./fields/text.html");



describe('test text field',function(){
  var nightMare = Nightmare(pkg.nightMare);

  it('should equal to text.html',function(done){
      nightMare
      .goto(pkg.url)
      .type('[data-bind*="title"]', '講師名')
      .type('[data-bind*="name"]', 'teacher_name')
      .click('[data-action*="historyClear"]')
      .check('[data-action*="toggleCss"]')
      .click('[data-action*="submit"]')
      .evaluate(function () {
        return document.querySelector('.prettyprint').innerText.slice(0,-1);
      })
      .then(function (result) {
        expect(result).to.equal(textField);
        done();
      })
      .catch(function (error) {
        console.error('Search failed:', error)
      });
  });
})