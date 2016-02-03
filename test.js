function getLinks() {
    var links = document.querySelectorAll('.subject .center-cell a[href]');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href');
    });
};

var casper = require('casper').create({
    verbose: true,
    logLevel: "info"
});

casper.options.viewportSize = {width: 1024, height: 768};

casper.on("remote.message", function(message) {
  this.echo("remote console.log: " + message);
});

var allGirlUrls=[]

casper.start('https://www.filipinocupid.com/en/auth/login?timeout&page=/en/mail/showinbox/', function() {
    this.echo(this.getTitle());
    this.fill('form', {
        'Email':    'yzy0806@hotmail.com',
        'password':    'yichengsu1',
    }, true);

    this.waitFor(function check() {
        return (this.getCurrentUrl()==="http://www.filipinocupid.com/en/mail/showinbox/");
    });

    this.thenOpen('http://www.filipinocupid.com/en/mail/showinbox/?orderBy=1&page=100', function() {
        var first=this.getCurrentUrl().search('page=')+5;
        var number=parseInt(this.getCurrentUrl().substring(first));
        console.log("hey");
        console.log(number);
        console.log(first);
        console.log("yo");
        casper.capture("../images/fc1.png");
    });
});

casper.then(function(){
    allGirlUrls = this.evaluate(getLinks);
    casper.capture("../images/fc.png");
});

casper.run(function() {
    // echo results in some pretty fashion
    this.echo(allGirlUrls.length + ' links found:');
    this.echo(' - ' + allGirlUrls.join('\n - ')).exit();
});



