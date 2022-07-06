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
}
