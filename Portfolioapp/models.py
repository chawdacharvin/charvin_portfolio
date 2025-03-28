from django.db import models

class Project(models.Model):
    description = models.TextField()
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='projects/')
    link = models.URLField(blank=True, null=True)
    livedemo = models.URLField(blank=True,null=True)
    technologies = models.CharField(max_length=255)
    created_on = models.DateTimeField()
    category = models.CharField(max_length=50, default="")

    def __str__(self):
        return self.title

class Contact(models.Model):
    name = models.CharField(max_length=30)
    email = models.EmailField()
    organization = models.CharField(max_length=50, null=True, blank=True)
    message=models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email}"
