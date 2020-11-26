class BookmarksController < ApplicationController

	before_action :set_bookmark, only: %i[show update destroy]

	# ブックマーク一覧を取得する
	def index
		@game = Game.find(params[:game_id])
		@bookmarks = @game.bookmarks.order(created_at: :desc)
		render json: @bookmarks
	end

	# IDで指定したブックマークを取得する
	def show
		render json: @bookmark
	end

	# ブックマークを新規作成する
	def create
		bookmark = Bookmark.new(post_params)
		if bookmark.save
			render json: bookmark
		else
			render json: bookmark.errors
		end
	end

	# IDを指定してブックマークを更新する
	def update
		if @bookmark.update(post_params)
			render json: @bookmark
		else
			render json: @bookmark.errors
		end
	end

	# IDを指定してブックマークを削除する
	def destroy
		@bookmark.destroy
		render json: @bookmark
	end

	private

	def set_bookmark
		@bookmark =Bookmark.find(params[:id])
	end

	def post_params
		params.permit(:id, :bookmark_name, :url, :game_id)
	end

end
