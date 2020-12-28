from django.apps import AppConfig
import pandas as pd
from joblib import load
import os
import numpy as np
import re
from sklearn.pipeline import Pipeline
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import classification_report


def preprocess_text(text):
    text = re.sub('((www\.[^\s]+)|(https?://[^\s]+))', 'URL', str(text))
    text = re.sub('@[^\s]+', 'USER', str(text))
    text = str(text).lower().replace("ё", "е")
    text = re.sub('[^a-zA-Zа-яА-Я1-9]+', ' ', str(text))
    text = re.sub(' +', ' ', str(text))
    return text.strip()


def prepare_ml_model():
    dataset = pd.read_csv('train.csv')
    dataset.head()

    negativeDataFrame = dataset[dataset['sentiment'] == 'negative'][:6500]

    positiveDataFrame = dataset[dataset['sentiment'] == 'positive'][:7781]

    neutralDataFrame = dataset[dataset['sentiment'] == 'neutral'][:5000]

    merged_df = pd.concat(
        [negativeDataFrame, positiveDataFrame, neutralDataFrame])
    # merged_df['sentiment'].value_counts()

    merged_df['text'] = [preprocess_text(t) for t in merged_df['text']]

    text_clf = Pipeline([('vect', CountVectorizer()),
                         ('tfidf', TfidfTransformer()),
                         ('clf', MultinomialNB())])

    tuned_parameters = {
        'vect__ngram_range': [(1, 1), (1, 2), (2, 2)],
        'tfidf__use_idf': (True, False),
        'tfidf__norm': ('l1', 'l2'),
        'clf__alpha': [1, 1e-1, 1e-2]
    }

    x_train, x_test, y_train, y_test = train_test_split(
        merged_df['text'], merged_df['sentiment'], test_size=0.05, random_state=42)

    ml_model = GridSearchCV(text_clf, tuned_parameters, cv=2)
    ml_model.fit(x_train, y_train)

    return ml_model


class PredictionConfig(AppConfig):
    name = 'prediction'
    mlmodel = prepare_ml_model()
