class ApplicationController < ActionController::API
	include ActionController::HttpAuthentication::Token::ControllerMethods

	@session = {}

	before_action :set_session
	before_action :require_login

	def require_login
		render json: { error: 'unauthorized' }, status: :unauthorized if @session.empty?
	end

	private

	def set_session
		authenticate_with_http_token do |token, options|
			@session = Session.get(token)
		end
	end
end
