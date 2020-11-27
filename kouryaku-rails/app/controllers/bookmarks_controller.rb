class BookmarksController < ApplicationController

	before_action :set_bookmark, only: %i[show update destroy]

	# ブックマーク一覧を取得する
	def index
		@game = Game.find(params[:game_id])
		@bookmarks = @game.bookmarks.order(created_at: :desc)
		render  json: {
				status: 'SUCCESS',
				message: 'Loaded games',
				data: @bookmarks
		}
	end

	# IDで指定したブックマークを取得する
	def show
		render json: {
				status:'SUCCESS',
				message:"Loaded the bookmark",
				data: @bookmark
		}
	end

	# ブックマークを新規作成する
	def create
		bookmark = Bookmark.new(post_params)
		if bookmark.save
			render json: { status: 'SUCCESS', data: bookmark }
		else
			render json: { status: 'ERROR', data: bookmark.errors }
		end
	end

	# IDを指定してブックマークを更新する
	def update
		if @bookmark.update(post_params)
			render json: {
					status: 'SUCCESS',
					message: 'Update the bookmark',
					data: @bookmark
			}
		else
			render json: {
					status: 'ERROR',
					message: 'Not Updated',
					data: @bookmark.errors
			}
		end
	end

	# IDを指定してブックマークを削除する
	def destroy
		if @bookmark.destroy
			render json: { status: 'SUCCESS', message: 'Deleted the bookmark', data: @bookmark}
		else
			render json: { status: 'ERROR', message: 'Not Deleted', data: @bookmark.error}
		end
	end

	private

	def set_bookmark
		@bookmark =Bookmark.find(params[:id])
	end

	def post_params
		params.permit(:id, :bookmark_name, :url, :game_id)
	end

end
