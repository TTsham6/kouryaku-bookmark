class User < ApplicationRecord
	has_many :games
	acts_as_paranoid
	has_secure_password
end
