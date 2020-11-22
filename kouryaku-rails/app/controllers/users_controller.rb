class UsersController < ApplicationController

	before_action :set_user, only: %i[create]

	# ユーザーを新規作成する
	def create 
		user = User.new(post_params)
		if user.save
			render json: { status: 'SUCCESS', data: user }
		else
			render json: { status: 'ERROR', data: user.errors }
		end
	end

	private

	def post_params
		params.permit(:email, :password)
	end

end
