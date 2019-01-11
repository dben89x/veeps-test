class EventMailer < ApplicationMailer
  def new(event)
    @event = event
    mail subject: "New Event from Anonymous!"
  end
end
