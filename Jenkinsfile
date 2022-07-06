
node {
    
    stage('Codecheck')
           {
                git branch: 'main',
                url: 'https://github.com/Adhi-AWS/Azure-Angular.git'
           }
  
      stage('Install dependencies') {
            nodejs(nodeJSInstallationName: 'nodejs-18.4.0'){
            sh 'npm install --legacy-peer-deps'
            echo "Modules installed"
        }
      }
      stage('OWASP Dependency-Check Vulnerabilities') {
      steps {
        nodejs(nodeJSInstallationName: 'nodejs-18.4.0') {
          sh "npm install -D owasp-dependency-check"
          dependencycheck additionalArguments: '--project jenkins-nodejs-demo --scan ./ --out ./ --format ALL  --disableYarnAudit', odcInstallation: 'dependencycheck'

          dependencyCheckPublisher pattern: 'dependency-check-report.xml'

          archiveArtifacts allowEmptyArchive: true,
            artifacts: 'dependency-check-report.*',
            onlyIfSuccessful: true
        }
      }
    }


}
