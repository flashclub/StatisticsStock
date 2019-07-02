from pymongo import MongoClient
client = MongoClient()
database = client['StatisticsStock']
collection = database['subscriptioninfos']
import requests
import lxml.html
html =  requests.get('http://www.poems.com.hk/zh-cn/product-and-service/initial-public-offerings/ipo-info/')
source = html.content.decode()
selector = lxml.html.fromstring(source)
item_list = selector.xpath('//table[@class="ipo-scheduled-items"]/tbody/tr/text()')

print(source)
print(selector)
print(item_list)
print('neirong')
