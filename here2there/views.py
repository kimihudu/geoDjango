# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render_to_response


# Create your views here.
def home(request):
    return render_to_response('home.html', {
    })

def contact(request):
    return render_to_response('contactus.html', {
    })

def mapview(request):
    return render_to_response('mapview.html', {
    })

def transport(request):
    return render_to_response('transport.html', {
    })