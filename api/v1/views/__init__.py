#!/usr/bin/python3
from flask import Blueprint
app_views = Blueprint("app_views", __name__, url_prefix="/api")

from api.v1.views.users import *
from api.v1.views.opportunities import *
from api.v1.views.landing_page import *
