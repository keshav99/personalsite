
from bs4 import BeautifulSoup as bs
import requests as rs
import numpy as np
import urllib.request as urllib
import io
from time import sleep
import json

def get_google_img(name):
    # search = 'https://www.google.com/search?q='+name.replace(' ','%20')+'&tbm=isch&hl=en&hl=en&chips=q%3Aexcuse%20me%2Cg_1%3Aclipart%3ADdE6hlu8ifU%3D&tbs=isz%3Am&sa=X&ved=0CAIQpwVqFwoTCMi-grq5sOsCFQAAAAAdAAAAABAO&biw=1522&bih=731'
    search = 'https://www.bing.com/images/search?q=%2b'+name.replace(' ','+')+'+clipart&qft=+filterui:imagesize-large&FORM=IRFLTR'
    res = rs.get(search)
    soup = bs(res.text, "html.parser")
    # print(soup)
    images = soup.find_all('img')
    # print(images)
    url = ''
    for i in images[2:]:
        # print('heeee')
        # print(i)
        # altText = ''
        # if i.has_attr('src'):
        #     if 'http' in i['src']:
        #         # print(i)
        #         # if i.has_attr('height'):
        #             # if int(i['height'])>100:
        #                 # print('HEEHEE')

        #         url = i['src']
        #         break
        if i.has_attr('src'):
            if 'http' in i['src']:
                url = i['src']
                break
    return url
                
    
    # urllib.urlretrieve(url, "image.png")
    # return self.process(cv2.imread("image.png",0))

# print(get_google_img("Excuse me"))
f = open('word_eng.txt', 'r')
g = open('imgs', 'w+')
imgs = []
words = f.read().split('\n')
# print(words)
for i in words:
    url = get_google_img("+"+i)
    imgs.append(url)
    g.write(url)

    