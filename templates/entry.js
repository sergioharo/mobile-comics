{ "entries": [
    {% for entry in entries %}
    {
    "id": {{entry.id}},
    "comic_id": {{entry.comic.id}},
    "comic_entry_id": {{entry.num}},
    "img_url": "{{entry.img_url}}"
    }{% if not forloop.last %},{% endif %}
    {% endfor  %}
]}