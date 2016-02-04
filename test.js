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
var lastPage;
var lastPageUrl;

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
        lastPageUrl=this.getCurrentUrl().search('page=')+5;
        lastPage=parseInt(this.getCurrentUrl().substring(lastPageUrl));
        console.log("hey");
        console.log(lastPage);
        console.log(lastPageUrl);
        console.log("yo");
        casper.capture("../images/fc1.png");
    });

    casper.then(function() {
    for(var i=lastPage;i>0;i--){
        var url = 'http://www.filipinocupid.com/en/mail/showinbox/?orderBy=1&page='+i;
        this.thenOpen(url);
        this.then(function(){
            allGirlUrls = allGirlUrls.concat(this.evaluate(getLinks));
            this.capture("../images/fc.png");
        });
    }
    });
});

casper.run(function() {
    // echo results in some pretty fashion
    this.echo(allGirlUrls.length + ' links found:');
    this.echo(' - ' + allGirlUrls.join('\n - ')).exit();
});



