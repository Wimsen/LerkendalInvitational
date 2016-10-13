import csv
import datetime
import random
from flask import Blueprint, render_template, request, json, redirect, url_for
from flask_login import login_required, login_user, logout_user
from sqlalchemy import desc

from app import app, db, bcrypt
from app.mod_index.models import Team, Match, Table, User

mod_index = Blueprint('index', __name__, url_prefix='')


@mod_index.route('/')
def index():
    # groups = getGroups()
    # return render_template('index/index.html', groups=groups)
    return table()


@mod_index.route('/matches')
def matches():
    tablematches = getTableMatches()
    return render_template('index/tablematches.html', tablematches=tablematches)


@mod_index.route('/table')
def table():
    tables = []
    for i in range(0, 8):
        table = Team.query.filter_by(group=i).order_by(desc(Team.points)).all()
        tables.append(table)
    return render_template('index/tables.html', tables=tables)


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index.index'))


@mod_index.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('index/login.html')

    if request.method == 'POST':
        username = request.form["username"]
        password = request.form["password"]
        user = User.query.filter_by(username=username).first()

        if user is None:
            return redirect(url_for('index.login'))
        if bcrypt.check_password_hash(user.password, password.encode('utf-8')):  # returns True
            login_user(user)
            return redirect(request.args.get('next') or 'matches')
        else:
            return redirect(url_for('index.login'))

    else:
        return render_template('index/login.html')


@mod_index.route('/result', methods=['POST'])
@login_required
def registerResult():
    content = request.get_json()
    matchid = content["matchid"]
    winner = content["winner"]

    match = Match.query.filter_by(id=matchid).first()
    match.winner = winner
    db.session.commit()

    setPointsByTeam(match.team1_id)
    setPointsByTeam(match.team2_id)
    return json.dumps({'error': 'Vennligst skriv inn gyldige data'}), 200, {'ContentType': 'application/json'}


def setPointsByTeam(teamid):
    homevictories = Match.query.filter_by(team1_id=teamid, winner='H').all()
    awayvictories = Match.query.filter_by(team2_id=teamid, winner='A').all()

    team = Team.query.filter_by(id=teamid).first()
    team.points = len(homevictories) + len(awayvictories)
    db.session.commit()


def readInsertTeams():
    Team.query.delete()
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


def createMatches():
    Match.query.delete()
    Table.query.delete()
    teams = Team.query.all()
    for team in teams:
        team.points = 0
    db.session.commit()
    
    groups = getGroups()

    for i in range(0, 8, 2):
        table = Table()
        matches1 = getMatches(groups[i], i)
        matches2 = getMatches(groups[i + 1], i + 1)

        start = datetime.datetime(2016, 10, 15, 16, 00)
        for i in range(0, (len(matches1) + len(matches2))):
            starttime = start + datetime.timedelta(minutes=i * 20)
            if (i % 2 == 0):
                match = Match(matches1[i // 2].team1, matches1[i // 2].team2, matches1[i // 2].group)
                match.start_time = starttime
                table.matches.append(match)
            else:
                match = Match(matches2[i // 2].team1, matches2[i // 2].team2, matches2[i // 2].group)
                match.start_time = starttime
                table.matches.append(match)
        db.session.add(table)
    db.session.commit()


def getGroups():
    groups = {}
    for i in range(0, 8):
        groups[i] = Team.query.filter_by(group=i).all()
    return groups


def getMatches(group, id):
    matches = []
    matches.append(Match(group[0], group[1], id))
    matches.append(Match(group[2], group[3], id))
    matches.append(Match(group[0], group[2], id))
    matches.append(Match(group[1], group[3], id))
    matches.append(Match(group[0], group[3], id))
    matches.append(Match(group[1], group[2], id))
    return matches


def getTableMatches():
    tablematches = {}
    # The ID counter starts at 1. 
    for i in range(1, 5):
        table = Table.query.filter_by(id=i).first()
        tablematches[i] = table.matches

    return tablematches
