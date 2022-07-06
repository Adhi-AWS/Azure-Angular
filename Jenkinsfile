
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
      stage('Build') {
        nodejs(nodeJSInstallationName: 'nodejs-18.4.0') {
            sh 'npm run build'
            echo "Build completed"
        }
      }

}
