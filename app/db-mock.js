var standardTeams = [
    {
        "name": "Lag 1",
        "member1": "Member 1",
        "member2": "Member 2"
    }, {
        "name": "Lag 2",
        "member1": "Member 1",
        "member2": "Member 2"
    }, {
        "name": "Lag 3",
        "member1": "Member 1",
        "member2": "Member 2"
    }, {
        "name": "Lag 4",
        "member1": "Member 1",
        "member2": "Member 2"
    }, {
        "name": "Lag 5",
        "member1": "Member 1",
        "member2": "Member 2"
    }, {
        "name": "Lag 6",
        "member1": "Member 1",
        "member2": "Member 2"
    }, {
        "name": "Lag 7",
        "member1": "Member 1",
        "member2": "Member 2"
    }, {
        "name": "Lag 8",
        "member1": "Member 1",
        "member2": "Member 2"
    }, {
        "name": "Lag 9",
        "member1": "Member 1",
        "member2": "Member 2"
    }
]

export async function getTeams(userId, fromAccountId, toAccountId, amount) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(standardTeams);
        }, 539);
    });
}
