
node {
    
    stage('Codecheck')
           {
                git branch: 'main',
                url: 'https://github.com/Adhi-AWS/Azure-Angular.git'
           }
  
      stage('Install dependencies') {
            nodejs(nodeJSInstallationName: 'nodejs-18.4.0'){
            sh 'npm install'
            echo "Modules installed"
        }
        
    }
    stage('Build') {
        nodejs(nodeJSInstallationName: 'nodejs-18.4.0') {
            sh 'npm run build'
            echo "Build completed"
        }
        
    }
//     stage('Build')
//     {
//         nodejs(nodeJSInstallationName: 'nodejs-18.4.0'){
//         sh "npm install"
//     }
//     }
      steps {
        dir("sonarconfig") {
            git branch: 'main',
            url: 'https://github.com/Adhi-AWS/Azure-Angular.git'
        }
      }
    }
    stage('SonarQube-Scan') {
      steps {
        nodejs(nodeJSInstallationName: 'nodejs-18.4.0') {
          sh "mv sonarconfig/angular/sonar-project.js ."
          sh "npm run sonar"
        }
      }
    }
