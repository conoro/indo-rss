# Indo RSS
This Serverless function provides an RSS feed for requested news pages on the Irish Independent site.

## Installing and using
* Configure your AWS account
* Install Node.js 12+

```bash
git clone git@github.com:conoro/indo-rss.git
cd indo-rss
npm install -g serverless
npm install
serverless deploy
```
Then you access the RSS feed like so:

* https://url.of.serverless.function/dev/rss?page=https://www.independent.ie/sport/other-sports/athletics/


LICENSE Apache-2.0

Copyright Conor O'Neill 2020, conor@conoroneill.com
