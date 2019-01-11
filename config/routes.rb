Rails.application.routes.draw do

  devise_for :admin_users
  devise_for :users
  # API
  namespace :api do
    namespace :v1 do
      post 'events' => 'events#create'
    end
  end

  resources :events
  # Pages
  root to: 'pages#index'
  get 'about' => 'pages'
end
