pipeline {
    agent any

    stages {
        stage("SCM Checkout") {
            steps {
                git branch: 'main',
                url: 'https://github.com/Adhi-AWS/Azure-Angular.git'
            }
        }
    }
      stage('Build') {
      steps {
        nodejs(nodeJSInstallationName: 'nodejs-18.4.0') {
          sh "npm install"
        }
      }
    }
}
