class ApplicationController < ActionController::API
	include ActionController::HttpAuthentication::Token::ControllerMethods

	before_action :set_session
	before_action :require_login

	@session = {}

	def require_login
		render json: { error: 'unauthorized' }, status: :unauthorized if @session.blank?
	end

	private

	def set_session
		@session = {}
		authenticate_with_http_token do |token, options|
			@session = Session.get(token)
		end
	end
end
