import pg from 'pg';
import url from 'url';
import config from '../config';

const dbParams = url.parse( config.db.url, true );
const auth = dbParams.auth
    ? dbParams.auth.split( ':' )
    : [ '', '' ];
const username = auth[0];
const dbName = dbParams.pathname.split( '/' )[ 1 ];

const dbConfig = {
    user: username,
    password: auth[1],
    host: dbParams.hostname,
    port: dbParams.port,
    database: dbName,
    ssl: true
};

const pool = new pg.Pool( dbConfig );

pool.on('error', ( e, client ) => {
    console.log( 'Something went wrong with the db connection' );
});

async function executeAsyncQuery( query, params, client ) {
    const queryRunner = client || pool;
    const result = await queryRunner.query( query, params );
    return result.rows;
}

export function dbRunPromise( ...args ) {
    return executeAsyncQuery( ...args );
}
export default pool;
