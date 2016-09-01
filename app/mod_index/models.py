from app import db


class Base(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)
    date_created = db.Column(db.DateTime, default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())


class Team(Base):
    member1 = db.Column(db.String(128))
    member2 = db.Column(db.String(128))
    teamname = db.Column(db.String(128))
    group = db.Column(db.Integer())
    paid = db.Column(db.Boolean())

    def __init__(self, member1, member2, paid, teamname):
        self.member1 = member1
        self.member2 = member2
        self.paid = paid
        self.teamname = teamname

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def __repr__(self):
        return "{}:  {} - {}".format(self.teamname, self.member1, self.member2)


class Match(Base): 
    team1_id = db.Column(db.Integer, db.ForeignKey(Team.id), nullable=False)
    team2_id = db.Column(db.Integer, db.ForeignKey(Team.id), nullable=False)
    team1 = db.relationship(Team, foreign_keys=team1_id)
    team2 = db.relationship(Team, foreign_keys=team2_id)
    group = db.Column(db.Integer())
    table_id = db.Column(db.Integer, db.ForeignKey('table.id'), nullable=True)
    start_time = db.Column(db.DateTime())


    def __init__(self, team1, team2, group): 
        self.team1 = team1
        self.team2 = team2
        self.group = group
        # self.start_time = start_time
    
    def __repr__(self):
        return "{} - {}".format(self.team1, self.team2)


class Table(Base):
    matches = db.relationship('Match', backref='table', lazy='dynamic')