import moment from 'moment';

export function formatDate( created, includeTime = true, includeSeconds = false ) {
    let date = created;
    if (!( created instanceof Date )) {
        date = new Date(created.replace( ' ', 'T' ));
    }

    let day = date.getDate( ).toString( ).length == 1
        ? '0' + ( date.getDate( ) + 1 )
        : date.getDate( );

    let monthIndex = date.getMonth( ).toString( ).length == 1
        ? '0' + ( date.getMonth( ) + 1 )
        : date.getMonth( ) + 1;

    let year = date.getFullYear( );

    let hours = date.getHours( ).toString( ).length == 1
        ? '0' + date.getHours( )
        : date.getHours( );

    let minutes = date.getMinutes( ).toString( ).length == 1
        ? '0' + date.getMinutes( )
        : date.getMinutes( );

    let seconds = date.getSeconds( ).toString( ).length == 1
        ? '0' + date.getSeconds( )
        : date.getSeconds( );

    let dateString = day + '.' + monthIndex + '.' + year;
    if ( includeTime )
        dateString += ' ' + hours + ':' + minutes;
    if ( includeSeconds )
        dateString += ':' + seconds;

    return dateString;
}

export function dateSort( a, b, descending = true ) {
    a = ( a === null || a === undefined )
        ? -Infinity
        : a;
    b = ( b === null || b === undefined )
        ? -Infinity
        : b;
    a = formatDate( a, true, true ),
    b = formatDate( b, true, true ),
    a = moment( a, 'DD-MM-YYYY HH:mm:ss' );
    b = moment( b, 'DD-MM-YYYY HH:mm:ss' );

    if ( a < b )
        return descending
            ? 1
            : -1;
    if ( a > b )
        return descending
            ? -1
            : 1;
    return 0;
}

export function formatAccountBalance( balance ) {
    let retStr = "";
    let balanceArray = ( "" + balance ).split( "." );

    balanceArray[0].split( "" ).reverse( ).forEach(c => {
        retStr += c;
        if ( retStr.length == 3 )
            retStr += " ";
        }
    );

    retStr = retStr.split( "" ).reverse( ).join( "" );

    if ( balanceArray[1] != undefined ) {
        let oreStr = balanceArray[1].length == 1
            ? balanceArray[1] + "0"
            : balanceArray[1];
        retStr += ", " + oreStr;
    } else
        retStr += ", 00";

    return retStr;
}
