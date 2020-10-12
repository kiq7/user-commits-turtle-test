## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node v12+ and npm or Docker

## Running project

### Environment variables

Create .env file and set variables values on file

```
cp .env.template .env
```

### Start server

Starting the server with is very straight-forward:

```
docker-compose up
```

if you prefer to run without docker:

```
npm install
npm run start
```


### Running the tests

Run the following command to run all tests

```
npm run test
```

## To improve

- Use GitHub GraphQL API
- Pagination
- Integration tests
- Cache

## Code Architecture

```
├── src
│   ├── application
│   │   ├── errors
│   │   │   ├── missing-param-error.ts
│   │   │   └── repository-not-found-error.ts
│   │   ├── repositories
│   │   │   └── repository-info.ts
│   │   └── usecases
│   │       ├── fetch-repo-commits.spec.ts
│   │       ├── fetch-repo-commits.ts
│   │       ├── fetch-user-commits.spec.ts
│   │       └── fetch-user-commits.ts
│   ├── infrastructure
│   │   └── repositories
│   │       ├── github-repository-info.spec.ts
│   │       └── github-repository-info.ts
│   ├── main.ts
│   ├── presentation
│   │   └── http
│   │       ├── controllers
│   │       │   └── repository-controller.ts
│   │       ├── routes.ts
│   │       └── server.ts
│   └── utils
│       └── date-utils.ts
├── swagger.json
├── tsconfig.json
├── Dockerfile
├── README.md
├── docker-compose.yml
├── jest.config.js
├── nodemon.json
├── package-lock.json
└── package.json
```

The architecture of the code developed was highly inspired by Clean Architecture and SOLID principles.
Some of the concepts were applied in the project, such as the separation of responsibilities, layers, depending on abstractions, dependency injection, etc.
The code is extremely scalable, for example, if we need to add a new provider (like GitLab or Bitbucket),
it is not a difficult task, since the business rule depends on abstractions instead of implementations.

I've been working with this type of code architecture for the past few years and here are some links that have always helped me.

- [The Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Architecture the Lost Years by Robert Martin](https://www.youtube.com/watch?v=WpkDN78P884)
- [NodeJS and Good Practices](https://blog.codeminer42.com/nodejs-and-good-practices-354e7d763626/)
