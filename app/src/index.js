let Config = require('./config');
let fetch = require('node-fetch');
let nodemailer = require('nodemailer');
let smtpTransport = require('nodemailer-smtp-transport');
let hbsMailer = require('nodemailer-express-handlebars');
let CronJob = require('cron').CronJob;

class Progress {
	constructor(url, recipient = 'owain.llew@gmail.com') {
		this.repoUrl = url;
		this.recipient = recipient;

		// Fetch Commits From Repository
		this.constructor.getCommits(this.repoUrl)
			.then(res => { return res.json() })
			.then(json => this._handleCommits(json));
	}

	_handleCommits(commits) {
		this.commits = commits;
		console.log(commits);
		if(this.commits.length > 0) {
			this._initialiseTransporter();
			// Send email via Transporter

			Config.default.mailOptions.context = {
				commits: commits
			}
			this._sendMail(Config.default.mailOptions);
		} else {
			console.log('no commits to report');
		}
	}

	_initialiseTransporter() {
		// Create Transporter and use handlebars templating engine
		this.transporter = this._createTransportMethod(Config.default.aws);
		this.transporter.use('compile', hbsMailer(Config.templating));

		return this.transporter;
	}

	_createTransportMethod(options) {
		return nodemailer.createTransport(options);
	}

	_sendMail(options) {
		// send mail with defined transport object
		this.transporter.sendMail(options, (error, info) => {
		    if (error) {
		        return console.log(error);
		    }
		    console.log('Message %s sent: %s', info.messageId, info.response);
		    this.transporter.close();
		});
	}
	static getCommits(url) {
		try {
			return fetch(Config.repo.url);
		} catch (err) {
			console.log(err);
			return err;
		}
	}
}

let job = new CronJob({
  cronTime: '*/5 * * * *',
  onTick: function() {
	let progress = new Progress({url: Config.repo, recipent: 'owain.llew@gmail.com'});
  },
  start: true,
  timeZone: 'America/New_York'
});

job.start();
