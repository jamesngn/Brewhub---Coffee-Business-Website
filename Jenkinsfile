//DOCKER:
//start service - build test
pipeline {
    agent any

    stages {
        stage('Build Microservices Docker Image') {
            steps {
                script {
                    // Build Docker image for auth-service
                    dir('services/') {
                        docker.build('auth-service-server', '-f Dockerfile-auth-server .')
                        docker.build('order-service-server', '-f Dockerfile-order-server .')
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
                    
                }
            }
        }
        stage('Dump Test') {
            steps {
                sleep 5
                sh 'docker cp brewhub_db mongodb:/'
                sh 'docker exec  mongodb mongorestore --db brewhub_db /brewhub_db'
            }
        }
        
        stage('Run Unit Testing') {
            steps {
                script {
                    dir('services/') {
                        // Run unit tests
                        docker.build('auth-service-test', '-f Dockerfile-test .')
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

                sh 'docker stop mongodb'
                sh 'docker rm mongodb'
            }
        }
    }
}
