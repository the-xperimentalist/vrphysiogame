from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
# from camdetection.forms import SignupForm


@login_required
def index(request):
    return render(request, 'base.html', {})

@csrf_protect
def pose_data(request):
    try:
        if request.method == "POST":
            given_data = dict(request.POST)
        return HttpResponse(status=204)
    except Exception:
        logging.exception("Got exception")
        return HttpResponse(status=400)

def login_view(request):
    if request.user.is_authenticated:
        return HttpResponse('{} Already logged in'.format(request.user))

    if request.method == 'POST':
        loginform = AuthenticationForm(data=request.POST)
        if loginform.is_valid():
            username = loginform.cleaned_data['username']
            password = loginform.cleaned_data['password']
            user = authenticate(username=username, password=password)
            if user:
                login(request, user)
                return redirect('/')
    else:
        loginform = AuthenticationForm()
    return render(request, 'login.html', {'loginform': loginform})

@login_required
def logout_view(request):
    logout(request)
    return redirect('/')

def signup(request):
    print(request.method)
    if request.method == 'POST':
        print(request.POST)
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data['username']
            raw_password = form.cleaned_data['password1']
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('/pose_detect/')
    else:
        form = UserCreationForm()
    return render(request, 'signup.html', {'form': form})
