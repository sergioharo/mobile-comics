{"comics": [
    {% for comic in comics %}
    { 
        "name": "{{comic.name}}",
        "source": {{comic.ctype}},
        "id": {{comic.id}}
    } {% if not forloop.last %},{% endif %}
    {% endfor  %}
]}