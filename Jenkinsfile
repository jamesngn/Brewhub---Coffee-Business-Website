// pipeline {
//     agent any
//     tools {
//         nodejs 'NodeJS_14'
//     }
//     stages {
//         stage('Fetch code') {
//             steps {
//                 git branch: 'main', url: 'https://github.com/jamesngn/brewhub-app.git'
//             }
//             post {
//                 success {
//                     echo 'Fetch Code successfully'
//                 }
//             }
//         }
//         stage('Start MongoDB Server') {
//             steps {
//                 script {
//                     sh 'mongosh'
//                 }
//             }
//         }
//         stage('Start gRPC Server') {
//             steps {
//                 script {
//                     dir('./services/shared/') {
//                         sh 'npm install' // Clean and install Node.js modules
//                         sh 'npm rebuild' // Rebuild any binary modules
//                     }
//                     dir('./services/auth-service/') {
//                         sh 'npm install' // Clean and install Node.js modules
//                         sh 'npm rebuild' // Rebuild any binary modules
//                         sh 'npm start' // Start your server
//                     }
//                 }
//                 post {
//                     success {
//                         echo 'Start gRPC auth-service successfully'
//                     }
//                 }
//             }
//         }
//     }
// }

//DOCKER:
//start service - build test
pipeline {
    agent any

    stages {
        stage('Build auth-service Docker Image') {
            steps {
                script {
                    // Build Docker image for auth-service
                    dir('services/') {
                        docker.build('auth-service-server', '-f Dockerfile-server .')
                        docker.build('auth-service-test', '-f Dockerfile-test .')
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
                    
                }
            }
        }
        stage('Dump Test') {
            steps {
                sleep 10
                sh 'echo "Copy Dumped Data to Docker Container"'
                sh 'docker cp brewhub_db mongodb:/'
                sh 'echo "Restore Data in Docker Container"'
                sh 'docker exec mongodb mongorestore --drop /brewhub_db'
            }
        }
        
        stage('Run Unit Testing') {
            steps {
                //Run unit tests
                sh 'docker run -d --name auth-service-test --network mynetwork auth-service-test'
            }
        }
        // stage('Stop Services') {
        //     steps {
        //         script {
        //             //logs
        //             // sh 'docker logs mongodb'
        //             // sh 'docker logs auth-service'
        //             // // Stop auth-service
        //             // sh 'docker stop auth-service'
        //             // sh 'docker rm auth-service'
                    
        //             // // Stop MongoDB
        //             // sh 'docker stop mongodb'
        //             // sh 'docker rm mongodb'
        //         }
        //     }
        // }
    }
}
