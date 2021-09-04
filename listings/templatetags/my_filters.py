import os

from django import template

register = template.Library()

@register.filter(name='times') 
def times(number):
    if number >= 4.5:
        return range(5)
    elif number >= 3.5 and number < 4.5:
        return range(4)
    elif number >=2.5 and number < 3.5:
        return range(3)
    elif number >= 1.5 and number < 2.5:
        return range(2)
    else:
        return range(1)


