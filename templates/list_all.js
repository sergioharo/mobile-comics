{"comics": [
    {% for comic in comics %}
    { 
        "name": "{{comic.name}}",
        "id": {{comic.id}}
    } {% if not forloop.last %},{% endif %}
    {% endfor  %}
]}