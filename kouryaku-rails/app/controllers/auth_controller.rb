class AuthController < ApplicationController
	skip_before_action :require_login, only:[:create]

	def create
		user = User.find_by(email: params[:email])
		token = ''
		status = :unauthorized
		if user && user.authenticate(params[:password])
			token = Session.create(user)
			status = :created
		end
		render json: { token: token ,user_id: user.id}, status: status
	end

	def destory
		token = params[:token]
		token = Session.destory(token)
		status = :unauthorized
		render json: { status: 'SUCCESS', message: 'Deleted the Session'}, status: status
	end

end
