from nltk.tokenize import word_tokenize
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from prediction.apps import PredictionConfig
from prediction.apps import preprocess_text
from google_trans_new import google_translator
from wordcloud import WordCloud, STOPWORDS
import matplotlib.pyplot as plt
import pandas as pd
from selenium import webdriver
from selenium.common import exceptions
from dateutil.parser import parse
import sys
import time
import json
import tweepy
from nltk.corpus import stopwords
import nltk
import numpy as np
nltk.download('stopwords')


whitelist = set('abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ')

ml_model = PredictionConfig.mlmodel
translator = google_translator()\



def wordCloudGenerator(sentences):
    wordCloudWords = []
    words = []
    for sentence in sentences:
        sentence = sentence.lower()
        wordsArray = word_tokenize(sentence)
        cleanedWords = [
            word for word in wordsArray if not word in stopwords.words()]
        punctuations = ["?", ".", "!", "-", "_", "user", "rt", "url"]
        numbers = list(map(str, range(100 + 1)))
        not_needed = np.concatenate((punctuations, numbers))
        for word in cleanedWords:
            if not word in not_needed:
                words.append(word)
    uniques = []
    for word in words:
        if word not in uniques:
            uniques.append(word)
    counts = []
    for unique in uniques:
        count = 0
        for word in words:
            if word == unique:
                count += 1
        counts.append((count, unique))

    counts.sort()
    counts.reverse()
    for i in range(len(counts)):
        count, word = counts[i]
        wordCloudWords.append({"text": word, "value": count})
    return wordCloudWords
    # stopwords = set(STOPWORDS)
    # words = ""
    # for val in sentenceList:
    #     val = str(val)
    #     tokens = val.split()
    #     for i in range(len(tokens)):
    #         tokens[i] = tokens[i].lower()
    #     words += " ".join(tokens)+" "

    # wordcloud = WordCloud(width=800, height=800,
    #                       background_color='white',
    #                       stopwords=stopwords,
    #                       min_font_size=10).generate(words)
    # plt.figure()
    # plt.axis("off")
    # wordcloud.to_file("D:/first_review.png")


class YoutubeScraper(APIView):
    def post(self, request, format=None):
        data = request.data
        dataUsername = []
        dataComments = []
        all_prediction = []
        positive = 0
        negative = 0
        neutral = 0
        options = webdriver.ChromeOptions()
        options.headless = True
        driver = webdriver.Chrome(
            'D:\chromedriver', chrome_options=options)
        try:
            driver.get(data['url'])
            time.sleep(5)
            try:
                title = driver.find_element_by_xpath(
                    '//*[@id="container"]/h1/yt-formatted-string').text
                date = driver.find_element_by_xpath(
                    '//*[@id="date"]/yt-formatted-string').text
                description = driver.find_element_by_xpath(
                    '//*[@id="description"]/yt-formatted-string').text
                youtuber = driver.find_element_by_xpath(
                    '//*[@id="channel-name"]/div/div/yt-formatted-string').text

                comment_section = driver.find_element_by_xpath(
                    '//*[@id="comments"]')
            except exceptions.NoSuchElementException:
                error = "Error: Element may not be loaded"
                print(error)

            driver.execute_script(
                "arguments[0].scrollIntoView();", comment_section)
            time.sleep(5)

            last_height = driver.execute_script(
                "return document.documentElement.scrollHeight")
            x = 0
            while True:
                driver.execute_script(
                    "window.scrollTo(0, document.documentElement.scrollHeight);")
                time.sleep(1)
                new_height = driver.execute_script(
                    "return document.documentElement.scrollHeight")
                if new_height == last_height:
                    break
                if (x > 5):
                    break
                x = x + 1
                last_height = new_height

            driver.execute_script(
                "window.scrollTo(0, document.documentElement.scrollHeight);")

            try:
                username_elems = driver.find_elements_by_xpath(
                    '//*[@id="author-text"]')
                comment_elems = driver.find_elements_by_xpath(
                    '//*[@id="content-text"]')
            except exceptions.NoSuchElementException:
                error = "Error: Element may not be loaded"
                print(error)
            processedList = []
            translateText = ""
            finalText = ""
            for username, comment in zip(username_elems, comment_elems):
                dataUsername.append(username.text)
                translateText = translator.translate(
                    comment.text, lang_tgt='en')
                finalText = preprocess_text(translateText)
                processedList.append(finalText)
                all_prediction.append(
                    (str(ml_model.predict([finalText])[0])).capitalize())
                dataComments.append(comment.text)
                # print(comment.text)
                # if(dataComments.length == 150):
                #     break
            driver.close()

            for prediction in all_prediction:
                if prediction == "Positive":
                    positive += 1
                elif prediction == "Negative":
                    negative += 1
                else:
                    neutral += 1

            wordCloudWords = wordCloudGenerator(processedList)
            response_dict = {"title": title, "date": date, "description": description,
                             "youtuber": youtuber, "Usernames": dataUsername, 'Comments': dataComments, 'Polarity': all_prediction, "wordCloudWords": wordCloudWords, "Results": {"Positive": positive/len(
                                 all_prediction) * 100, "Negative": negative/len(all_prediction) * 100, "Neutral": neutral/len(all_prediction) * 100}}
            return Response(response_dict, status=200)
        except BaseException as e:
            print('failed on_status,', str(e))
            return Response(str(e), status=400)


class Twitter(APIView):
    def post(self, request, format=None):
        data = request.data
        tweets_list = []
        all_prediction = []
        positive = 0
        negative = 0
        neutral = 0
        consumer_key = "ZP2hPZoUtpxuA2CHZ2UBKKoSk"
        consumer_secret = "fPGGTqTGTWHtAjQAbI3Cn9aF8L6Ya9GtpZ1fG9Lzs1j7lvU56W"
        access_token = "743845840993812480-XUNg6bA4uWn2h1fBebyKXQdh11Qrmjk"
        access_token_secret = "N3WBA1LvPLNw4oHrFPALVW0yhW0ykziNf4mm8v46MhLkH"
        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        api = tweepy.API(auth, wait_on_rate_limit=True)
        count = 100
        translateText = ""
        finalText = ""
        processedList = []
        try:

            tweets = tweepy.Cursor(api.search, q=data['keyword']).items(count)
            for tweet in tweets:
                translateText = translator.translate(tweet.text, lang_tgt='en')
                finalText = preprocess_text(translateText)
                processedList.append(finalText)
                all_prediction.append(
                    str(ml_model.predict([finalText])[0]).capitalize())
                tweets_list.append({"date": tweet.created_at, "id": tweet.id, "username": "@"+tweet.user.screen_name,
                                    "text": tweet.text, "polarity": str(ml_model.predict([finalText])[0]).capitalize()})
            for prediction in all_prediction:
                if prediction == "Positive":
                    positive += 1
                elif prediction == "Negative":
                    negative += 1
                else:
                    neutral += 1

            wordCloudWords = wordCloudGenerator(processedList)
            response_dict = {"Tweets": tweets_list, "wordCloudWords": wordCloudWords, "Results": {"Positive": positive/len(
                all_prediction) * 100, "Negative": negative/len(all_prediction) * 100, "Neutral": neutral/len(all_prediction) * 100}}

            return Response(response_dict, status=200)
        except BaseException as e:
            print('failed on_status,', str(e))
            return Response(str(e), status=400)
            # time.sleep(3)


class InstagramScraper(APIView):
    def post(self, request, format=None):
        data = request.data
        all_prediction = []
        positive = 0
        negative = 0
        neutral = 0
        post = ""
        options = webdriver.FirefoxOptions()
        options.headless = True
        driver = webdriver.Firefox(
            options=options, executable_path=r'D:/geckodriver.exe')
        try:
            driver.get(data['url'])
            time.sleep(3)

            try:
                close_button = driver.find_element_by_class_name('xqRnw')
                close_button.click()
            except:
                pass

            try:
                load_more_comment = driver.find_element_by_css_selector(
                    '.NUiEW > button:nth-child(1)')
                print("Found {}".format(str(load_more_comment)))
                i = 0
                while load_more_comment.is_displayed() and i < 20:
                    load_more_comment.click()
                    time.sleep(1)
                    load_more_comment = driver.find_element_by_css_selector(
                        '.NUiEW > button:nth-child(1)')
                    print("Found {}".format(str(load_more_comment)))
                    i += 1
            except Exception as e:
                print(e)
                pass
            translateText = ""
            finalText = ""
            user_names = []
            user_comments = []
            date_time = []
            processedList = []
            comment = driver.find_elements_by_class_name('gElp9 ')
            postboxes = driver.find_element_by_class_name('C4VMK')
            descriptionbox = postboxes.find_elements_by_tag_name('span')
            for lines in descriptionbox:
                post = post + lines.text
            for c in comment:
                container = c.find_element_by_class_name('C4VMK')
                name = container.find_element_by_class_name('_6lAjh').text
                content = container.find_element_by_tag_name('span').text
                dt = container.find_element_by_tag_name(
                    'time').get_attribute('datetime')
                content = content.replace('\n', ' ').strip().rstrip()
                newdate = parse(dt)
                dt = newdate.strftime("%d-%m-%Y, %H:%M:%S")
                user_names.append(name)
                translateText = translator.translate(content, lang_tgt='en')
                finalText = preprocess_text(translateText)
                processedList.append(finalText)
                user_comments.append(content)
                date_time.append(dt)
                all_prediction.append(
                    str(ml_model.predict([finalText])[0]).capitalize())

            # user_names.pop(0)
            # user_comments.pop(0)
            # import excel_exporter
            # excel_exporter.export(user_names, user_comments)

            driver.close()

            for prediction in all_prediction:
                if prediction == "Positive":
                    positive += 1
                elif prediction == "Negative":
                    negative += 1
                else:
                    neutral += 1

            wordCloudWords = wordCloudGenerator(processedList)

            response_dict = {"Usernames": user_names, "Post": post,
                             "time": date_time, 'Comments': user_comments, 'Polarity': all_prediction, "wordCloudWords": wordCloudWords, "Results": {"Positive": positive/len(
                                 all_prediction) * 100, "Negative": negative/len(all_prediction) * 100, "Neutral": neutral/len(all_prediction) * 100}}
            return Response(response_dict, status=200)
        except BaseException as e:
            print('failed on_status,', str(e))
            return Response(str(e), status=400)


class FacebookScraper(APIView):
    def post(self, request, format=None):
        data = request.data
        dataComments = []
        all_prediction = []
        positive = 0
        negative = 0
        neutral = 0
        options = webdriver.ChromeOptions()
        options.headless = True
        driver = webdriver.Chrome(
            'D:\chromedriver', chrome_options=options)
        try:
            driver.get(data['url'].replace("www.facebook", "m.facebook"))
            time.sleep(5)
            title = ""
            timelist = []
            postlist = []
            finalText = ""
            processedList = []
            translateText = ""
            last_height = driver.execute_script(
                "return document.documentElement.scrollHeight")
            x = 0
            while True:
                driver.execute_script(
                    "window.scrollTo(0, document.documentElement.scrollHeight);")
                time.sleep(3)
                new_height = driver.execute_script(
                    "return document.documentElement.scrollHeight")
                if new_height == last_height:
                    print("last point")
                    break
                if (x > 15):
                    break
                x = x+1
                last_height = new_height

            driver.execute_script(
                "window.scrollTo(0, document.documentElement.scrollHeight);")

            try:
                title = driver.find_element_by_class_name(
                    '_59k').text
                posts = driver.find_elements_by_tag_name(
                    'p')
                times = driver.find_elements_by_tag_name('abbr')

                for post in posts:
                    if(post.text != ""):
                        translateText = translator.translate(
                            post.text, lang_tgt='en')
                        finalText = preprocess_text(translateText)
                        processedList.append(finalText)
                        all_prediction.append(
                            str(ml_model.predict([finalText])[0]).capitalize())
                        postlist.append(post.text)
                s = 0
                for tm in times:
                    if(s < len(posts) and posts[s].text != ""):
                        timelist.append(tm.text)
                    s = s+1
                # comment_elems = driver.find_elements_by_xpath(
                #     '//*[@id="content-text"]')
            except exceptions.NoSuchElementException:
                error = "Error: Element may not be loaded"
                print(error)
            driver.close()

            for prediction in all_prediction:
                if prediction == "Positive":
                    positive += 1
                elif prediction == "Negative":
                    negative += 1
                else:
                    neutral += 1
            wordCloudWords = wordCloudGenerator(processedList)
            response_dict = {"PageName": title,
                             "Posts": postlist, "Times": timelist, 'Polarity': all_prediction, "wordCloudWords": wordCloudWords, "Results": {"Positive": positive/len(
                                 all_prediction) * 100, "Negative": negative/len(all_prediction) * 100, "Neutral": neutral/len(all_prediction) * 100}}
            return Response(response_dict, status=200)
        except BaseException as e:
            print('failed on_status,', str(e))
            return Response(str(e), status=400)
