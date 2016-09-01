from flask import Blueprint, render_template
from app import app, db
import csv, random, datetime
from app.mod_index.models import Team, Match, Table

mod_index = Blueprint('index', __name__, url_prefix='')

@app.route('/')
def index():
    # Initial tournament setup - only need to be done once. 
    # readInsertTeams()
    randomizeGroups()
    # setupMatches()

    groups = getGroups()
    return render_template('index/index.html', groups=groups)


@app.route('/matches')
def matches():
    tablematches = getTableMatches() 
    return render_template('index/tablematches.html', tablematches=tablematches)


def readInsertTeams():
    with open('teams.csv', newline='') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=',')

        for row in spamreader:
            id = row[1]
            teamname = row[2]
            mem1 = row[3] 
            mem2 = row[4] 
            paid = row[5]
            if paid == "seff" or paid == "Ja": 
                paid = True
            else: 
                paid = False

            team = Team(mem1, mem2, paid, teamname)
            db.session.add(team)        
        db.session.commit()


def randomizeGroups():
    # 8 groups - 4 teams in each group. Randomize 
    groups = {'0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, }

    teams = Team.query.all()
    for team in teams: 
        group = random.sample(groups.keys(), 1)[0]
        groups[group] = groups[group] + 1
        team.group = group
        db.session.commit()

        if groups[group] == 4: 
            del groups[group]    

def setupMatches():
    groups = getGroups() 

    for i in range(0, 8, 2): 
        table = Table()
        matches1 = getMatches(groups[i], i)
        matches2 = getMatches(groups[i+1], i+1)

        start = datetime.datetime(2016, 10, 15, 16, 00) 
        for i in range(0, (len(matches1) + len(matches2))):
            starttime = start + datetime.timedelta(minutes=i*20) 
            if(i % 2 == 0): 
                match = Match(matches1[i//2].team1, matches1[i//2].team2, matches1[i//2].group)
                match.start_time = starttime
                table.matches.append(match)
            else: 
                match = Match(matches2[i//2].team1, matches2[i//2].team2, matches2[i//2].group)
                match.start_time = starttime
                table.matches.append(match)
        db.session.add(table)
    db.session.commit()


def getGroups(): 
    groups = {}
    for i in range(0, 8): 
        groups[i] = Team.query.filter_by(group=i).all()
        print(i)
    return groups


def getMatches(group, id): 
    matches = []
    matches.append(Match(group[0], group[1], id))
    matches.append(Match(group[2], group[3], id))
    matches.append(Match(group[0], group[2], id))
    matches.append(Match(group[1], group[3], id))
    matches.append(Match(group[0], group[3], id))
    matches.append(Match(group[1], group[2], id))
    # print(matches)
    return matches

def getTableMatches(): 
    tablematches = {}
    # The ID counter starts at 1. 
    for i in range(1, 5): 
        table = Table.query.filter_by(id=i).first()
        tablematches[i] = table.matches
        
    return tablematches