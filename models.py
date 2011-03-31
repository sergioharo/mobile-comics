#!/usr/bin/env python
# encoding: utf-8
"""
__init__.py

Created by Sergio Haro on 2011-03-08.
Copyright (c) 2011 Hungry Bear Inc. All rights reserved.
"""

from google.appengine.ext import db
from google.appengine.api import urlfetch

import re
import logging

PHD_TYPE = 1
YAHOO_TYPE = 2
COMIC_TYPE = 3
 
class Fetcher:
    def fetch(self, comic):
        return
        
class PhDComicFetcher(Fetcher):
    url = "http://www.phdcomics.com/comics.php"
    def fetch(self, comic):
        result = urlfetch.fetch(url = self.url, deadline = 10)
        m = re.search('(http://www.phdcomics.com/comics/archive/[a-zA-Z0-9\.]+)', result.content)
        if m is None:
            return None
        return m.group(0)
        
class ComicComFetcher(Fetcher):
    url = "http://comics.com/"
    def fetch(self, comic):
        url = self.url + comic.meta + "/"
        result = urlfetch.fetch(url = url, deadline = 10)
        m = re.search('(http://[a-zA-z0-9]+.cdn.cloudfiles.rackspacecloud.com/dyn/str_strip/[a-zA-Z0-9\.]+)', result.content)
        if m is None:
            return None
        return m.group(0)
        
class YahooFetcher(Fetcher):
    url = "http://news.yahoo.com/comics/"
    def fetch(self, comic):
        url = self.url + comic.meta
        result = urlfetch.fetch(url = url, deadline = 10)
        m = re.findall('http://d.yimg.com/a/p/u[cm][a-z]*/[a-zA-Z0-9\./]+', result.content)
        if m is None or len(m) == 0:
            return None
        return m[-1]
                
FETCHERS = {
    PHD_TYPE: PhDComicFetcher(),
    COMIC_TYPE: ComicComFetcher(),
    YAHOO_TYPE: YahooFetcher()
}
        
def fetch_latest_comic(comic):
    return FETCHERS[comic.ctype].fetch(comic)
    
class Comic(db.Model):
    name = db.StringProperty()
    author = db.StringProperty()
    enabled = db.BooleanProperty()
    last_updated = db.DateTimeProperty(auto_now_add=True)
    ctype = db.IntegerProperty()
    meta = db.StringProperty()
    num_entries = db.IntegerProperty()
    
    @property
    def last_entry(self):
        q = self.entries
        q.filter("num =", self.num_entries)
        return q.get()
        
    @property
    def id(self):
        return self.key().id()
           
class ComicEntry(db.Model):
    created = db.DateTimeProperty(auto_now_add=True)
    img_url = db.LinkProperty()
    comic = db.ReferenceProperty(Comic, collection_name="entries")
    num = db.IntegerProperty()
    
    @property
    def id(self):
        return self.key().id()

        