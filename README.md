## Description

Initially, the two docker images must be raised, which are already configured in the .yml file
one is a MongoDB image and the other is a manager that can be used instead of mongo compass or others

To build the repository, dependencies must be installed with the command: npm i
Once finished, you must create an .env file and add what is in the .env.example file, after this you can start with npm run start:dev
the documentation can be accessed in swagger at the path http://localhost:3000/docs
in the mongo_data folder there is the data with users created in the role of driver and passenger, a single passenger user with a payment source id already created in the payment gateway
You can try the following coordinates to request a service: 2.957874, -75.276428 or 2.961763, -75.278563 or similar, the service will immediately assign the closest driver to that location, at the end of the trip the final locations must be sent to calculate the distance, time and return the rate and the debit of the payment with the tokenized card

## Installation

```bash
$ npm install
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

## License

Nest is [MIT licensed](LICENSE).
