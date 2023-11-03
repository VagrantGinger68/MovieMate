class CreateMovies < ActiveRecord::Migration[7.0]
  def change
    create_table :movies, id: false do |t|
      t.bigint :movieId, primary_key:true

      t.timestamps
    end
  end
end
