class EventMailer < ApplicationMailer
  def new_event(event)
    @event = event
    @model_name = @event.model_name.human.titleize
    @columns = @model_name.constantize.column_names
    @columns.delete("id")
    @columns.delete("file")

    attachments[@event.file.filename.to_s || 'file'] = {
      mime_type: 'application/pdf',
      content: @event.file.read
    }

    mail to: ENV['MAIL_RECIPIENT'], subject: "New #{@model_name}!"
  end
end
