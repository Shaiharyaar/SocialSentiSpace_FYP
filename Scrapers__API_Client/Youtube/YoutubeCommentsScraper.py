from selenium import webdriver
from selenium.common import exceptions
import sys
import time
import pandas as pd
import json

dataUsername = []
dataComments = []


def scrape(url):
    options = webdriver.ChromeOptions()
    options.headless = True
    driver = webdriver.Chrome('D:\chromedriver', chrome_options=options)
    driver.get(url)
    # driver.maximize_window()
    time.sleep(5)

    try:
        title = driver.find_element_by_xpath(
            '//*[@id="container"]/h1/yt-formatted-string').text
        comment_section = driver.find_element_by_xpath('//*[@id="comments"]')
    except exceptions.NoSuchElementException:
        error = "Error: Double check selector OR "
        error += "element may not yet be on the screen at the time of the find operation"
        print(error)

    driver.execute_script("arguments[0].scrollIntoView();", comment_section)
    time.sleep(7)

    last_height = driver.execute_script(
        "return document.documentElement.scrollHeight")

    while True:
        driver.execute_script(
            "window.scrollTo(0, document.documentElement.scrollHeight);")
        time.sleep(2)
        new_height = driver.execute_script(
            "return document.documentElement.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height

    driver.execute_script(
        "window.scrollTo(0, document.documentElement.scrollHeight);")

    try:
        username_elems = driver.find_elements_by_xpath(
            '//*[@id="author-text"]')
        comment_elems = driver.find_elements_by_xpath(
            '//*[@id="content-text"]')
    except exceptions.NoSuchElementException:
        error = "Error: Double check selector OR "
        error += "element may not yet be on the screen at the time of the find operation"
        print(error)

    for username, comment in zip(username_elems, comment_elems):
        dataUsername.append(username.text)
        dataComments.append(comment.text)
    driver.close()


scrape(sys.argv[1])

data = {
    'User_Name': dataUsername,
    'Comments': dataComments
}

print(json.dumps(data))

sys.stdout.flush()
