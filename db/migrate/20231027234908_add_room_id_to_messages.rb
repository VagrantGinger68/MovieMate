class AddRoomIdToMessages < ActiveRecord::Migration[7.0]
  def change
    add_reference :messages, :room, foreign_key: true
  end
end
