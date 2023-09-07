## Want to run this app and test it by yourself? Sure thing! Lets go :D

## Env setup
`docker.env`

    POSTGRE_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
Fields needed for `.env` file you can find in `app.module.ts` ;)

## Installation

```bash
$ npm install
$ docker-compose up
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
