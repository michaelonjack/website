import os
import jinja2
import webapp2
import urllib2
import sys
import re
import json
import logging
from google.appengine.api import mail

template_dir = os.path.join(os.path.dirname(__file__),'templates')
jinja_env = jinja2.Environment(loader = jinja2.FileSystemLoader(template_dir),
        autoescape = True) #Jinja will now autoescape all html

conferences = {}
conferences["acc"] = "9"
conferences["big10"] = "11"
conferences["big12"] = "12"
conferences["pac12"] = "18"
conferences["sec"] = "19"

def getNextRowStartIndex(html):
    firstTeamIndex = 0
    try:
        firstTeamIndex = html.index("wisbb_firstTeam")
    except ValueError:
        firstTeamIndex = sys.maxint


    return firstTeamIndex



# THREE FUNCTIONS FOR RENDERING BASIC TEMPLATES
class Handler(webapp2.RequestHandler):
    def write(self, *a, **kw):
        self.response.out.write(*a,**kw)
    
    def render_str(self,template, **kw):
        t = jinja_env.get_template(template)
        return t.render(kw)

    def render(self,template,**kw):
        self.write(self.render_str(template,**kw))




class MainPage(Handler):
    def get(self):
        self.render("website.html")

class InfoPage(Handler):
    def get(self):
        self.render("info_website.html")

class ContactPage(Handler):
    def write_form(self,email="",subject="",message="",error=""):
        self.render("contact_website.html",email=email,subject=subject,
                message=message,error=error)
    
    
    def post(self):
    	firstName = self.request.get("firstName")
        lastName = self.request.get("lastName")
        email = self.request.get("email")
    	subject = self.request.get("subject")
    	message = self.request.get("message")
    	
    	if firstName and lastName and email and subject and message:
    		message = message + "\n\n\nFrom: " + firstName + " " + lastName + " (" + email + ") "
    		mail.send_mail("mikeonjack@gmail.com","mikeonjack@gmail.com",subject,message)
    		self.write_form('','','',"Sent! Thank you!")
    			
    	else:
    		self.write_form(email,subject,message,"Please fill all fields.")
    
    
    def get(self):
        self.write_form()

class SamplesPage(Handler):
    def get(self):
        self.render("samples_website.html")

class AJAXTailgatorScores(Handler):

    def get(self):
        self.response.headers['Content-Type'] = 'application/json'

        week = self.request.get("week")
        conference = self.request.get("conference")

        logging.debug("Requesting tailgator scores")

        url = 'https://www.foxsports.com/college-football/schedule?season=2019&seasonType=1&week=' + week + '&group=' + conferences[conference]
        response = urllib2.urlopen(url)
        
        html = response.read()
        html = html[html.index('wisbb_scheduleTable'):html.index('wisbb_footer')]

        data = []
        currentIndex = getNextRowStartIndex(html)

        while currentIndex != sys.maxint:
        
            html = html[currentIndex+1:]
            html = html[html.index("<span>")+1:]
            html = html[html.index("<span>"):]

            # Get away team data
            awayTeamName = html[len("<span>"):html.index("</span>")]
            # Ignore ranking numbers
            if bool(re.search(r'\d', awayTeamName)):
                html = html[1:]
                html = html[html.index("<span>"):]
                awayTeamName = html[len("<span>"):html.index("</span>")]


            html = html[html.index("<div class=\"wisbb_score")+2:]
            awayTeamScore = html[len("<div class=\"wisbb_score"):html.index("</div>")]


            # Get game status
            html = html[html.index("wisbb_status"):]
            html = html[html.index(">"):]
            status = html[1:html.index("<")]

            if status == "LIVE":
                    html = html[html.index("wisbb_network"):]
                    html = html[html.index(">"):]
                    channel = html[1:html.index("<")]

                    if channel != "":
                        status = status + " - " + channel

        
            # Get home team data
            html = html[html.index("wisbb_secondTeam"):]
            html = html[html.index("<div class=\"wisbb_score")+2:]
            homeTeamScore = html[len("<div class=\"wisbb_score"):html.index("</div>")]

            html = html[html.index("<span>")+1:]
            html = html[html.index("<span>"):]

            homeTeamName = html[len("<span>"):html.index("</span>")]
            # Ignore ranking numbers
            if bool(re.search(r'\d', homeTeamName)):
                html = html[1:]
                html = html[html.index("<span>"):]
                homeTeamName = html[len("<span>"):html.index("</span>")]


            # Create game using data and add it to the list
            game = {}
            game["awayTeamName"] = awayTeamName
            game["homeTeamName"] = homeTeamName
            game["awayTeamScore"] = awayTeamScore
            game["homeTeamScore"] = homeTeamScore
            game["status"] = status
            data.append(game)

            currentIndex = getNextRowStartIndex(html)


        self.response.out.write(json.dumps(data))
		


application = webapp2.WSGIApplication([
    ('/', MainPage),
    (r'/tailgator.*', AJAXTailgatorScores)
], debug=True)
    
