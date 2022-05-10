pipeline {
  environment {
    imagename = "bytesw/bytebot-html"
    url = "http://192.168.27.148:5000"
    tag_name = "192.168.27.148:5000"
    credentials = "admin-docker-hub"
    dockerImage = ''
    PACKAGE_VERSION = '2.5.0'
  }
  agent any
  parameters {
    string(defaultValue: 'no', description: 'Ejecuta los procesos docker', name: 'include_docker')
  }
  stages {
    stage('Install') {
      steps {
          echo "Branch is ${env.BRANCH_NAME}..."
          nodejs(nodeJSInstallationName: 'NodeJS13', configId: '77600a18-f968-4cca-83e4-a9f76d165336') {
              sh 'PACKAGE_VERSION=$(node -p -e "require(\'./package.json\').version")'
              sh 'npm config ls'
              sh 'npm install'
              sh 'npm i -D typescript@3.4.3'
          }
      }
    }

    stage('Test') {
      parallel {
        stage('Static code analysis') {
            steps {
              nodejs(nodeJSInstallationName: 'NodeJS13', configId: '77600a18-f968-4cca-83e4-a9f76d165336') {
                sh 'npm run-script lint'
              }
            }
        }
      }
    }
    stage('Build') {
      steps {
        nodejs(nodeJSInstallationName: 'NodeJS13', configId: '77600a18-f968-4cca-83e4-a9f76d165336') {
          sh 'ng build'
        }
      }
    }
    stage('Build Docker Image') {
      when {
        expression { params.include_docker == 'yes' }
      }
      steps {
        nodejs(nodeJSInstallationName: 'NodeJS13', configId: '77600a18-f968-4cca-83e4-a9f76d165336') {
          sh 'PACKAGE_VERSION=$(node -p -e "require(\'./package.json\').version")'
        }
        script {
          dockerImage = docker.build imagename
        }
      }
    }
    stage('Deploy Image') {
      when {
        expression { params.include_docker == 'yes' }
      }
      steps{
        script {
          docker.withRegistry(url, credentials ) {
            dockerImage.push("$PACKAGE_VERSION")
            dockerImage.push('latest')
          }
        }
      }
    }
    stage('Remove Unused docker image') {
      when {
        expression { params.include_docker == 'yes' }
      }
      steps{
        sh "docker rmi $tag_name/$imagename:$PACKAGE_VERSION"
        sh "docker rmi $tag_name/$imagename:latest"
      }
    }
  }
  post {

    always {
        echo 'Confirmación de ejecución!'

        emailext body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}\n More info at: ${env.BUILD_URL}",
            recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
            subject: "Jenkins Build ${currentBuild.currentResult}: Job ${env.JOB_NAME}",
            to: '$DEFAULT_RECIPIENTS'

    }
  }
}
