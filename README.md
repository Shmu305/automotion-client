# Exploring WeatherAPI with React and JWT authentication

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Run Locally

### Explore WeatherAPI Client
Clone the project

```bash
git clone https://github.com/Shmu305/automotion-client.git
```

Go to the project directory

```bash
  cd automotion-client
```

Install dependencies

```bash
  npm install
```
### Server
Clone the project

```bash
  git clone https://github.com/Shmu305/automotion-server.git
```

Go to the project directory

```bash
  cd automotion-server
```

Install dependencies

```bash
  npm install
```

Run knex migrations & seeds to setup & populate the mySQL server.
```bash
    npx knex migrate:latest
    npx knex seed:run
```

Run the script on server terminal.
```bash
    node index.js
```
