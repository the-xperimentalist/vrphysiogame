from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_protect

def index(request):
    return render(request, 'base.html', {})

@csrf_protect
def pose_data(request):
    try:
        print("method called")
        print(request)
        print(request.method)
        print(request.POST)
        print(dict(request.POST))
        return HttpResponse(status=204)
    except Exception:
        logging.exception("Got exception")
        return HttpResponse(status=400)
