import {NotificationManager} from 'react-notifications';
import {authFetch} from '../auth/userAuth';

export async function resetTournament(){
    try {
        let result = await authFetch('/api/admin/reset');
        NotificationManager.success('Tilbakestilling vellykket. Du må logge inn med den vanlige brukeren igjen (ikke admin)', 'Vellykket');
        return "success";
    } catch(e) {
        console.log(e);
        NotificationManager.error('Noe gikk galt. Vennligst prøv igjen', 'Feil');
        return "fail; "
    }
}

export async function backupTournament(){
    try {
        let result = await authFetch('/api/admin/backup');
        NotificationManager.success('Backup vellykket. Sjekk mail (lerkendalinvitational) for CSV filer. ');
        return "success";
    } catch(e) {
        console.log(e);
        NotificationManager.error('Noe gikk galt. Vennligst prøv igjen', 'Feil');
        return "fail";
    }
}

export async function sendPasswordEmail(){
    try {
        let result = await authFetch('/api/admin/sendpass');
        NotificationManager.success('Epost-utsending vellykket.');
        return "success";
    } catch(e) {
        NotificationManager.error('Noe gikk galt. Vennligst prøv igjen', 'Feil');
        return "fail";
    }
}
