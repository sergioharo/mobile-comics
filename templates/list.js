{"comics": [
    {% for comic in comics %}
    { 
        "name": "{{comic.name}}",
        "author": "{{comic.author}}",
        "id": {{comic.id}},
        "num_entries": {{comic.num_entries}},
        "img_url": "{{comic.last_entry.img_url}}"
    }{% if not forloop.last %},{% endif %}
    {% endfor  %}
]}