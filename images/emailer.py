##CURRENT ISSUES:
##    not getting correct deal link
##    need to parse price from html

import smtplib
import mechanize
import urllib
import time
import string

while(True):

    browser = mechanize.Browser()
    browser.set_handle_equiv(True)
    browser.set_handle_redirect(True)
    browser.set_handle_referer(True)
    browser.set_handle_robots(True)

    browser.addheaders = [('user-agent', '   Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.2.3) Gecko/20100423 Ubuntu/10.04 (lucid) Firefox/3.6.3')]

    # Get HTML code from meh.com
    url = 'https://meh.com'
    html = browser.open(url).read()
    browser.close()

    # Set email settings needed for sending gmail message
    sender = YOUR EMAIL HERE
    receiver = [RECEIVER EMAILS HERE]
    server = smtplib.SMTP( "smtp.gmail.com", 587 )
    server.ehlo()
    server.starttls()
    server.ehlo()
    print('Logging on to email..')
    server.login( sender, PASSWORD HERE )

    # Parse HTML to work with smaller string of only relevant info
    # Relevant data is located on left and middle columns of page
    startIndex = html.find('meh-left meh-column')
    endIndex = html.find('meh-right meh-column')
    html = html[startIndex:endIndex]

    # Begin forming email message
    msg = "Here's the daily deal on meh.com:\n\n"
    Subj = 'meh.com Daily Deal!'
    From = 'Python Program'
    To = receiver

    print('Gathering relevant content..')
    
    # Find purchase link
    purchaseLinkBeg = html.find('https',html.find('buy-button'))
    purchaseLinkEnd = html.find('"',purchaseLinkBeg)
    purchaseLink = html[purchaseLinkBeg:purchaseLinkEnd];

    # Find deal price
    priceBeg = html.find('$',html.find('buy-button'))
    priceEnd = html.find(' ',priceBeg)
    price = html[priceBeg:priceEnd]

    # Find title of the product on sale and appened it to the email message
    productBeg = html.find('<h2>') + 4
    productEnd = html.find('</h2>')
    product = html[productBeg:productEnd] 

    # Find description of product on sale and appened it to the email message
    descriptBeg = html.find('<li>',productEnd)
    endDescriptArea = html.find('</ul>',descriptBeg)
    fullDescription = ''
    while descriptBeg < endDescriptArea and descriptBeg>0:
        descriptBeg = descriptBeg+4
        descriptEnd = html.find('</li>',descriptBeg)
        description = html[descriptBeg:descriptEnd]
        fullDescription = fullDescription + '-' + description + '\n'
        descriptBeg = html.find('<li>',descriptEnd)

    # Get link to the full specs page
    fullSpecsBeg = html.find('https',html.find("specs"))
    fullSpecsEnd = html.find('"',fullSpecsBeg)
    fullSpecs = html[fullSpecsBeg:fullSpecsEnd]

    msg = msg + product + '\n' + price + '\n' + fullDescription + '\n\nFULL SPECIFICATIONS: \n' + fullSpecs + '\n\nBUY HERE:\n' + purchaseLink

    email = string.join((
        "From: %s" % From,
        "To: %s" % To,
        "Subject: %s" % Subj,
        "",
        msg,
        ), "\r\n")

    #Send email with the message
    server.sendmail( sender, receiver, email )
    server.quit()

    print('Email sent!')

    # Wait a day to execute the program again
    time.sleep(60*60*24)
