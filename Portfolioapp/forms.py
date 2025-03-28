from django import forms
from .models import Contact

class Contactform(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ['name', 'email', 'organization', 'message']
        widgets = {
        'name': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Enter your name', 'required': True}),
        'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Enter your email', 'required': True}),
        'organization': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Organization (optional)'}),
        'message': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Any message for me', 'rows': 5, 'required': True}),
        }
        