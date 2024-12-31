## Event Management System Backend

Project setup:
```bash
$ cd api-gateway && npm i
$ cd services/users-service && npm i
$ cd services/communication-service && npm i
$ cd services/events-service && npm i
```

Run project (from root folder):
```bash
$ npm run compose:dev
```

To run migrations:
1. Go inside container
```bash
$ npm run users:compose:dev:sh
```
or
```bash
$ npm run communication:compose:dev:sh
```
or
```bash
$ npm run events:compose:dev:sh
```
2. Run migration:run script
```bash
$ npm run migration:run
```