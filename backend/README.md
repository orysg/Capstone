## Service Information
This is a [Express.js](https://expressjs.com/) backend project to provide API endpoints for user authentication and database interactions
It runs in an official lightweight alpine docker with Node.js

## Getting Started

To launch the server manually without the docker compose configuration in the root directory use

```bash
yarn dev
```

Other commands can be found and configured in the package.json file.

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

*We use sequelize to manage the postgresql database and as such follow their typical project structure.
You can create tables, endpoints by creating new files in the models, and routes tables respectively
To implement the logic when the endpoint is called you create a new file in the controllers folder.
Remember to include these new files as new imports in the index.js files in each respective folder.*

To populate the database you can create or use the existing seeders by using sequlize-cl when running in developer mode
```bash
npx sequelize-cli db:seed:all
```

To test the endpoints you can use a cli tool such as httpie to run commands such as
```bash
http POST http://localhost:4000/api/radars IP="localhost" Latitude=1 Longitude=1
```

## Learn More

To learn more about the libraries used in this service visit:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.