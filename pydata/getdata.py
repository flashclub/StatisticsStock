#coding=utf-8

import lxml.html
import requests
from pymongo import MongoClient
client = MongoClient()
# database = client['Chapter6']
database = client['Statisticsstock']
collection = database['stockdatas']
# collection = database['spider']
# data = {'id':99,'name':'laughing'}
# collection.insert(data)
def getData():
    eurl = 'http://www.poems.com.hk/zh-cn/product-and-service/initial-public-offerings/ipo-info/';
    html_bytes = requests.post(eurl)
    # print(html_bytes)
    html_content = html_bytes.content
    # print(html_content)
    html_str = html_content.decode()
    # print(html_str)
    selector = lxml.html.fromstring(html_str)

    info = selector.xpath('//*[@id="Scheduled"]/div[3]/table/tbody/tr')

    list = []

    names = ['code','company','prospectusPrice','listingDate','firstMarginDeadline','publicDeadline','marginAnnualInterest','calculator','marginAmount','sponsor','report','remarks','others',]
    for item1 in info:
        dict1 = {}
        for index in range(len(item1)):
            dict1[names[index]] = item1[index].xpath('string(.)').strip()
            # print(item1[index].xpath('string(.)').split())
        # print(dict1)
        list.append(dict1)

    print(list)
    collection.insert(list)
    print('添加完毕')
getData()