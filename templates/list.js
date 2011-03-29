{"comics": [
    {% for comic in comics %}
    { 
        "name": "{{comic.name}}",
        "author": "{{comic.author}}",
        "last_comic": {{comic.num_entries}},
        "id": {{comic.id}},
        "img_src": "{{comic.last_entry.img_url}}"
    }{% if not forloop.last %},{% endif %}
    {% endfor  %}
]}