import json
import nltk
import random
import numpy as np
import pickle
from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline


#open the dataset and load in python dict.
with open('data.json',"r") as file:
    data = json.load(file)

# Prepare training data
patterns, tags = [], []
for intent in data["intents"]:
    for pattern in intent["patterns"]:
        patterns.append(pattern)
        tags.append(intent["tag"])

# Machine Learning Pipeline
pipeline = Pipeline([
    ("vectorizer", CountVectorizer()),
    ("tfidf", TfidfTransformer()),
    ("classifier", MultinomialNB())
])

pipeline.fit(patterns, tags)
# Save trained model
with open("chatbot_model.pkl", "wb") as model_file:
    pickle.dump(pipeline, model_file)

print("Chatbot model trained and saved successfully!")

