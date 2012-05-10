{"comics": [
    {% for comic in comics %}
    { 
        "name": "{{comic.name}}",
        "source": {{comic.ctype}},
        "num_entries": {{comic.num_entries}},
        "id": {{comic.id}}
    } {% if not forloop.last %},{% endif %}
    {% endfor  %}
]}