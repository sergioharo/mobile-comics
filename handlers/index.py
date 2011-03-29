#!/usr/bin/env python
# encoding: utf-8
"""
users.py

Created by Sergio Haro on 2011-03-08.
Copyright (c) 2011 Hungry Bear Inc. All rights reserved.
"""

import handlers
from django.utils import simplejson as json
from models import Comic, ComicEntry

from google.appengine.ext import db
from google.appengine.ext import webapp

class IndexHandler(handlers.BaseHandler):
    def get(self):
        self.render("index.html", {})