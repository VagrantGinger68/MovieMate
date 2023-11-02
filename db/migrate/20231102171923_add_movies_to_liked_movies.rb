class AddMoviesToLikedMovies < ActiveRecord::Migration[7.0]
  def change
    add_reference :liked_movies, :movie, foreign_key: true
  end
end
