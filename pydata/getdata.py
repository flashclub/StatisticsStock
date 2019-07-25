#coding=utf-8

import lxml.html
import requests


from pymongo import MongoClient
client = MongoClient()
database = client['Statisticsstock']
collection = database['stockdatas']

class DownloadDB(object):
    def __init__(self,target):
        self.target = target

    def selector(self):
        eurl = self.target
        html_bytes = requests.get(eurl)
        html_content = html_bytes.content
        html_str = html_content.decode()
        selector = lxml.html.fromstring(html_str)
        return selector

class GetInfo(object):
    def __init__(self,selector,info,names):
        self.selector = selector
        self.info = info
        self.names = names

    def return_data(self):
        info = self.selector.xpath(self.info)
        list = []
        for item1 in info:
            dict1 = {}
            for index in range(len(item1)):
                dict1[self.names[index]] = item1[index].xpath('string(.)').strip()
            list.append(dict1)
        return list

if __name__ == "__main__":
    halfNew1 = DownloadDB('https://www.aastocks.com/sc/ipo/listedipo.aspx')
    halfNewData1 = GetInfo(halfNew1.selector(),'//*[@class="secRight"]/table/tr[@class="DR"]',
                           ['listingDate', 'code', 'company', 'industry', 'prospectusPrice', 'marginAmount',
                         'handNumberForOne', 'oneHandSignRate', 'firstDayGain', 'nowPrice', 'totalPrice'])
    halfNewData2 = GetInfo(halfNew1.selector(), '//*[@class="secRight"]/table/tr[@class="ADR"]',
                           ['listingDate', 'code', 'company', 'industry', 'prospectusPrice', 'marginAmount',
                            'handNumberForOne', 'oneHandSignRate', 'firstDayGain', 'nowPrice', 'totalPrice'])
    print(halfNewData1.return_data())
    print(halfNewData2.return_data())
    #
    halfNew3 = DownloadDB('http://www.poems.com.hk/zh-cn/product-and-service/initial-public-offerings/ipo-info/')
    halfNewData3 = GetInfo(halfNew3.selector(),'//*[@id="Scheduled"]/div[3]/table/tbody/tr',
                        ['code', 'company', 'prospectusPrice', 'listingDate', 'firstMarginDeadline', 'publicDeadline',
                         'marginAnnualInterest', 'calculator', 'marginAmount', 'sponsor', 'report', 'remarks','others'])

    print(halfNewData3.return_data())


