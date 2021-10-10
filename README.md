# WebsiteFinder-Node

Scans random IP's to  find backends of websites.
Very efficient.

# How it works?
1) It generates a random IP
2) Sends get request to IP
3) Run IPLookup on the IP
4) Take screenshot of website with puppeteer
5) Send screenshot to discord channel

# How to install
1) Download files
2) `npm init -y`
3) `npm i axios puppeteer discord.js@v12`

# How to run?
1) Open command prompt in the directory
2) Run `node .`
