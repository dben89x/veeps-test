# == Schema Information
#
# Table name: events
#
#  id                 :bigint(8)        not null, primary key
#  expected_attendees :integer
#  expected_revenue   :float
#  ticket_funding     :boolean
#  accepted_tc        :boolean
#  file               :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

class Event < ApplicationRecord
  after_create :send_email

  mount_uploader :file, FileUploader
  attr_accessor :file_cache

  def send_email
    EventMailer.new(self).deliver_now
  end
end
