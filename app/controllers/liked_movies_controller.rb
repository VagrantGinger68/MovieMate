class LikedMoviesController < ApplicationController
  before_action :set_liked_movie, only: %i[ show update destroy ]

  # GET /liked_movies
  def index
    @liked_movies = LikedMovie.all

    render json: @liked_movies
  end

  # GET /liked_movies/1
  def show
    render json: @liked_movie
  end

  # POST /liked_movies
  def create
    @liked_movie = LikedMovie.new(liked_movie_params)

    if @liked_movie.save
      render json: @liked_movie, status: :created, location: @liked_movie
    else
      render json: @liked_movie.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /liked_movies/1
  def update
    if @liked_movie.update(liked_movie_params)
      render json: @liked_movie
    else
      render json: @liked_movie.errors, status: :unprocessable_entity
    end
  end

  # DELETE /liked_movies/1
  def destroy
    @liked_movie.destroy
  end

  def find_by_movie_and_user
    movie_id = params[:movie_id]
    user_id = params[:user_id]

    @liked_movie = LikedMovie.find_by(movie_id: movie_id, user_id: user_id)

    if @liked_movie
      render json: @liked_movie
    else
      render json: { error: 'LikedMovie not found' }, status: :not_found
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_liked_movie
      @liked_movie = LikedMovie.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def liked_movie_params
      params.require(:liked_movie).permit(:movie_id, :user_id)
    end
end
