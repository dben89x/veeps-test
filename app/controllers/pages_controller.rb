class PagesController < ApplicationController
  def index
    @props = {
      terms: Faker::Lorem.paragraphs(15).join(" ")
    }
  end

  def about

  end
end
