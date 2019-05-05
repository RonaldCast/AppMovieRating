// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function test(browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;

    browser
      .url(devServer)
      .waitForElementVisible('#inspire', 9000)
      .assert.elementPresent('.list')
      .assert.elementPresent('.list .side_bar_link')
      .assert.elementPresent('.side_bar_link #home')
      .assert.elementPresent('.side_bar_link')
      .click('#drawer')
      .pause(2000)
      .click('#contact')
      .pause(2000)
      .assert.elementPresent('#inspire .contact')
      .assert.containsText('#inspire .contact h1', 'this is contact')
      .pause(2000)
      .click('#login_btn')
      .pause(2000)
      .assert.elementCount('input', 2)
      .setValue('input#email', 'ronald789@gmail.com')
      .setValue('input#password', '789')
      .pause(2000)
      .click('#login')
      .pause(2000)
      .click('.swal-button--confirm')
      .pause(2000)
      .assert.containsText('#user_email', 'RONALD789@GMAIL.COM')
      .click('#add_movie_link')
      .pause(3000)
      .assert.elementCount('input', 3)
      .assert.elementCount('textarea', 1)
      .setValue('input#name', 'Avengers: Infinity War')
      .setValue('textarea#description', '.....................')
      .click('.input-group__selections')
      .pause(2000)
      .click('.list a')
      .setValue('input#genre', 'Fantasy/Science fiction film')
      .click('#add_movie_btn')
      .pause(2000)
      .click('.swal-button--confirm')
      .pause(2000)
      .click('.headline:nth-child(1)')
      .pause(1000)
      .click('#logout_btn')
      .end();
  },
};
