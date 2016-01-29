casper.options.viewportSize = {width: 1024, height: 768};
var testCount = 2;
casper.test.begin("Testing Reddit", testCount, function redditTest(test) {
    casper.start("http://www.filipinocupid.com/en/mail/showinbox/?", function() {
    	//test.assertTitleMatch(/programming/, "Title is what we'd expect");
    	//Click "new link"
    	//casper.click("a[href*='/programming/new/']");
    casper.capture("../images/reddit-programming-new.png");

    }).run(function() {
        test.done();
    });
});