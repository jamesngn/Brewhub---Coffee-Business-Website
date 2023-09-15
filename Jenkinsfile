//DOCKER:
//start service - build test
pipeline {
    agent any
    environment {
        awsCredentialId = 'awscreds'
        awsRegion = 'ap-southeast-2'
        registryCredential = 'ecr:ap-southeast-2:awscreds'
        appRegistry = '548137894424.dkr.ecr.ap-southeast-2.amazonaws.com/auth-service-server'
        brewhubRegistry = 'https://548137894424.dkr.ecr.ap-southeast-2.amazonaws.com'
    }
    stages {
        stage('Build Microservices Docker Image') {
            steps {
                script {
                    // Build Docker images
                    sh 'docker compose build'

                    dir('services/') {
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
                    sh 'docker compose up -d'                    
                }
            }
        }
        
        stage('Unit Testings') {
            steps {
                script {
                    sleep 5
                    sh 'docker cp brewhub_db_2 mongodb:/'
                    sh 'docker exec mongodb mongorestore --db brewhub_db /brewhub_db_2'

                    sh 'docker run --name auth-service-test --network brewhub_app_my-network auth-service-test'
                    sh 'docker run --name order-service-test --network brewhub_app_my-network order-service-test'
                    sh 'docker run --name user-service-test --network brewhub_app_my-network user-service-test'
                    sh 'docker run --name admin-service-test --network brewhub_app_my-network admin-service-test'
                }
            }
        }

        stage('Upload App Images to ECR') {
            steps {
                script {
                    withAWS(region: "${awsRegion}", credentials: "${awsCredentialId}") {
                        sh 'docker compose push'
                    }
                }
            }
        }

        // stage('Upload App Image') {
        //     steps {
        //         script {
        //             docker.withRegistry(brewhubRegistry, registryCredential) {
        //                 authDockerImg.push("${env.BUILD_NUMBER}")
        //                 authDockerImg.push("latest")
        //                 orderDockerImg.push("${env.BUILD_NUMBER}")
        //                 orderDockerImg.push("latest")
        //                 userDockerImg.push("${env.BUILD_NUMBER}")
        //                 userDockerImg.push("latest")
        //                 adminDockerImg.push("${env.BUILD_NUMBER}")
        //                 adminDockerImg.push("latest")
        //                 clientDockerImg.push("${env.BUILD_NUMBER}")
        //                 clientDockerImg.push("latest")
        //             }
        //         }
        //     }
        // }
    }
    post {
        always {
            script {
                // sh 'docker compose down'

                // sh 'docker stop mongodb'
                // sh 'docker rm mongodb'

                //Clear unit testing containers
                sh 'docker rm auth-service-test'
                sh 'docker rm order-service-test'
                sh 'docker rm user-service-test'
                sh 'docker rm admin-service-test'
            }
        }
    }
}
