# -*- coding: utf-8 -*-

# Import flask and template operators

from flask import Flask, render_template
from flask_bootstrap import Bootstrap
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config.from_object('config')
Bootstrap(app)
db = SQLAlchemy(app)

from app.mod_index.models import Team, Match, Table
db.create_all()

from app.mod_index.controllers import mod_index
app.register_blueprint(mod_index)


# Sample HTTP error handling
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404
