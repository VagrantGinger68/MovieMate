Rails.application.routes.draw do
  resources :movies
  resources :liked_movies
  resources :users
  mount ActionCable.server => "/cable"
  resources :messages

  # post '/likes', to: 'liked_movies#create'
  # delete '/likes/movieId', to: 'liked_movies#delete'

  post '/movies', to: 'movies#create'

  get '/liked_movies/find_by_movie_and_user/:movie_id/:user_id', to: 'liked_movies#find_by_movie_and_user'

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
