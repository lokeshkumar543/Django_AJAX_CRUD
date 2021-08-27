from django.shortcuts import render
from .forms import UserRegistration
from .models import Student
from django .http import JsonResponse
# Create your views here.
def Home(request):
    form=UserRegistration()
    stu=Student.objects.all()
    return render(request,'index.html',{"form":form,"stu":stu})

def data_save(request):
    if request.method=="POST":
        form=UserRegistration(request.POST)
        if form.is_valid():
            sid=request.POST.get('stid')
            name=request.POST['name']
            email=request.POST['email']
            password=request.POST['password']
            if(sid==""):
                 st=Student(name=name,email=email,password=password)
            else:
                st = Student(id=sid,name=name, email=email, password=password)
            st.save()
            data1=Student.objects.values()
            student_data=list(data1)
            return JsonResponse({"status":"Save","student_data":student_data})
        else:
            return JsonResponse({"status": 0})
    else:
        return JsonResponse({"status": 0})

def data_delete(request):
    if request.method=="POST":
        id=request.POST.get('sid')
        pi=Student.objects.get(pk=id)
        pi.delete()
        return JsonResponse({"status":1})
    else:
        return JsonResponse({"status": 0})

def data_edit(request):
    if request.method=="POST":
        id=request.POST.get('sid')
        student=Student.objects.get(pk=id)
        student_data={"id":student.id,"name":student.name,"email":student.email,"password":student.password}
        return JsonResponse(student_data)
    else:
        return JsonResponse({"status":0})