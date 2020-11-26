class GamesController < ApplicationController

	before_action :set_game, only: [:show, :update, :destroy]

	# ゲーム一覧を取得する
	def index
		@user = User.find(params[:user_id])
		@games = @user.games.order(created_at: :desc)
		render json: @games
	end
	
	# IDで指定したゲームを取得する
	def show
		render json: @games
	end

	# ゲームを新規作成する
	def create
		game = Game.new(post_params)
		if game.save
			render json: game
		else
			render json: game.errors
		end
	end

	# IDを指定してゲームを更新する
	def update
		if @game.update(post_params)
			render json: @game
		else
			render json: @game.errors
		end
	end

	# IDを指定してゲームを削除する
	def destroy
		if @game.destroy
			render json: @game
		else
			render json: @game.errors
		end
	end

	private

	def set_game
		@game = Game.find(params[:id])
	end

	def post_params
		params.permit(:id, :game_name, :user_id)
	end

end
