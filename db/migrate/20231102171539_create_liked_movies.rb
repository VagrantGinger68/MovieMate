class CreateLikedMovies < ActiveRecord::Migration[7.0]
  def change
    create_table :liked_movies do |t|

      t.timestamps
    end
  end
end
