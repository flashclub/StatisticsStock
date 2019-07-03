import lxml.html

import requests

eurl = 'http://www.poems.com.hk/zh-cn/product-and-service/initial-public-offerings/ipo-info/';
html_bytes = requests.get(eurl).content

html_str = html_bytes.decode()

selector = lxml.html.fromstring(html_str)
info = selector.xpath('//*[@id="Scheduled"]/div[3]/table/tbody/tr/td[1]/text()')
print(info)