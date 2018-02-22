import {authFetch, isAdminAuthenticated, getUserInfo, logOut} from '../auth/userAuth';
import {NotificationManager} from 'react-notifications';

export async function postCostumeContestant(teamName, s3key){
    let costumeContestant = {
        teamname: teamName,
        s3key: s3key
    };

    try {
        let response = await authFetch('/api/costume', {
            costumeContestant: costumeContestant
        });
        console.log(response);
        NotificationManager.success('Kandidat opplastet', 'Vellykket');
        return {};
    } catch(e) {
        console.log(e);
        NotificationManager.error('Noe gikk galt. Vennligst prøv igjen', 'Feil');
        return {};
    }
}

export async function getCostumeContestants(){
    try {
        let costumeContestants = await authFetch('/api/costume');
        return costumeContestants;
    } catch(e) {
        console.log(e);
        return [];
    }
}

// TODO use the headers from auth to get id instead
export async function postCostumeVote(costumeId){
    console.log(getUserInfo());
    let userId = getUserInfo().id;
    try {
        let response = await authFetch('/api/costume/vote', {
            costumeId: costumeId,
            userId: userId
        });
        return "success";
    } catch(e) {
        console.log(e);
        NotificationManager.error('Noe gikk galt. Vennligst prøv igjen', 'Feil');
        return "error";
    }
}

export async function getCostumeVote(){
    try {
        let result = await authFetch('/api/costume/vote');
        console.log(result);
        return result.costumeId;
    } catch(e) {
        console.log(e);
        return "error";
    }
}

export async function deleteCostumeContestant(costumeId){
    try {
        let result = await authFetch(`/api/costume/${costumeId}`, {}, 'DELETE');
        NotificationManager.success('Kandidat slettet', 'Vellykket');
        return "success";
    } catch(e) {
        console.log(e);
        NotificationManager.error('Noe gikk galt. Vennligst prøv igjen', 'Feil');
        return "fail";
    }
}

export async function getCostumeVotes(costumeId){
    try {
        let result = await authFetch(`/api/costume/numvotes/${costumeId}`);
        console.log(result);
        return result.numVotes;
    } catch(e) {
        console.log(e);
    }
}

export async function getVotePercentages(){
    try {
        let result = await authFetch('/api/costume/votepercentages');
        console.log(result);
        return result;
    } catch(e) {
        console.log(e);
    }
}
