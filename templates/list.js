{"comics": [
    {% for comic in comics %}
    { 
        "id": {{comic.id}},
        "name": "{{comic.name}}",
        "author": "{{comic.author}}",
        "num_entries": {{comic.num_entries}},
        "img_url": "{{comic.last_entry.img_url}}"
    }{% if not forloop.last %},{% endif %}
    {% endfor  %}
]}