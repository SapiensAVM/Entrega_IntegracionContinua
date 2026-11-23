
pipeline {
    agent any

    stages {
        stage('1. Clonado del código') {
            steps {
                git branch: 'dev',
                    credentialsId: 'github-token',
                    url: 'https://github.com/SapiensAVM/Entrega_IntegracionContinua.git'
                sh 'git log -1 --oneline'
            }
        }

        stage('2. Dependencias y construcción (Build)') {
            steps {
                sh '''
                    docker compose config -q
                    docker compose build --no-cache
                '''
            }
        }

        stage('3. Despliegue y pruebas automatizadas') {
            steps {
                sh '''
                    docker compose up -d
                    sleep 10
                    docker compose ps
                    curl -f http://api_productos:3000/ || curl -f http://host.docker.internal:3000/
                '''
            }
        }

        stage('4. Revisión de logs') {
            steps {
                sh '''
                    docker logs --tail 25 api_productos
                    docker logs --tail 15 mysql_db
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completado exitosamente: código clonado, dependencias instaladas, contenedores activos y API verificada.'
        }
        failure {
            echo 'El pipeline falló. Revisa los logs en Console Output para diagnosticar el error.'
        }
        always {
            cleanWs()
        }
    }
}
