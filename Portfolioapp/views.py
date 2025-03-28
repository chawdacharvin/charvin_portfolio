from django.shortcuts import render, HttpResponse,redirect
from .models import *
from .forms import *
from django.core.mail import send_mail
from django.contrib import messages
import json, pickle, random
from django.http import JsonResponse


def healthcheck(request):
    return JsonResponse({"status": "ok"})
def home(request):
    return render(request, "index.html")


def about(request):
    return render(request, "about.html")



def contact(request):
    if request.method == "POST":
        form = Contactform(request.POST)
        if form.is_valid():
            contact = form.save()
            # Auto-reply email
            subject = "Thank You for Reaching Out – We've Received Your Message!"
            message = f"""
            Hello {contact.name},<br><br>

            Thank you for getting in touch! I truly appreciate your message and will review it as soon as possible.<br><br>

            <b>Here’s what you shared with me:</b><br>
            --------------------------------------------------<br>
            {contact.message}<br>
            --------------------------------------------------<br><br>

            I’ll do my best to respond to you promptly. In the meantime, feel free to connect with me on  
            <a href="https://www.linkedin.com/in/charvin-chawda-81324825a/" target="_blank">LinkedIn</a>.<br><br>

            Looking forward to our conversation!<br><br>

            Best regards,<br>  
            Charvin Chawda<br>  
            <a href="https://charvin-portfolio.onrender.com">Your Portfolio</a><br>
            """
            recipient_list = [contact.email]
            from_email = "chawdacharvinj@gmail.com"
            send_mail(subject, message, from_email, recipient_list, html_message=message)
            messages.success(request, "Message is sent to you.")
            return redirect("contact")
    else:
        form = Contactform()
    
    return render(request, "contact.html", {"form": form})


def projects(request):
    project = Project.objects.all()
    cont = {
        "projects":project
    }
    return render(request, "projects.html", cont)


with open("Portfolioapp/Chatbot/chatbot_model.pkl", "rb") as model_file:
    chatbot = pickle.load(model_file)

# Load intents
with open("Portfolioapp/Chatbot/data.json", "r") as file:
    data = json.load(file)

def get_response(user_input):
    # user_input = user_input.lower()
    predicted_tag = chatbot.predict([user_input])[0]

    # Find the response for the predicted tag
    for intent in data["intents"]:
        if intent["tag"] == predicted_tag:
            return random.choice(intent["responses"])

    return "Sorry, I don't understand."



def chatbot_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_message = data.get("message", "").strip()

        if not user_message:
            return JsonResponse({"error": "Empty Message"}, status=400)
        bot_response = get_response(user_message)
        return JsonResponse({"response": bot_response})
