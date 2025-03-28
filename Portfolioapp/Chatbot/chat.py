import json
import pickle
import random

# Load trained model
with open("C:/Users/HP/Desktop/Django Projects/PORTFOLIO/portfolio/Portfolioapp/Chatbot/chatbot_model.pkl", "rb") as model_file:
    chatbot = pickle.load(model_file)

# Load intents
with open("C:/Users/HP/Desktop/Django Projects/PORTFOLIO/portfolio/Portfolioapp/Chatbot/data.json", "r") as file:
    data = json.load(file)

# Function to get a response
def get_response(user_input):
    # user_input = user_input.lower()
    predicted_tag = chatbot.predict([user_input])[0]

    # Find the response for the predicted tag
    for intent in data["intents"]:
        if intent["tag"] == predicted_tag:
            return random.choice(intent["responses"])

    return "Sorry, I don't understand."

# Chat loop
while True:
    user_input = input("You: ")
    if user_input.lower() in ["exit", "quit"]:
        print("Bot: Goodbye! Have a great day ahead! 😊")
        break
    response = get_response(user_input)
    print("Bot:", response)