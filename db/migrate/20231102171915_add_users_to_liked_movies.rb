class AddUsersToLikedMovies < ActiveRecord::Migration[7.0]
  def change
    add_reference :liked_movies, :user, foreign_key: true
  end
end
