# Thinkhope
Thinking, syncopated

## About
This is the open-source code repository for Thinkhope.  If you'd like to use Thinkhope, please either [create a blank thinkhope]() or [fork an example thinkhope]().

Alternatively if you'd like to develop components/views for app, or instantiate your own Thinkhope server, please read the [Getting started](#getting-started) section below.

## Getting started
Thinkhope is a React app ([/app](/app)) that connects to an array of containerised microservices ([/microservices](/microservices)), which can be deployed using Kubernetes.

### App deployment
```
cd app
npm install
npm run
```

### Datasource deployment
```
cd services/datasources/local
npm install
npm run
```

### Jekyll-based microsite
```
cd docs
bundle install
bundler exec jekyll serve --future
```

### Repo organisation
* [./app](./app) - single page app (SPA) source code
* [./docs](./docs) - documentation and Jekyll-based microsite
  * [./docs/app](./docs/app) - demo app as a collection of compiled static files, served through microsite
* [./services](./services) - directory of services
  * [./services/datasources](./services/datasources) - datasources to serve JLOL into the app
