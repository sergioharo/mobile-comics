# Mobile Comics
    Mobile comics is an app for Google App Engine for viewing the daily comics. 
    It comes in two parts. The server side component crawls a number of sites
    every day and saves all the new comics it comes across. The client side 
    component uses is a web app built on [sencha touch] that saves your list of
    comics locally and displays the most current version. It also allows you to
    go back and view older comics.
    
## Installation
    To install, it is fairly easy, just deploy your app using Google App Engine.
    To prefill the list of comics call the following URL as admin: 
    
    http://[your domain]/tasks/preload/0
    
    From then on, each day a cron job will run populating your table with the
    newest comics.
    
## Adding new sources
    To add a new source, you should do the following tasks
    
    1. In models.py, add a new type for your source.
    2. Create a fetcher which should crawl a page given a certain comic, and 
    extract the latest comic.
    3. Add your fetcher to the FETCHERS map
    4. Add to preload.py, so that new instances can propulate the list of comics
    obtained from that source.
    
[sencha touch]: http://www.sencha.com/products/touch/
