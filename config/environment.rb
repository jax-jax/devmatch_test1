# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

ActionMailer::Base.smtp_settings = {
  :port           => ENV['MAILGUN_SMTP_PORT'],
  :address        => ENV['MAILGUN_SMTP_SERVER'],
  :user_name      => ENV['MAILGUN_SMTP_LOGIN'],
  :password       => ENV['MAILGUN_SMTP_PASSWORD'],
  :domain         => 'http://devmatch-dev.herokuapp.com',
  :authentication => :plain,
}
ActionMailer::Base.delivery_method = :smtp
<<<<<<< HEAD
=======

>>>>>>> 0b8f43fe8e16fcaebee47c263e1b4c98e21b7f98
