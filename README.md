# Getting Started with the City AQI App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

1. Use `git clone` to copy the project locally
2. Go in the console to the root of this project and run `npm install`
3. Create a file called `config.js` inside the folder called `src`
4. In your `config.js` add the following code and insert your api token:
```
module.exports = {
    apiToken: 'yourToken',
};
```

## Available Scripts

In the project directory here are the key scrips you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

### `npm test`

Run to check unit tests. 

*For the following commands make sure that you are also running `npm start` in a separate tab
### `npx cypress run`

Run to end to end tests.

### `npx cypress open`

Opens a GUI way to run Cypress tests. You will be prompted to choose a browser to run the tests for and then given a list of Cypress test files (in this case only one called `aqi-app.cy.js`) to run. As soon as you click on the file the tests will run.

## Learn More

You can learn more about my thoughts on the app on the [Notion page I created](https://harvest-dry-652.notion.site/City-AQI-App-Information-Highlights-6d50656abb1949078c567a234f920aa5).
