class ContactsController < ApplicationController
  def new
    @contact = Contact.new
  end
  
  def create
    @contact = Contact.new(contact_params)
    if @contact.save
      #for the mail viewer to grab variables from to send out email
        name = params[:contact][:name]
        email = params[:contact][:email]
        body = params[:contact][:comments]
        ContactMailer.contact_email(name, email, body).deliver
        # An alert for Users HTML on the application.html so it's visible in any redirect-path.
        flash[:success] = "Message Sent."
        # Landing page after filling out the form
        redirect_to contact_us_path
        
    else
      # Error Alert 
        flash[:danger] = @contact.errors.full_messages.join(", ")
        redirect_to contact_us_path
    end
  end  
  
  private
    # Security
    def contact_params
      params.require(:contact).permit(:name, :email, :comments)
    end  
  
end