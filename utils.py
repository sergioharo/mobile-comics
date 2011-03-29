#!/usr/bin/env python
# encoding: utf-8
"""
utils.py

Created by Sergio Haro on 2011-03-08.
Copyright (c) 2011 Hungry Bear Inc. All rights reserved.
"""

import os

TEMPLATES_PATH = 'templates'

def get_template_path(name):
    return os.path.join(os.path.dirname(__file__), TEMPLATES_PATH, name)

