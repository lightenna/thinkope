# Thinkope
Thinking, syncopated

## About
This is the open-source code repository for Thinkope.  If you'
@todo write intro text
@todo insert link to app (blank page)
@todo insert link to fork example project
Alternatively if you'd like to develop components/views for app, or instantiate your own Thinkope server, please read the [Getting started](#getting-started) section below.

## Getting started {: #getting-started }
Thinkope is a React app ([/app](/app)) that connects to an array of containerised microservices ([/microservices](/microservices)), which can be deployed using Kubernetes.

### App deployment (dev)
```
cd app
npm install
```

### App deployment (production)
@todo write build instructions to generate bundles

### Docker compose deployment (dev)
@todo write deployment guide

### Kubernetes deployment (production)
@todo write deployment guide

### Jekyll-based microsite
```
cd docs
bundle install
bundler exec jekyll serve --future
```

### Repo organisation
* [./app](./app) - single page app (SPA) source code
* [./docs](./docs) - documentation and Jekyll-based microsite
  * [./docs/app](./docs/app) - compiled app as a collection of static files
* [./microservices](./microservices) - directory of containerised microservices
