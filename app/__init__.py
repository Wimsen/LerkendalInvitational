# -*- coding: utf-8 -*-

from flask import Flask, render_template
from flask_bootstrap import Bootstrap
from flask_sqlalchemy import SQLAlchemy
from flask_login import login_user, logout_user, login_required, LoginManager
from flask_bcrypt import Bcrypt


app = Flask(__name__)
app.config.from_object('config')
Bootstrap(app)
bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

from app.mod_index.models import Team, Match, Table, User
from app.mod_index.controllers import mod_index, readInsertTeams, randomizeGroups, createMatches
app.register_blueprint(mod_index)
db.create_all()
db.session.commit()


login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = '/login'

# Initial tournament setup - only need to be done once.

readInsertTeams()
randomizeGroups()
createMatches()

@login_manager.user_loader
def load_user(id):
    return User.query.get(int(id))


# user = User('anlegget', 'cgephMDqD5FjR&y#P&!j6D$mH!dc*5')
# db.session.add(user)
# db.session.commit()

# Sample HTTP error handling
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404
