# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
User.create(name: "Bob Doe", email: "bob@bob.com", password: "123")
User.create(name: "Jane Smith", email: "jane@jane.com", password: "123")

Movie.create(movieId: 507089)

# LikedMovie.create(user_id:1, movie_id: 507089)