class AddMessageIdToRoom < ActiveRecord::Migration[7.0]
  def change
    add_reference :rooms, :message, foreign_key: true
  end
end
