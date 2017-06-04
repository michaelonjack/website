import os
import jinja2
import webapp2
from google.appengine.api import mail

template_dir = os.path.join(os.path.dirname(__file__),'templates')
jinja_env = jinja2.Environment(loader = jinja2.FileSystemLoader(template_dir),
        autoescape = True) #Jinja will now autoescape all html



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
    def write_form(self,sender="",title="",body="",error=""):
        self.render("contact_website.html",sender=sender,title=title,
                body=body,error=error)
    
    
    def post(self):
    	sender = self.request.get("sender")
    	title = self.request.get("title")
    	message = self.request.get("body")
    	
    	if sender and title and message:
    		message = message + "\n\n\nFrom: " + sender
    		mail.send_mail("mikeonjack@gmail.com","mikeonjack@gmail.com",title,message)
    		self.write_form('','','',"Sent! Thank you!")
    			
    	else:
    		self.write_form(sender,title,message,"Please fill all fields.")
    
    
    def get(self):
        self.write_form()

class SamplesPage(Handler):
    def get(self):
        self.render("samples_website.html")
		


application = webapp2.WSGIApplication([
    ('/', MainPage),
    ('/info', InfoPage),
    ('/contact', ContactPage),
    ('/samples',SamplesPage)
], debug=True)
    
