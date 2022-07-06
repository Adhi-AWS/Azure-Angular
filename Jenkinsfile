
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

    stage('SonarQube-Scan') {
      steps {
//         nodejs(nodeJSInstallationName: 'nodejs-18.4.0') 
        {
          sh "mv sonarconfig/angular/sonar-project.js ."
          sh "npm run sonar"
        }
      }
    }
}
