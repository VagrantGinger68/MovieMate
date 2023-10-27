class CreateMovies < ActiveRecord::Migration[7.0]
  def change
    create_table :movies do |t|
      t.string :title
      t.string :description
      t.float :rating
      t.string :poster
      t.string :video
      t.integer :likes

      t.timestamps
    end
  end
end
