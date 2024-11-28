from flask_mail import Message
from threading import Thread


class EmailManager:
    def __init__(self, app, mail):
        self.app = app
        self.mail = mail

    def send_pass_reset_email(self, recipient, reset_link):
        msg = Message()
        msg.subject = 'Password reset for WalletWatch.com'
        msg.recipients = [recipient]
        msg.sender = self.app.config['MAIL_USERNAME']
        msg.body = reset_link

        # Implement threading to send the email request async
        def send_async_email(app, msg):
            with app.app_context():
                self.mail.send(msg)

        Thread(target=send_async_email, args=(self.app, msg)).start()