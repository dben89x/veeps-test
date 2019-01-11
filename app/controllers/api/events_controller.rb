module API
  class EventsController < BaseController

    def create
      @event = Event.new(event_params)

      if @event.save
        json_response(@event, :created)
      else
        json_response(@event.errors, :unprocessable_entity)
      end
    end

    private

    def event_params
      params.require(:event).permit(:expected_attendees, :expected_revenue, :ticket_funding, :accepted_tc, :file)
    end

  end
end
