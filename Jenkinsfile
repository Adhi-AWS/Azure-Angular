pipeline {
    agent any
    
  stage('Codecheck')
           {
                git branch: 'main',
                url: 'https://github.com/Adhi-AWS/Azure-Angular.git'
           }
    stage('Build')
    {
        nodejs(nodeJSInstallationName: 'nodejs-18.4.0'){
        sh "npm install"
    }
    }
