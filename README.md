# NOGAME LOGGING

## Setup

The project includes a submodule that tracks our logging_backend. This is not included in the project as per default, therefore execute this for the backend:

```zsh
git submodule init
```

To update the submodule:

```zsh
git submodule update
```

## How to run

### Start backend

build docker image

```zsh
npm run docker:build
```

run docker image

```zsh
npm run docker:run
```

### Start frontend

pls download http-server :)

```zsh
npm install --global http-server
```

run backend :)

```zsh
http-server app/frontend/src/public
```
