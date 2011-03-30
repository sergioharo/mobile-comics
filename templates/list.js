{"comics": [
    {% for comic in comics %}
    { 
        "name": "{{comic.name}}",
        "author": "{{comic.author}}",
        "num_entries": {{comic.num_entries}},
        "id": {{comic.id}},
        "img_url": "{{comic.last_entry.img_url}}"
    }{% if not forloop.last %},{% endif %}
    {% endfor  %}
]}