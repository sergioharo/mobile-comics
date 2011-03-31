#!/usr/bin/env python
# encoding: utf-8
"""
preload.py

Created by Sergio Haro on 2011-03-08.
Copyright (c) 2011 Hungry Bear Inc. All rights reserved.
"""
from models import Comic

###############################################################################
# Yahoo
###############################################################################
yahoo = [
{ "meta": "two-cows-chicken", "name": u"2 Cows and a Chicken"},
{ "meta": "9-chickweed-lane", "name": u"9 Chickweed Lane"},
{ "meta": "adam-at-home", "name": u"Adam @ Home"},
{ "meta": "alley-oop", "name": u"Alley Oop"},
{ "meta": "andy-capp", "name": u"Andy Capp"},
{ "meta": "argyle-sweater", "name": u"The Argyle Sweater"},
{ "meta": "arlo-and-janis", "name": u"Arlo and Janis"},
{ "meta": "bc", "name": u"B.C."},
{ "meta": "baldo", "name": u"Baldo"},
{ "meta": "ballard-street", "name": u"Ballard Street"},
{ "meta": "basic-instructions", "name": u"Basic Instructions"},
{ "meta": "betty", "name": u"Betty"},
{ "meta": "big-nate", "name": u"Big Nate"},
{ "meta": "big-picture", "name": u"The Big Picture"},
{ "meta": "big-top", "name": u"Big Top"},
{ "meta": "bob-the-squirrel", "name": u"Bob the Squirrel"},
{ "meta": "boondocks", "name": u"Boondocks"},
{ "meta": "born-loser", "name": u"Born Loser"},
{ "meta": "brevity", "name": u"Brevity"},
{ "meta": "brewster-rockit", "name": u"Brewster Rockit"},
{ "meta": "the-buckets", "name": u"The Buckets"},
{ "meta": "classic-bloom-county", "name": u"Classic Bloom County"},
{ "meta": "candorville", "name": u"Candorville"},
{ "meta": "cathy", "name": u"Cathy"},
{ "meta": "cleats", "name": u"Cleats"},
{ "meta": "close-to-home", "name": u"Close to Home"},
{ "meta": "committed", "name": u"Committed"},
{ "meta": "cornered", "name": u"Cornered"},
{ "meta": "cow-and-boy", "name": u"Cow and Boy"},
{ "meta": "cul-de-sac", "name": u"Cul-de-Sac"},
{ "meta": "dark-side-horse", "name": u"Dark Side of the Horse"},
{ "meta": "dilbert", "name": u"Dilbert"},
{ "meta": "the-dinette-set", "name": u"The Dinette Set"},
{ "meta": "doonesbury", "name": u"Doonesbury"},
{ "meta": "doozies", "name": u"The Doozies"},
{ "meta": "drabble", "name": u"Drabble"},
{ "meta": "dude-and-dude", "name": u"Dude and Dude"},
{ "meta": "the-duplex", "name": u"The Duplex"},
{ "meta": "elderberries", "name": u"The Elderberries"},
{ "meta": "family-tree", "name": u"Family Tree"},
{ "meta": "farcus", "name": u"Farcus"},
{ "meta": "fat-cats-classics", "name": u"Fat Cats Classics"},
{ "meta": "ferdnand", "name": u"Ferd'nand"},
{ "meta": "the-flying-mccoys", "name": u"The Flying McCoys"},
{ "meta": "f-minus", "name": u"F Minus"},
{ "meta": "for-better-or-for-worse", "name": u"For Better or For Worse"},
{ "meta": "foxtrot", "name": u"FoxTrot"},
{ "meta": "foxtrot-classics", "name": u"FoxTrot Classics"},
{ "meta": "frank-and-ernest", "name": u"Frank and Ernest"},
{ "meta": "frazz", "name": u"Frazz"},
{ "meta": "fred-basset", "name": u"Fred Basset"},
{ "meta": "freshly-squeezed", "name": u"Freshly Squeezed"},
{ "meta": "fusco-brothers", "name": u"The Fusco Brothers"},
{ "meta": "garfield", "name": u"Garfield"},
{ "meta": "geech-classics", "name": u"Geech Classics"},
{ "meta": "get-fuzzy", "name": u"Get Fuzzy"},
{ "meta": "graffiti", "name": u"Graffiti"},
{ "meta": "grand-avenue", "name": u"Grand Avenue"},
{ "meta": "the-grizzwells", "name": u"The Grizzwells"},
{ "meta": "heart-of-the-city", "name": u"Heart of the City"},
{ "meta": "heathcliff", "name": u"Heathcliff"},
{ "meta": "housebroken", "name": u"Housebroken"},
{ "meta": "herman", "name": u"Herman"},
{ "meta": "ink-pen", "name": u"Ink Pen"},
{ "meta": "in-the-bleachers", "name": u"In the Bleachers"},
{ "meta": "in-the-sticks", "name": u"In The Sticks"},
{ "meta": "janes-world", "name": u"Jane's World"},
{ "meta": "jumpstart", "name": u"Jumpstart"},
{ "meta": "kit-n-carlyle", "name": u"Kit 'n' Carlyle"},
{ "meta": "knight-life", "name": u"The Knight Life"},
{ "meta": "la-cucaracha", "name": u"La Cucaracha"},
{ "meta": "lio", "name": u"Lio"},
{ "meta": "lola", "name": u"Lola"},
{ "meta": "luann", "name": u"Luann"},
{ "meta": "marmaduke", "name": u"Marmaduke"},
{ "meta": "meg-classics", "name": u"Meg! Classics"},
{ "meta": "minimum-security", "name": u"Minimum Security"},
{ "meta": "moderately-confused", "name": u"Moderately Confused"},
{ "meta": "momma", "name": u"Momma"},
{ "meta": "monty", "name": u"Monty"},
{ "meta": "motley-classics", "name": u"Motley Classics"},
{ "meta": "nancy", "name": u"Nancy"},
{ "meta": "new-adventures-queen-victoria", "name": u"New Adventures of Queen Victoria"},
{ "meta": "non-sequitur", "name": u"Non Sequitur"},
{ "meta": "off-the-mark", "name": u"Off the Mark"},
{ "meta": "one-big-happy", "name": u"One Big Happy"},
{ "meta": "overboard", "name": u"Overboard"},
{ "meta": "over-the-hedge", "name": u"Over the Hedge"},
{ "meta": "pc-and-pixel", "name": u"PC and Pixel"},
{ "meta": "peanuts", "name": u"Peanuts"},
{ "meta": "pearls-before-swine", "name": u"Pearls Before Swine"},
{ "meta": "pooch-cafe", "name": u"Pooch Café"},
{ "meta": "preteena", "name": u"PreTeena"},
{ "meta": "prickly-city", "name": u"Prickly City"},
{ "meta": "reality-check", "name": u"Reality Check"},
{ "meta": "real-life-adventures", "name": u"Real Life Adventures"},
{ "meta": "red-rover", "name": u"Red & Rover"},
{ "meta": "rip-haywire", "name": u"Rip Haywire"},
{ "meta": "ripleys-believe-it-or-not", "name": u"Ripley's Believe it or Not"},
{ "meta": "rose-is-rose", "name": u"Rose is Rose"},
{ "meta": "rubes", "name": u"Rubes"},
{ "meta": "rudy-park", "name": u"Rudy Park"},
{ "meta": "shirley-and-son-classics", "name": u"Shirley and Son Classics"},
{ "meta": "shoe", "name": u"Shoe"},
{ "meta": "skin-horse", "name": u"Skin Horse"},
{ "meta": "slowpoke", "name": u"Slowpoke"},
{ "meta": "soup-to-nutz", "name": u"Soup to Nutz"},
{ "meta": "speed-bump", "name": u"Speed Bump"},
{ "meta": "stone-soup", "name": u"Stone Soup"},
{ "meta": "strange-brew", "name": u"Strange Brew"},
{ "meta": "the-sunshine-club", "name": u"The Sunshine Club"},
{ "meta": "tank-mcnamara", "name": u"Tank McNamara"},
{ "meta": "thatababy", "name": u"Thatababy"},
{ "meta": "thats-life", "name": u"That'sLife"},
{ "meta": "tiny-sepuku", "name": u"Tiny Sepuku"},
{ "meta": "toby", "name": u"Toby"},
{ "meta": "tom-dancing-bug", "name": u"Tom the Dancing Bug"},
{ "meta": "too-much-coffee-man", "name": u"Too Much Coffee Man"},
{ "meta": "unstrange-phenomena", "name": u"Unstrange Phenomena"},
{ "meta": "wizard-of-id", "name": u"Wizard of Id"},
{ "meta": "working-daze", "name": u"Working Daze"},
{ "meta": "wt-duck", "name": u"W.T. Duck"},
{ "meta": "ziggy", "name": u"Ziggy"}
];

for y in yahoo:
    c = Comic(name = y['name'], author = "", ctype = 2, meta = y['meta'], num_entries = 0)
    c.put()
    
###############################################################################
# PhD
###############################################################################
c = Comic(name = "Piled Higher & Deeper", author = "Jorge Cham", ctype = 1, num_entries = 0)
c.put()

###############################################################################
# Comics.com
###############################################################################
comicscom = [
{"name":"9 Chickweed Lane","meta":"9_chickweed_lane"},
{"name":"Agnes","meta":"agnes"},
{"name":"Alley Oop","meta":"alley_oop"},
{"name":"Andy Capp","meta":"andy_capp"},
{"name":"Arlo & Janis","meta":"arlo&janis"},
{"name":"B.C.","meta":"bc"},
{"name":"Ballard Street","meta":"ballard_street"},
{"name":"Ben","meta":"ben"},
{"name":"Betty","meta":"betty"},
{"name":"Big Nate","meta":"big_nate"},
{"name":"The Born Loser","meta":"the_born_loser"},
{"name":"Brevity","meta":"brevity"},
{"name":"The Buckets","meta":"the_buckets"},
{"name":"Candorville","meta":"candorville"},
{"name":"Cheap Thrills","meta":"cheap_thrills"},
{"name":"Committed","meta":"committed"},
{"name":"Cow & Boy","meta":"cow&boy"},
{"name":"Dilbert","meta":"dilbert"},
{"name":"The Dinette Set","meta":"the_dinette_set"},
{"name":"Dog eat Doug","meta":"dog_eat_doug"},
{"name":"Drabble","meta":"drabble"},
{"name":"Family Tree","meta":"family_tree"},
{"name":"Farcus","meta":"farcus"},
{"name":"Fat Cats Classics","meta":"fat_cats_classics"},
{"name":"Flight Deck","meta":"flight_deck"},
{"name":"Flo & Friends","meta":"flo&friends"},
{"name":"F Minus","meta":"f_minus"},
{"name":"Frank & Ernest","meta":"frank&ernest"},
{"name":"Frazz","meta":"frazz"},
{"name":"Free Range","meta":"free_range"},
{"name":"Geech Classics","meta":"geech_classics"},
{"name":"Get Fuzzy","meta":"get_fuzzy"},
{"name":"Girls & Sports","meta":"girls&sports"},
{"name":"Graffiti","meta":"graffiti"},
{"name":"Grand Avenue","meta":"grand_avenue"},
{"name":"The Grizzwells","meta":"the_grizzwells"},
{"name":"Heathcliff","meta":"heathcliff"},
{"name":"Herb and Jamaal","meta":"herb_and_jamaal"},
{"name":"Herman","meta":"herman"},
{"name":"The Humble Stumble","meta":"the_humble_stumble"},
{"name":"Jane's World","meta":"janes_world"},
{"name":"Jump Start","meta":"jump_start"},
{"name":"Kit 'N' Carlyle","meta":"kit_n_carlyle"},
{"name":"The Knight Life","meta":"the_knight_life"},
{"name":"Liberty Meadows","meta":"liberty_meadows"},
{"name":"Li'l Abner Classics","meta":"lil_abner_classics"},
{"name":"Lola","meta":"lola"},
{"name":"Luann","meta":"luann"},
{"name":"Marmaduke","meta":"marmaduke"},
{"name":"Meg! Classics","meta":"meg_classics"},
{"name":"The Meaning of Lila","meta":"the_meaning_of_lila"},
{"name":"Minimum Security","meta":"minimum_security"},
{"name":"Moderately Confused","meta":"moderately_confused"},
{"name":"Momma","meta":"momma"},
{"name":"Monty","meta":"monty"},
{"name":"Motley Classics","meta":"motley_classics"},
{"name":"Nancy","meta":"nancy"},
{"name":"Natural Selection","meta":"natural_selection"},
{"name":"Off The Mark","meta":"off_the_mark"},
{"name":"On a Claire Day","meta":"on_a_claire_day"},
{"name":"One Big Happy Classics","meta":"one_big_happy_classics"},
{"name":"The Other Coast","meta":"the_other_coast"},
{"name":"Over the Hedge","meta":"over_the_hedge"},
{"name":"PC and Pixel","meta":"pc_and_pixel"},
{"name":"Peanuts","meta":"peanuts"},
{"name":"Pearls Before Swine","meta":"pearls_before_swine"},
{"name":"Pickles","meta":"pickles"},
{"name":"Raising Duncan Classics","meta":"raising_duncan_classics"},
{"name":"Reality Check","meta":"reality_check"},
{"name":"Red & Rover","meta":"red&rover"},
{"name":"Ripley's Believe It or Not!","meta":"ripleys_believe_it_or_not"},
{"name":"Rose Is Rose","meta":"rose_is_rose"},
{"name":"Rubes","meta":"rubes"},
{"name":"Rudy Park","meta":"rudy_park"},
{"name":"Shirley and Son Classics","meta":"shirley_and_son_classics"},
{"name":"Soup To Nutz","meta":"soup_to_nutz"},
{"name":"Speed Bump","meta":"speed_bump"},
{"name":"Spot The Frog","meta":"spot_the_frog"},
{"name":"Strange Brew","meta":"strange_brew"},
{"name":"The Sunshine Club","meta":"the_sunshine_club"},
{"name":"Tarzan Classics","meta":"tarzan_classics"},
{"name":"That's Life","meta":"thats_life"},
{"name":"Watch Your Head","meta":"watch_your_head"},
{"name":"Wizard of Id","meta":"wizard_of_id"},
{"name":"Working Daze","meta":"working_daze"},
{"name":"Working It Out","meta":"working_it_out"},
{"name":"Zack Hill","meta":"zack_hill"},
{"name":"Ferd'nand","meta":"ferdnand"},
{"name":"Rip Haywire","meta":"rip_haywire"},
{"name":"The Barn","meta":"the_barn"},
{"name":"Home and Away","meta":"home_and_away"},
{"name":"Little Dog Lost","meta":"little_dog_lost"},
{"name":"Daddy's Home","meta":"daddys_home"},
{"name":"Scary Gary","meta":"scary_gary"},
{"name":"Nest Heads","meta":"nest_heads"},
{"name":"Unstrange Phenomena","meta":"unstrange_phenomena"},
{"name":"Prickly City","meta":"prickly_city"},
{"name":"Fort Knox","meta":"fort_knox"},
{"name":"Cafe Con Leche","meta":"cafe_con_leche"},
{"name":"Animal Crackers","meta":"animal_crackers"},
{"name":"Bliss","meta":"bliss"},
{"name":"Bottom Liners","meta":"bottom_liners"},
{"name":"Bound and Gagged","meta":"bound_and_gagged"},
{"name":"Brewster Rockit","meta":"brewster_rockit"},
{"name":"Broom-Hilda","meta":"broom-hilda"},
{"name":"Dick Tracy","meta":"dick_tracy"},
{"name":"Gasoline Alley","meta":"gasoline_alley"},
{"name":"Gil Thorp","meta":"gil_thorp"},
{"name":"Loose Parts","meta":"loose_parts"},
{"name":"Love Is...","meta":"love_is"},
{"name":"The Middletons","meta":"the_middeltons"},
{"name":"Pluggers","meta":"pluggers"},
{"name":"Sylvia","meta":"sylvia"},
{"name":"9 to 5","meta":"9_to_5"},
{"name":"Chuckle Bros","meta":"chuckle_bros"},
{"name":"Barney & Clyde","meta":"barney&clyde"},
{"name":"Today's Dogg","meta":"todays_dogg"},
{"name":"Freshly Squeezed","meta":"freshly_squeezed"},
{"name":"Frazz Holiday","meta":"frazz_holiday"},
{"name":"Dude and Dude","meta":"dude_and_dude"},
{"name":"Reply All","meta":"reply_all"}
]

for y in comicscom:
    c = Comic(name = y['name'], author = "", ctype = 3, meta = y['meta'], num_entries = 0)
    c.put()