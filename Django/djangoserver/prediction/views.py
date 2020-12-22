from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from prediction.apps import PredictionConfig
import pandas as pd
from selenium import webdriver
from selenium.common import exceptions
from dateutil.parser import parse
import sys
import time
import json
import tweepy

whitelist = set('abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ')

ml_model = PredictionConfig.mlmodel


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
            if (x > 0):
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

        for username, comment in zip(username_elems, comment_elems):
            dataUsername.append(username.text)
            dataComments.append(
                ''.join(filter(whitelist.__contains__, comment.text)))
            # print(comment.text)
            # if(dataComments.length == 150):
            #     break
        driver.close()

        for text in dataComments:
            all_prediction.append(ml_model.predict([text])[0])

        for prediction in all_prediction:
            if prediction == "Positive":
                positive += 1
            elif prediction == "Negative":
                negative += 1
            else:
                neutral += 1
        response_dict = {"title": title, "date": date, "description": description,
                         "youtuber": youtuber, "Usernames": dataUsername, 'Comments': dataComments, 'Polarity': all_prediction, "Results": {"Positive": positive/len(
                             all_prediction) * 100, "Negative": negative/len(all_prediction) * 100, "Neutral": neutral/len(all_prediction) * 100}}
        return Response(response_dict, status=200)


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
        try:

            tweets = tweepy.Cursor(api.search, q=data['keyword']).items(count)
            for tweet in tweets:
                all_prediction.append(ml_model.predict([tweet.text])[0])
                tweets_list.append({"date": tweet.created_at, "id": tweet.id,
                                    "text": tweet.text, "polarity": ml_model.predict([tweet.text])[0]})
            for prediction in all_prediction:
                if prediction == "Positive":
                    positive += 1
                elif prediction == "Negative":
                    negative += 1
                else:
                    neutral += 1
            response_dict = {"Tweets": tweets_list, "Results": {"Positive": positive/len(
                all_prediction) * 100, "Negative": negative/len(all_prediction) * 100, "Neutral": neutral/len(all_prediction) * 100}}

            return Response(response_dict, status=200)
        except BaseException as e:
            print('failed on_status,', str(e))
            time.sleep(3)


class InstagramScraper(APIView):
    def post(self, request, format=None):
        data = request.data
        all_prediction = []
        positive = 0
        negative = 0
        neutral = 0
        options = webdriver.FirefoxOptions()
        options.headless = True
        driver = webdriver.Firefox(
            options=options, executable_path=r'D:/geckodriver.exe')
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

        user_names = []
        user_comments = []
        date_time = []
        comment = driver.find_elements_by_class_name('gElp9 ')
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
            user_comments.append(content)
            date_time.append(dt)
            all_prediction.append(ml_model.predict([content])[0])

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
        response_dict = {"Usernames": user_names,
                         "time": date_time, 'Comments': user_comments, 'Polarity': all_prediction, "Results": {"Positive": positive/len(
                             all_prediction) * 100, "Negative": negative/len(all_prediction) * 100, "Neutral": neutral/len(all_prediction) * 100}}
        return Response(response_dict, status=200)


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
        driver.get(data['url'].replace("www.facebook", "m.facebook"))
        driver.maximize_window()
        time.sleep(5)
        title = ""
        timelist = []
        postlist = []
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
                    all_prediction.append(ml_model.predict([post.text])[0])
                    postlist.append(post.text)
            s = 0
            for tm in times:
                if(posts[s].text != 0):
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

        response_dict = {"PageName": title,
                         "Posts": postlist, "Times": timelist, 'Polarity': all_prediction, "Results": {"Positive": positive/len(
                             all_prediction) * 100, "Negative": negative/len(all_prediction) * 100, "Neutral": neutral/len(all_prediction) * 100}}
        return Response(response_dict, status=200)
