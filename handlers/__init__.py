#!/usr/bin/env python
# encoding: utf-8
"""
__init__.py

Created by Sergio Haro on 2011-03-08.
Copyright (c) 2011 Hungry Bear Inc. All rights reserved.
"""

from google.appengine.ext import webapp
from google.appengine.ext.webapp import template
from google.appengine.ext.webapp import util
from google.appengine.ext import db

import utils

class BaseHandler(webapp.RequestHandler):
    def render(self, template_name, context):
        path = utils.get_template_path(template_name)
        self.response.out.write(template.render(path, context))

class BaseXMLHandler(BaseHandler):
   def render(self, template_name, context):
       self.response.headers['Content-Type'] = 'application/xml'
       BaseHandler.render(self, template_name, context)
       
class BaseJSONHandler(BaseHandler):
  def render(self, template_name, context):
      self.response.headers['Content-Type'] = 'application/json'
      BaseHandler.render(self, template_name, context)
