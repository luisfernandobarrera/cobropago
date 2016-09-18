from django.shortcuts import render
from django.views.generic import TemplateView
from django.shortcuts import render
from rest_framework.decorators import api_view, renderer_classes
from rest_framework import response, schemas
from rest_framework_swagger.renderers import OpenAPIRenderer, SwaggerUIRenderer



class HomePageView(TemplateView):
    template_name = 'base.html'


def mockup_view(request, template_name='index'):
    template_name = ''.join(['mockup/', template_name, '.html'])
    return render(request, template_name)


@api_view()
@renderer_classes([OpenAPIRenderer, SwaggerUIRenderer])
def schema_view(request):
    generator = schemas.SchemaGenerator(title='Cobropago API')
    return response.Response(generator.get_schema(request=request))
