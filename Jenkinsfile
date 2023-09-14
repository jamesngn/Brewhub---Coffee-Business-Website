//DOCKER:
//start service - build test
pipeline {
    agent any
    environment {
        registryCredential = 'ecr:ap-southeast-2:awscreds'
        appRegistry = '548137894424.dkr.ecr.ap-southeast-2.amazonaws.com/auth-service-server'
        brewhubRegistry = 'https://548137894424.dkr.ecr.ap-southeast-2.amazonaws.com'
    }
    stages {
        stage('Build Microservices Docker Image') {
            steps {
                script {
                    // Build Docker image for auth-service
                    dir('services/') {
                        authDockerImg = docker.build('auth-service-server', '-f Dockerfile.auth-server .')
                        orderDockerImg = docker.build('order-service-server', '-f Dockerfile.order-server .')
                        userDockerImg = docker.build('user-service-server', '-f Dockerfile.user-server .')
                        adminDockerImg = docker.build('admin-service-server', '-f Dockerfile.admin-server .') 

                        docker.build('auth-service-test', '-f Dockerfile.auth-test .')
                        docker.build('order-service-test', '-f Dockerfile.order-test .')
                        docker.build('user-service-test', '-f Dockerfile.user-test .')
                        docker.build('admin-service-test', '-f Dockerfile.admin-test .')
                    }
                }
            }
        }
        stage('Start Services') {
            steps {
                script {
                    //Start MongoDB
                    sh 'docker run -d --name mongodb --network mynetwork mongo:4'
                    
                    //Start auth-service
                    sh 'docker run -d --name auth-service-server -p 5054:5054 --network mynetwork auth-service-server'

                    //Start order-service
                    sh 'docker run -d --name order-service-server -p 5052:5052 --network mynetwork order-service-server'

                    //Start user-service
                    sh 'docker run -d --name user-service-server -p 5053:5053 --network mynetwork user-service-server'

                    //Start admin-service
                    sh 'docker run -d --name admin-service-server -p 5056:5056 --network mynetwork admin-service-server'
                }
            }
        }

        stage('Dump Test') {
            steps {
                sleep 5
                sh 'docker cp brewhub_db_2 mongodb:/'
                sh 'docker exec mongodb mongorestore --db brewhub_db /brewhub_db_2'
            }
        }
        
        stage('Run Unit Testing') {
            steps {
                script {
                    sh 'docker run --name auth-service-test --network mynetwork auth-service-test'
                    sh 'docker run --name order-service-test --network mynetwork order-service-test'
                    sh 'docker run --name user-service-test --network mynetwork user-service-test'
                    sh 'docker run --name admin-service-test --network mynetwork admin-service-test'
                }
            }
        }

        stage('Upload App Image') {
            steps {
                script {
                    docker.withRegistry(brewhubRegistry, registryCredential) {
                        authDockerImg.push("${env.BUILD_NUMBER}")
                        authDockerImg.push("latest")
                        orderDockerImg.push("${env.BUILD_NUMBER}")
                        orderDockerImg.push("latest")
                        userDockerImg.push("${env.BUILD_NUMBER}")
                        userDockerImg.push("latest")
                        adminDockerImg.push("${env.BUILD_NUMBER}")
                        adminDockerImg.push("latest")
                    }
                }
            }
        }
    }
    post {
        always {
            script {
                def authServiceContainer = sh(script: 'docker ps -q -f name=auth-service-server', returnStdout: true).trim()
                if (authServiceContainer) {
                    sh "docker stop $authServiceContainer"
                    sh "docker rm $authServiceContainer"
                }

                def orderServiceContainer = sh(script: 'docker ps -q -f name=order-service-server', returnStdout: true).trim()
                if (orderServiceContainer) {
                    sh "docker stop $orderServiceContainer"
                    sh "docker rm $orderServiceContainer"
                }

                def userServiceContainer = sh(script: 'docker ps -q -f name=user-service-server', returnStdout: true).trim()
                if (userServiceContainer) {
                    sh "docker stop $userServiceContainer"
                    sh "docker rm $userServiceContainer"
                }

                def adminServiceContainer = sh(script: 'docker ps -q -f name=admin-service-server', returnStdout: true).trim()
                if (adminServiceContainer) {
                    sh "docker stop $adminServiceContainer"
                    sh "docker rm $adminServiceContainer"
                }

                sh 'docker stop mongodb'
                sh 'docker rm mongodb'

                //Clear unit testing containers
                sh 'docker rm auth-service-test'
                sh 'docker rm order-service-test'
                sh 'docker rm user-service-test'
                sh 'docker rm admin-service-test'
            }
        }
    }
}
