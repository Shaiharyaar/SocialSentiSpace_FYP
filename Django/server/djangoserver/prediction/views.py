from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from prediction.apps import PredictionConfig
import pandas as pd
from selenium import webdriver
from selenium.common import exceptions
import sys
import time
import json
import tweepy

# Create your views here.
# Class based view to predict based on IRIS model


class IRIS_Model_Predict(APIView):
    def post(self, request, format=None):
        data = request.data
        keys = []
        values = []
        for key in data:
            keys.append(key)
            values.append(data[key])
        X = pd.Series(values).to_numpy().reshape(1, -1)
        loaded_mlmodel = PredictionConfig.mlmodel
        y_pred = loaded_mlmodel.predict(X)
        y_pred = pd.Series(y_pred)
        target_map = {0: 'setosa', 1: 'versicolor', 2: 'virginica'}
        y_pred = y_pred.map(target_map).to_numpy()
        response_dict = {"Prediced Iris Species": y_pred[0]}
        return Response(response_dict, status=200)


class YoutubeScraper(APIView):
    def post(self, request, format=None):
        data = request.data
        dataUsername = []
        dataComments = []
        options = webdriver.ChromeOptions()
        options.headless = True
        driver = webdriver.Chrome('D:\chromedriver', chrome_options=options)
        driver.get(data['url'])
        time.sleep(5)
        try:
            title = driver.find_element_by_xpath(
                '//*[@id="container"]/h1/yt-formatted-string').text
            date = driver.find_element_by_xpath(
                '//*[@id="date"]/yt-formatted-string').text
            description = driver.find_element_by_xpath(
                '//*[@id="description"]/yt-formatted-string').text
            comment_section = driver.find_element_by_xpath(
                '//*[@id="comments"]')
        except exceptions.NoSuchElementException:
            error = "Error: Element may not be loaded"
            print(error)

        driver.execute_script(
            "arguments[0].scrollIntoView();", comment_section)
        time.sleep(7)

        last_height = driver.execute_script(
            "return document.documentElement.scrollHeight")
        x = 0
        while True:
            driver.execute_script(
                "window.scrollTo(0, document.documentElement.scrollHeight);")
            time.sleep(2)
            new_height = driver.execute_script(
                "return document.documentElement.scrollHeight")
            if new_height == last_height:
                break
            if (x > 2):
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
            dataComments.append(comment.text)
        driver.close()

        for text in dataComments:
            # do predictions here
            print(text)
        response_dict = {"Usernames": dataUsername, 'Comments': dataComments}
        return Response(response_dict, status=200)


class Twitter(APIView):
    def post(self, request, format=None):
        data = request.data
        consumer_key = "ZP2hPZoUtpxuA2CHZ2UBKKoSk"
        consumer_secret = "fPGGTqTGTWHtAjQAbI3Cn9aF8L6Ya9GtpZ1fG9Lzs1j7lvU56W"
        access_token = "743845840993812480-XUNg6bA4uWn2h1fBebyKXQdh11Qrmjk"
        access_token_secret = "N3WBA1LvPLNw4oHrFPALVW0yhW0ykziNf4mm8v46MhLkH"
        auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
        auth.set_access_token(access_token, access_token_secret)
        api = tweepy.API(auth, wait_on_rate_limit=True)
        count = 150
        try:
            # Creation of query method using parameters
            tweets = tweepy.Cursor(api.search, q=data['keyword']).items(count)

            # Pulling information from tweets iterable object
            tweets_list = [{"date": tweet.created_at, "id": tweet.id, "text": tweet.text}
                           for tweet in tweets]
            response_dict = {"Tweets": tweets_list}
            # Creation of dataframe from tweets list
            # Add or remove columns as you remove tweet information
            # tweets_df = pd.DataFrame(tweets_list)
            return Response(response_dict, status=200)
        except BaseException as e:
            print('failed on_status,', str(e))
            time.sleep(3)


class InstagramScraper(APIView):
    def post(self, request, format=None):
        data = request.data

        options = webdriver.FirefoxOptions()
        options.headless = True
        # options.add_argument("window-size=1400,600")
        driver = webdriver.Firefox(
            options=options, executable_path=r'D:\geckodriver.exe')
        driver.maximize_window()
        driver.get(data['url'])
        # driver.set_window_size(1920, 1080)
        time.sleep(3)

        # if user not logined
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
            while load_more_comment.is_displayed() and i < int(20):
                load_more_comment.click()
                time.sleep(1.5)
                load_more_comment = driver.find_element_by_css_selector(
                    '.NUiEW > button:nth-child(1)')
                print("Found {}".format(str(load_more_comment)))
                i += 1
        except Exception as e:
            print(e)
            pass

        user_names = []
        user_comments = []
        comment = driver.find_elements_by_class_name('gElp9 ')
        for c in comment:
            container = c.find_element_by_class_name('C4VMK')
            name = container.find_element_by_class_name('_6lAjh').text
            content = container.find_element_by_tag_name('span').text
            content = content.replace('\n', ' ').strip().rstrip()
            user_names.append(name)
            user_comments.append(content)

        # user_names.pop(0)
        # user_comments.pop(0)
        # import excel_exporter
        # excel_exporter.export(user_names, user_comments)

        driver.close()
        response_dict = {"Usernames": user_names, 'Comments': user_comments}
        return Response(response_dict, status=200)
