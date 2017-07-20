module.exports = {
	default: {
		mailOptions: {
			from: "owain@selostudios.com",
			to: "owain@selostudios.com",
			subject: "Digest Report",
			template: 'daily-digest'
		},
		aws: {
			host: 'email-smtp.us-east-1.amazonaws.com',
			port: 465,
			secure: true,
			auth: {
				user: 'AKIAI62DORRPAONTXLAQ',
				pass: 'An5HLnpc2ICrQoVx7CyE6yVvqb0gOciWXWuRXrN+LP8q'
			}
		}

	},
	repo: {
		url: "https://api.github.com/repos/owzzz/Progress/commits"
	},
	templating: {
		viewEngine: {
        	extname: '.hbs',
        	layoutsDir: 'templates/layouts/',
        	defaultLayout : 'main',
        	partialsDir : 'templates/partials/'
    	},
		viewPath: 'templates/views',
		extName: '.hbs'
	}
}

