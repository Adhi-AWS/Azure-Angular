
node {
    
    stage('Codecheck')
           {
                git branch: 'main',
                url: 'https://github.com/Adhi-AWS/Azure-Angular.git'
           }
  
      stage('Install dependencies') {
        nodejs('nodejs') {
            sh 'npm install'
            echo "Modules installed"
        }
        
    }
    stage('Build') {
        nodejs('nodejs') {
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
        stage('SonarQube-Scan')
    {
        nodejs(nodeJSInstallationName: 'nodejs-18.4.0'){
        sh "npm run sonar"
    }
    }

}
