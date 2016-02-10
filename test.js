function getLinks() {
    var links = document.querySelectorAll('.subject .center-cell a[href]');
    return Array.prototype.map.call(links, function(e) {
        if(e.getAttribute('href').search('amid')==-1){
            return e.getAttribute('href');
        }
    });
};

function getName(){
    var name=document.querySelector('strong.profilehdg').innerHTML.slice(0,-5);
    return name;
}

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
        casper.capture("../images/fc1.png");
    });

    casper.then(function() {
    for(var i=lastPage;i>0;i--){
        var url = 'http://www.filipinocupid.com/en/mail/showinbox/?orderBy=1&page='+i;
        this.thenOpen(url);
        this.then(function(){
            allGirlUrls = allGirlUrls.concat(this.evaluate(getLinks));
        });
    }
    });

    casper.then(function(){
        for(var i=0;i<allGirlUrls.length;i++){
            var girlUrl ='http://www.filipinocupid.com'+allGirlUrls[i];
            this.thenOpen(girlUrl);
            this.then(function(){
                var girlName=this.evaluate(getName);
                var message= "Dear beautiful"+girlName+
                "\n I really like you and would like to know you more. Would you like to add me on Skype?. My username is yingz12."+ 
                "\n Thank you "+ "\nLeo "
                this.echo(message);
                this.echo(girlUrl);
                this.fill('form#emailreplyform', {
                    'subject':    'default_5',
                    'body':    message
                }, true);
            })
            this.capture("../images/fc.png");                
        }
    })

});

casper.run(function() {
    // echo results in some pretty fashion
    this.echo(allGirlUrls.length + ' links found:');
    this.echo(' - ' + allGirlUrls.join('\n - ')).exit();
});



