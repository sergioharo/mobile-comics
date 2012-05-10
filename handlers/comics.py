#!/usr/bin/env python
# encoding: utf-8
"""
users.py

Created by Sergio Haro on 2011-03-08.
Copyright (c) 2011 Hungry Bear Inc. All rights reserved.
"""

import handlers
import logging
from django.utils import simplejson as json
from models import Comic, ComicEntry

from google.appengine.ext import db
from google.appengine.ext import webapp

class ListAllComics(handlers.BaseJSONHandler):
    def get(self):
        q = Comic.all()
        q.order("name")
        self.render("list_all.js", { 'comics': q})
        
class GetComics(handlers.BaseJSONHandler):
    def get(self):
        q = []
        comics = self.request.get('data')
        if comics:
            logging.info(comics)
            data = json.loads(comics)
            q = Comic.get_by_id(data["comics"])
        self.render("list.js", { 'comics': q})
        
class GetComic(handlers.BaseJSONHandler):
    def get(self, comicId, episodeId):
        comicId = int(comicId)
        episodeId = int(episodeId)
        comic = Comic.get_by_id(comicId)
        if comic:
            q = comic.entries
            q.filter('num =', episodeId)
            episode = q.get()
            if(episode):
                self.render("entry.js", {'entry': episode})
                return
        self.response.clear()
        self.response.set_status(500)
        self.response.out.write("This operation could not be completed")
        
class GetComicEntry(handlers.BaseJSONHandler):
    def get(self, ce_id):
        ce_id = int(ce_id)
        cid = (ce_id >> 16) & 0xFFFF
        eid = ce_id & 0xFFFF
        logging.info("comic id = " + str(cid))
        logging.info("entry id = " + str(eid))
        c = Comic.get_by_id(cid)
        if c:
            q = c.entries
            q.filter('num =', eid)
            e = q.get()
            if(e):
                self.render("entry.js", {'entry': e})
                return
        self.response.clear()
        self.response.set_status(500)
        self.response.out.write("This operation could not be completed")