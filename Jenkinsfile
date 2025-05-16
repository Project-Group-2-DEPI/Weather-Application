pipeline {
    agent any
    stages {

        stage('Build docker images ...') {
            steps {
                sh "echo Build docker images ... "

                dir('auth') {
                    sh "echo Build auth image ... "
                    sh "docker build -t aliahmed312/weatherapp-auth:V.$BUILD_NUMBER ."
                }

                dir('weather') {
                    sh "echo Build weather image ... "
                    sh "docker build -t aliahmed312/weatherapp-weather:V.$BUILD_NUMBER ."
                }

                dir('UI') {
                    sh "echo Build UI image ... "
                    sh "docker build -t aliahmed312/weatherapp-ui:V.$BUILD_NUMBER ."
                }
            }
        }

        stage('Push docker images ...') {
            steps {
                sh "echo Push images ... "

                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                    sh "docker login -u $USER -p $PASS"
                    sh "docker push aliahmed312/weatherapp-auth:V.$BUILD_NUMBER"
                    sh "docker push aliahmed312/weatherapp-weather:V.$BUILD_NUMBER"
                    sh "docker push aliahmed312/weatherapp-ui:V.$BUILD_NUMBER"
                }
            }
        }

        stage('Deployment ...') {
            steps {
                sh "echo Deployment ... "

                sh "sed -i 's|image: aliahmed312/weatherapp-auth:.*|image: aliahmed312/weatherapp-auth:V.$BUILD_NUMBER|g' k8s/auth/weatherauth-deployment.yaml"
                sh "sed -i 's|image:.*|image: aliahmed312/weatherapp-weather:V.$BUILD_NUMBER|g' k8s/weather/weather-deployment.yaml"
                sh "sed -i 's|image:.*|image: aliahmed312/weatherapp-ui:V.$BUILD_NUMBER|g' k8s/ui/weatherui-deployment.yaml"

                withCredentials([file(credentialsId: 'k8s', variable: 'k8s')]) {
                    sh "kubectl --kubeconfig=$k8s apply -f k8s/auth/weatherauth-deployment.yaml"
                    sh "kubectl --kubeconfig=$k8s apply -f k8s/weather/weather-deployment.yaml"
                    sh "kubectl --kubeconfig=$k8s apply -f k8s/ui/weatherui-deployment.yaml"
                }
            }

            post {
                success {
                    slackSend color: "good", message: "${BUILD_TAG} Was Successful"
                }
                failure {
                    slackSend color: "danger", message: "${BUILD_TAG} Was Failure"
                }
            }
            
        }

        
        stage('Ansible Deploy ...') {
            steps {
                sh "echo Deploy using Ansible ..."

                    withCredentials([sshUserPrivateKey(
                        credentialsId: 'ansible-ssh',
                        keyFileVariable: 'SSH_KEY',
                        passphraseVariable: 'KEY_SSH',
                        usernameVariable: 'USER'
                    )]) {
                        sh 'chmod 600 $SSH_KEY'
                        sh 'mkdir -p ~/.ssh'
                        sh 'ssh-keyscan 44.221.66.219 >> ~/.ssh/known_hosts'

                        // optional SSH connection test
                        sh 'ssh -i $SSH_KEY -o StrictHostKeyChecking=no $USER@44.221.66.219 echo connected'

                        sh '''
                            ansible-playbook -i Ansible/inventory Ansible/main.yml \
                            --private-key $SSH_KEY \
                            -u $USER \
                            -e build_number=V.$BUILD_NUMBER
                        '''
                    }
            }

            post {
                success {
                    slackSend color: "good", message: "${BUILD_TAG} - Ansible Deploy Successful"
                }
                failure {
                    slackSend color: "danger", message: "${BUILD_TAG} - Ansible Deploy Failed"
                }
            }
        }

    } 
} 
