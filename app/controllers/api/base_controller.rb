class API::BaseController < ApiController
  respond_to :json

  # before_action :parse_request

  def parse_request
    return unless request.body.size > 0

    @json = JSON.parse(request.body.read)
    puts @json
  end
end
