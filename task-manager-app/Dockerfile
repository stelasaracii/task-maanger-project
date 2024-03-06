services:
  app:
    container_name: nodejs-app
    build: .
    ports:
      - "5000:5000"
    environment:
      DB_HOST: mysql-db
      DB_USER: your-db-user
      DB_PASSWORD: your-db-password
      DB_PORT: 3306
      DB_DATABASE: your-db-name
    depends_on:
      - mysql-db