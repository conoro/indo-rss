// Indo RSS - Copyright Conor O'Neill 2020, conor@conoroneill.com
// LICENSE Apache-2.0
// Invoke like https://url.of.serverless.function/dev/rss?page=https://www.independent.ie/sport/other-sports/athletics/

module.exports.check = (event, context, callback) => {
  var request = require("request");
  var cheerio = require("cheerio");
  var RSS = require("rss");
  var sectionURL = event.query.page;

  var feed = new RSS({
    title: "Indo RSS",
    description: "Return latest stories from specific Irish Independent news pages",
    feed_url: "http://example.com/rss.xml",
    site_url: sectionURL,
    image_url: "https://cdn-01.independent.ie/static/f3105530f7c91bb62317d8976a5029579cb67dd0/img/favicon-independent.ico",
    docs: "http://example.com/rss/docs.html",
    managingEditor: "conor@conoroneill.com",
    webMaster: "conor@conoroneill.com",
    copyright: "2020 Conor ONeill",
    language: "en",
    pubDate: "Jan 01, 2020 06:00:00 GMT",
    ttl: "60"
  });

  request(sectionURL, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      $("article.w29").each(function () {
        var img = $(this).find("img").attr("data-src");
        var link = $(this).find("a").attr("href");;
        var title = $(this).find("h2").text() || "No Indo Title";
        var currentDate = new Date();
        var description = '<img src="' + img + '" alt="' + title + '" />';
        feed.item({
          title: title,
          description: description,
          url: link,
          author: "The Indo",
          date: currentDate
        });
      });
      var xml = feed.xml();
      context.succeed(xml);
    }
  });
};