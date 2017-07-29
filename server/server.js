import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import teamRoutes from './routes/team';

let port = process.env.NODE_ENV === "production" ? 8080 : 8079 ;
const app = express( );

if ( process.env.NODE_ENV == 'production' )
    app.use(morgan( 'combined' ))
else
    app.use(morgan( 'dev' ));

app.use(express.static( 'dist' ));
app.use(bodyParser.json( ));
app.use(bodyParser.urlencoded({ extended: true }));

app.use( '/teams', teamRoutes );
app.listen( process.env.PORT || port );
console.log( "Server started" );
