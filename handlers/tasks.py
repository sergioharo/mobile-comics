#!/usr/bin/env python
# encoding: utf-8
"""
users.py

Created by Sergio Haro on 2011-03-08.
Copyright (c) 2011 Hungry Bear Inc. All rights reserved.
"""

import handlers
import logging
from models import Comic, ComicEntry, fetch_latest_comic
import preload

from google.appengine.ext import webapp
from google.appengine.api import taskqueue

class UpdateComicsWorker(handlers.BaseHandler):
    def get(self):
        q = Comic.all()
        for comic in q:
            taskqueue.add(url='/tasks/update/' + str(comic.id))
        self.response.out.write("OK")
        
    def post(self):
        q = Comic.all()
        for comic in q:
            taskqueue.add(url='/tasks/update/' + str(comic.id))
        self.response.out.write("OK")
        
class UpdateComicTask(handlers.BaseHandler):
    def post(self, cid):
        comic = Comic.get_by_id(int(cid))
        
        if comic is None:
            return
        
        img_src = fetch_latest_comic(comic)
        
        if img_src is None:
            logging.error("ERROR: Could not find comic url for " + cid)
            return
        
        q = comic.entries
        q.filter("img_url =", img_src)
        prev_entry = q.get()
        
        if prev_entry is not None:
            logging.error("ERROR: Already have comic, not updating")
            return
        
        logging.info("SUCCESS: Adding url " + img_src)
        comic.num_entries += 1
        entry = ComicEntry(img_url = img_src, comic = comic, num = comic.num_entries)
        entry.put()
        comic.put()
        self.response.out.write("OK")
        
class PreLoadWorker(handlers.BaseHandler):
    def get(self, flag):
        flag = int(flag)
        if flag == 0 or flag == 1:
            preload.loadPhd()
        if flag == 0 or flag == 2:
            preload.loadYahoo()
        if flag == 0 or flag == 3:
            preload.loadComicsCom()
        if flag == 0 or flag == 4:
            preload.loadXKCD()
        if flag == 0 or flag == 5:
            preload.loadArcamax()
        self.response.out.write("OK")