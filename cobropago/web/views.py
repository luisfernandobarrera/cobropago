from django.shortcuts import render
from django.views.generic import TemplateView
from django.shortcuts import render


class HomePageView(TemplateView):
    template_name = 'base.html'


def mockup_view(request, template_name='index'):
    template_name = ''.join(['mockup/', template_name, '.html'])
    return render(request, template_name)
