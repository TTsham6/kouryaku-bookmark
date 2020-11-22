Rails.application.routes.draw do
	resources :users
	resources :auth, :only => [:create, :destroy]
  resources :games
  resources :bookmarks
end
