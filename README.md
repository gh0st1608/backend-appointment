> **Requerimientos**:
 - Instalar AWS Cli v2.15.48 y Python/3.11.8
 - Instalar Docker y Docker-compose v2.26.1
 - Instalar Node Js v22.21.0
 - Instalar Serverless Framework v4.27.0

 ## Deploy Local (Offline)
 0. Clonar el repositorio

 ## Configuracion AWS
 1. Ejecutar `aws configure --profile NOMBRE_DEL_PERFIL` donde "NOMBRE_DEL_PERFIL" es el perfil de despliegue con localstack.
 2. Ingresar las credenciales respectivas : 
    - access_key
    - secret_key
    - region
    - ouput format

## Pasos para la infrastructura: 
1. Ubicarse en la raiz del proyecto y ejecutar `serverless deploy --stage dev`, en caso de querer eliminar los servicios creados ejecutar `serverless remove --stage dev`



# Reseña del Backend Appointment Service

Este repositorio contiene el backend del sistema de citas médicas, implementado con **NestJS**, **TypeORM**, **AWS Serverless** y arquitecturas hexagonales para microservicios.

---

## 📌 Arquitectura

El sistema sigue una **arquitectura hexagonal** con separación de capas:

- **Domain**: Entidades, contratos y reglas de negocio.
- **Application**: Casos de uso que implementan la lógica de negocio.
- **Infrastructure**: Implementaciones concretas de repositorios, clientes AWS (DynamoDB, SNS, EventBridge), controladores y consumers.
- **Controllers**: Endpoints HTTP y Lambdas para consumo de eventos SQS.

Los eventos se publican en **SNS** y **EventBridge**, y son consumidos por colas **SQS** para cada país (`PE`, `CL`).

---

## 🐳 Pruebas en local con bases de datos

Para correr pruebas locales de RDS (MySQL/Postgres) y DynamoDB, se puede usar **Docker Compose**.
Si desea exponerlo a internet para pruebas con lambas desplegados en aws, puede usar ngrok

### Ejemplo `docker-compose.yml` para RDS:

```yaml
version: '3.8'

services:
  db-pe:
    image: mysql:8
    container_name: db-pe
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: appointmentsdb
    volumes:
      - db-pe-data:/var/lib/mysql
    networks:
      - mysql-network
    ports:
      - "3307:3306"

  db-cl:
    image: mysql:8
    container_name: db-cl
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: appointmentsdb
    volumes:
      - db-cl-data:/var/lib/mysql
    networks:
      - mysql-network
    ports:
      - "3308:3306"

  ngrok:
    image: ngrok/ngrok
    container_name: ngrok
    depends_on:
      - db-pe
      - db-cl
    command: ["start", "--config", "/etc/ngrok.yml", "--all"]
    environment:
      NGROK_AUTHTOKEN: "1WJTZKeFhe9jQq4zvhq08PPZy3Z_6v7QP5LyA6jBQ7t2A77VF"
    volumes:
      - ./ngrok.yml:/etc/ngrok.yml
    ports:
      - "4040:4040"
    networks:
      - mysql-network
  
  adminer:
    image: adminer
    container_name: adminer
    restart: unless-stopped
    ports:
      - "8080:8080"
    networks:
      - mysql-network
    environment:
      ADMINER_DEFAULT_SERVER: db-pe

volumes:
  db-pe-data:
  db-cl-data:

networks:
  mysql-network:
    driver: bridge

```

### Ejecutar migrations para Perú (PE) y Chile (CL):

  - npm run migration:run:pe
  - npm run migration:run:cl


### Generar los archivos de build:
  - npm run build:nest


### Despliegue de infrastructura con serverless framework:
  - serverless deploy --stage dev


## Generar Documentacion
1. Ubicarse en la raiz y ejecutar `git checkout design`
2. Ejecutar primero `npm run install` y luego `npm run start` para visualizar el link de la documentación
3. Ingresar al link `http://127.0.0.1:8084`

## Pruebas Unitarias
1. Ubicarse en la raiz y ejecutar `npm run test`