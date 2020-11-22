class GamesController < ApplicationController

  	before_action :set_game, only: %i[show update destroy]

	# ゲーム一覧を取得する
	def index
		@user = User.find(params[:user_id])
		@games = @user.games.order(created_at: :desc)
		render json: {
			status: 'SUCCESS',
			message: 'Loaded games',
			data: @games
		}
	end
	
	# IDで指定したゲームを取得する
	def show
		render json:{
			status: 'SUCCESS',
			message: 'Loaded the game',
			data: @game
		}
	end

	# ゲームを新規作成する
	def create
		game = Game.new(post_params)
		if game.save
			render json: { status: 'SUCCESS', data: game }
		else
			render json: { status: 'ERROR', data: game.errors }
		end
	end

	# IDを指定してゲームを更新する
	def update
		if @game.update(post_params)
			render json: { 
				status: 'SUCCESS', 
				message: 'Updated the game', 
				data: @game 
			}
		else
			render json: { 
				status: 'ERROR', 
				message: 'Not Updated', 
				data: @game.errors 
			}
		end
	end

	# IDを指定してゲームを削除する
	def destroy
		@game.destroy
		render json: { status: 'SUCCESS', message: 'Deleted the game', data: @game }
	end

	private

	def set_game
		@game = Game.find(params[:id])
	end

	def post_params
		params.permit(:id, :game_name, :user_id)
	end

end
