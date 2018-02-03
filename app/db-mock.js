var standardTeams = [
    {
        "id": 0,
        "name": "Lag 0",
        "member1": "Member 1",
        "member2": "Member 2",
        "points": 1
    }, {
        "id": 1,
        "name": "Lag 1",
        "member1": "Member 1",
        "member2": "Member 2",
        "points": 1
    }, {
        "id": 2,
        "name": "Lag 2",
        "member1": "Member 1",
        "member2": "Member 2",
        "points": 4
    }, {
        "id": 3,
        "name": "Lag 3",
        "member1": "Member 1",
        "member2": "Member 2",
        "points": 4
    }, {
        "id": 4,
        "name": "Lag 4",
        "member1": "Member 1",
        "member2": "Member 2",
        "points": 5
    }, {
        "id": 5,
        "name": "Lag 5",
        "member1": "Member 1",
        "member2": "Member 2",
        "points": 1
    }, {
        "id": 6,
        "name": "Lag 6",
        "member1": "Member 1",
        "member2": "Member 2",
        "points": 2
    }, {
        "id": 7,
        "name": "Lag 7",
        "member1": "Member 1",
        "member2": "Member 2",
        "points": 3
    }, {
        "id": 8,
        "name": "Lag 8",
        "member1": "Member 1",
        "member2": "Member 2",
        "points": 4
    }, {
        "id": 9,
        "name": "Lag 9",
        "member1": "Member 1",
        "member2": "Member 2",
        "points": 3
    }
]

var currentdate = new Date();
var standardMatches = {
    1: [
        {
            "id": 0,
            "homeTeam": 1,
            "awayTeam": 2,
            "timestamp": new Date(),
            "winner": 1,
            "table": 1
        }, {
            "id": 1,
            "homeTeam": 1,
            "awayTeam": 3,
            "timestamp": new Date(),
            "winner": 2,
            "table": 1
        }, {
            "id": 2,
            "homeTeam": 1,
            "awayTeam": 4,
            "timestamp": new Date(),
            "winner": null,
            "table": 2
        }, {
            "id": 3,
            "homeTeam": 1,
            "awayTeam": 6,
            "timestamp": new Date(),
            "winner": null,
            "table": 2
        }, {
            "id": 4,
            "homeTeam": 1,
            "awayTeam": 7,
            "timestamp": new Date(),
            "winner": null,
            "table": 3
        }
    ]
};

var standardGroups = {
    0: [
        {
            "id": 1,
            "name": "Lag 1",
            "points": 1
        }, {
            "id": 2,
            "name": "Lag 2",
            "points": 3
        }, {
            "id": 3,
            "name": "Lag 3",
            "points": 0
        }, {
            "id": 4,
            "name": "Lag 4",
            "points": 1
        }
    ],
    1: [
        {
            "id": 5,
            "name": "Lag 5",
            "points": 1
        }, {
            "id": 6,
            "name": "Lag 6",
            "points": 3
        }, {
            "id": 7,
            "name": "Lag 7",
            "points": 0
        }, {
            "id": 8,
            "name": "Lag 8",
            "points": 1
        }
    ]
}

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

export async function getMatchesByTeamId(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(standardMatches[id]);
        }, 539);
    });
}

export async function getMatches(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(standardMatches[1]);
        }, 539);
    });
}

export async function getGroups(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(standardGroups);
        }, 539);
    });
}
