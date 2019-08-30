from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
# from camdetection.forms import SignupForm
from camdetection.models import UserDatabase
from pprint import pprint


@login_required
def phone_reg_detect(request, *args, **kwargs):
    return render(request, 'phone_reg_detect.html', {})

@login_required
def cam_detect(request, user_db_id):
    user_db = UserDatabase.objects.get(id=user_db_id)
    print(user_db)
    return render(request, 'cam_detect.html', {})

@login_required
def enter_cam(request):
    print("Entered enter_cam")
    if request.method == 'POST':
        print("In true")
        rPOST = dict(request.POST)
        print(rPOST)
        phone_reg_name = rPOST['phone_reg_name'][0]
        print(phone_reg_name)
        user_db = UserDatabase.objects.get(phone_reg_name=phone_reg_name)
        print(user_db)
        # return redirect(f'/cam_detect/{user_db.id}/')
        return HttpResponse(str(user_db.id))

@csrf_protect
def pose_data(request, user_db_id):
    user_db = UserDatabase.objects.get(id=user_db_id)
    try:
        if request.method == "POST":
            given_data = dict(request.POST)
            print("\n\n")
            pprint(given_data)
            print("\n\n")
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
                return redirect('/phone_reg_detect/')
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
            return redirect('/phone_reg_detect/')
    else:
        form = UserCreationForm()
    return render(request, 'signup.html', {'form': form})
