import {NotificationManager} from 'react-notifications';
import {adminFetch} from '../auth/adminAuth';

export async function resetTournament(){
    try {
        let result = await adminFetch('/api/admin/reset');
        NotificationManager.success('Tilbakestilling vellykket. Du må logge inn med den vanlige brukeren igjen (ikke admin)', 'Vellykket');
        return "success";
    } catch(e) {
        console.log(e);
        NotificationManager.error('Noe gikk galt. Vennligst prøv igjen', 'Feil');
        return "fail; "
    }
}
