# Exploring WeatherAPI with React and JWT authentication

## Built with: 

### Front-End
React, JavaScript, Sass \
[![My Skills](https://skillicons.dev/icons?i=react,js,sass)](https://skillicons.dev/)

### Back-End
Express, mySQL, Node \
[![My Skills](https://skillicons.dev/icons?i=express,mysql,nodejs)](https://skillicons.dev)

### Code Editor
VSCode \
[![My Skills](https://skillicons.dev/icons?i=vscode)](https://skillicons.dev)



## Run Locally

### Explore WeatherAPI Client Side
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

In the project directory client, you can now run:

```bash
    npm start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Explore WeatherAPI Server Side
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
