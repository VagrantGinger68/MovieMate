class AddGenreIdToMovies < ActiveRecord::Migration[7.0]
  def change
    add_reference :movies, :genre, index: true, foreign_key: true
  end
end
