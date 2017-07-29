import express from 'express';
import bodyParser from 'body-parser';
import adminRoutes from './routes/admin';
import userRoutes from './routes/user';
import bugRoutes from './routes/bug';

const app = express( );
app.use(bodyParser.json( ));
app.use(bodyParser.urlencoded({ extended: true }));

const apiServer = async( port ) => {
    app.use(express.static( 'dist' ));
    app.use('/admin', adminRoutes);
    app.use('/', bugRoutes);
    app.use('/', userRoutes);
    app.listen( port );
    console.log( "Server started" );
};

module.exports = apiServer;
