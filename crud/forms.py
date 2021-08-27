from django import forms
from .models import Student
class UserRegistration(forms.ModelForm):
    class Meta:
        model=Student
        fields=['name','email','password']
        widgets={
            'name':forms.TextInput(attrs={'class':'form-control','id':'nameid'}),
            'email':forms.TextInput(attrs={'class':'form-control','id':'emailid'}),
            'password':forms.PasswordInput(attrs={'class':'form-control','id':'passwordid'})}