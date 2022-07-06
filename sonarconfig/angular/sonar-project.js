
const sonarqubeScanner = require('sonarqube-scanner');

sonarqubeScanner({
  serverUrl: 'http://65.0.42.18:9000/',
       options : {
	'sonar.projectDescription': 'This is a Angular application',
	'sonar.projectName': 'Jenkins-Angular',
	'sonar.projectKey':'Jenkins-Angular',
	'sonar.login': 'sqp_3a6655c68f498bbe02d15865b2546b2465090be9',
      	'sonar.projectVersion':'1.0',
	'sonar.language':'js',
      	'sonar.sourceEncoding':'UTF-8',
      	'sonar.sources': '.',
	'sonar.dependencyCheck.jsonReportPath': './dependency-check-report.json',
	'sonar.dependencyCheck.xmlReportPath': './dependency-check-report.xml',
	'sonar.dependencyCheck.htmlReportPath': './dependency-check-report.html'
       },
}, () => {});
