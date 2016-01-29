var casper = require('casper').create({
    verbose: true,
    logLevel: "info"
});
casper.options.viewportSize = {width: 1024, height: 768};

casper.on("remote.message", function(message) {
  this.echo("remote console.log: " + message);
});

casper.start('https://www.filipinocupid.com/en/auth/login?timeout&page=/en/mail/showInbox/00', function() {
    this.echo(this.getTitle());
    this.fill('form', {
        'Email':    'yzy0806@hotmail.com',
        'password':    'yichengsu1',
    }, true);
    casper.then(function(){
    	casper.evaluate(function(){
            console.log("Now I'm in the DOM!");
            console.log($(".subject .center-cell a[href]").length)
            console.log(JSON.stringify($(".subject .center-cell a[href]")[0]));
        });
    	casper.capture("../images/fc.png");
    });
});

casper.thenOpen('http://phantomjs.org', function() {
    this.echo(this.getTitle());
});

casper.run();
