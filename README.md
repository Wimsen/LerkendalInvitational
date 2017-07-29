# Test-the-Testers

Test-the-Testers is a system designed for testing testers. 

The server needs a database - the app uses the environment variable `DATABASE_URL` for info on where this is. We have a development database running in heroku - feel free to use it instead of a local database: 
```
export DATABASE_URL=postgres://pbgszbmbakemaj:84ca02d2e2c671b20f5e34bbefca54bd0a5d0fbc3c377756589521f4e45f5cb0@ec2-107-21-205-25.compute-1.amazonaws.com:5432/d9r77ashp70ssp
```

The server also uses the environment variable `SECRET_KEY` to sign access tokens. To set it: 
```
export SECRET_KEY="scary_cat"
```

Please use a more secure secret key in a production environment. 

## Development 
For compiling and running the app in a development environment, run from the project directory: 
```
npm install 
npm run dev
```
Visit the app in your favorite browser at `localhost:8080/`

## Deployment
For building and launching a server in a production environment, run from the project directory:  

```
npm install 
npm start
```
Visit the app in your favorite browser at `localhost:8080/`
