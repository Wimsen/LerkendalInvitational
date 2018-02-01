var standardTeams = [
    {
        "id": 1,
        "name": "Lag 1",
        "member1": "Member 1",
        "member2": "Member 2"
    }, {
        "id": 2,
        "name": "Lag 2",
        "member1": "Member 1",
        "member2": "Member 2"
    }, {
        "id": 3,
        "name": "Lag 3",
        "member1": "Member 1",
        "member2": "Member 2"
    }, {
        "id": 4,
        "name": "Lag 4",
        "member1": "Member 1",
        "member2": "Member 2"
    }, {
        "id": 5,
        "name": "Lag 5",
        "member1": "Member 1",
        "member2": "Member 2"
    }, {
        "id": 6,
        "name": "Lag 6",
        "member1": "Member 1",
        "member2": "Member 2"
    }, {
        "id": 7,
        "name": "Lag 7",
        "member1": "Member 1",
        "member2": "Member 2"
    }, {
        "id": 8,
        "name": "Lag 8",
        "member1": "Member 1",
        "member2": "Member 2"
    }, {
        "id": 9,
        "name": "Lag 9",
        "member1": "Member 1",
        "member2": "Member 2"
    }
]

export async function getTeams() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(standardTeams);
        }, 539);
    });
}


export async function getTeam(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(standardTeams[id]);
        }, 539);
    });
}
