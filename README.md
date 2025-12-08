> **Reseña del Backend Appointment Service**

Este repositorio contiene el backend del sistema de citas médicas, implementado con **NestJS**, **TypeORM**, **AWS Serverless** y arquitecturas hexagonales para microservicios. La arquitectura sigue un estilo DDD + Event-Driven + Serverless Microservices.

## 📌 Arquitectura

El sistema sigue una **arquitectura hexagonal** con separación de capas:

- **Domain**: Entidades, contratos y reglas de negocio.
- **Application**: Casos de uso que implementan la lógica de negocio.
- **Infrastructure**: Implementaciones concretas de repositorios, clientes AWS (DynamoDB, SNS, EventBridge, RDS), controladores(Endpoints HTTP), consumers(consumidores de los eventos de agendamiento pendiente y/o confirmación) y lambdas(Lambdas para consumo de eventos SQS).

Los eventos se publican en **SNS** y **EventBridge**, y son consumidos por colas **SQS** para cada país (`PE`, `CL`).

## Diagrama Flujo Evento

API Gateway
        ↓
appointmentApi (Lambda)
        ↓
SNS: appointment-created-topic
────────────────────────────────────────────
countryISO = PE → SqsPEQueue → appointmentPeConsumer
countryISO = CL → SqsCLQueue → appointmentClConsumer
────────────────────────────────────────────
        ↓
EventBridge (appointment-bus)
        ↓
appointment-confirmation-queue (SQS)
        ↓
appointmentConfirmationConsumer (Lambda)
        ↓
Actualiza DynamoDB a estado “completed”


## Componentes principales
 
  ### appointmentApi (Lambda + API Gateway)

  1. Función que recibe solicitudes HTTP:

  2. Crea un appointment en DynamoDB.

  3. Publica un evento en SNS (AppointmentCreated).


  ### appointmentPeConsumer (Lambda)

  1. Consume mensajes desde SQS PE.

  2. Persiste información en la base RDS-PE.

  3. Envía un evento a EventBridge (AppointmentConfirmed).


  ### appointmentClConsumer (Lambda)

  1. Consume mensajes desde SQS CL.

  2. Persiste información en la base RDS-CL.

  3. Envía un evento a EventBridge.


  ### appointmentConfirmationConsumer (Lambda)

  1. Este Lambda escucha un SQS que es target de EventBridge.

  2. Leer el evento AppointmentConfirmed.

  3. Buscar el appointment en DynamoDB.

  4. Actualizar su estado a completed.

---

> **Requerimientos**:

- Instalar AWS Cli v2.15.48 y Python/3.11.8
- Instalar Docker y Docker-compose v2.26.1
- Instalar Node Js v22.21.0
- Instalar Serverless Framework v4.27.0

## Deploy Local (Offline)

0.  Clonar el repositorio
1.  Ejecutar el comando `git checkout develop`

## Configuracion AWS

1.  Ejecutar `aws configure --profile NOMBRE_DEL_PERFIL` donde "NOMBRE_DEL_PERFIL" es el perfil de despliegue con localstack.
2.  Ingresar las credenciales respectivas :
    - access_key
    - secret_key
    - region
    - ouput format

### 🐳 Ejecutar servicios de base de datos local (Reemplazo de RDS)

Para correr pruebas locales de RDS (MySQL/Postgres), se puede usar **Docker Compose**.
Si desea exponerlo a internet para pruebas con lambas desplegados en aws, puede usar ngrok como en este caso.

1. Ejecutar `docker-compose -f docker-compose.yml up -d` para simular los servicios de base de datos:

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
      - '3307:3306'

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
      - '3308:3306'

  ngrok:
    image: ngrok/ngrok
    container_name: ngrok
    depends_on:
      - db-pe
      - db-cl
    command: ['start', '--config', '/etc/ngrok.yml', '--all']
    environment:
      NGROK_AUTHTOKEN: '1WJTZKeFhe9jQq4zvhq08PPZy3Z_6v7QP5LyA6jBQ7t2A77VF'
    volumes:
      - ./ngrok.yml:/etc/ngrok.yml
    ports:
      - '4040:4040'
    networks:
      - mysql-network

  adminer:
    image: adminer
    container_name: adminer
    restart: unless-stopped
    ports:
      - '8080:8080'
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

### Ejecutar servidor local:

- npm run install
- npm run start:dev

### Generar los archivos de build:

- npm run build:nest

### Despliegue de infrastructura:

- serverless deploy --stage dev

### Actualizar .env para pruebas locales:

1. Actualizar credenciales de las dos instancias de bd de prueba, entrando al link http://localhost:4040/status
2. Actualizar el nombre de APPOINTMENT_TABLE, APPOINTMENT_EVENT_BUS, APPOINTMENT_CREATED_TOPIC_ARN segun la infraestructra creada por serverless.yaml (Esto paso es debido a que no estamos usando infrastructura de prueba tal como podria darnos localstack y terraform)

### Eliminar infrastructura

- serverless remove --stage dev

---

## Generar Documentacion

1. Ubicarse en la raiz y ejecutar `git checkout design`
2. Ejecutar primero `npm run install` y luego `npm run start` para visualizar el link de la documentación
3. Ingresar al link `http://127.0.0.1:8084`

## Pruebas e2e

1. Ubicarse en la raiz y ejecutar `npm run test`
