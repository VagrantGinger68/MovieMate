require "test_helper"

class LikedMoviesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @liked_movie = liked_movies(:one)
  end

  test "should get index" do
    get liked_movies_url, as: :json
    assert_response :success
  end

  test "should create liked_movie" do
    assert_difference("LikedMovie.count") do
      post liked_movies_url, params: { liked_movie: {  } }, as: :json
    end

    assert_response :created
  end

  test "should show liked_movie" do
    get liked_movie_url(@liked_movie), as: :json
    assert_response :success
  end

  test "should update liked_movie" do
    patch liked_movie_url(@liked_movie), params: { liked_movie: {  } }, as: :json
    assert_response :success
  end

  test "should destroy liked_movie" do
    assert_difference("LikedMovie.count", -1) do
      delete liked_movie_url(@liked_movie), as: :json
    end

    assert_response :no_content
  end
end
