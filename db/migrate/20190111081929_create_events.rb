class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.integer :expected_attendees
      t.float :expected_revenue
      t.boolean :ticket_funding
      t.boolean :accepted_tc
      t.string :file
      t.timestamps
    end
  end
end
