Albums::Application.routes.draw do
  # resources :users

  root :to => "welcome#index"
  post "album" => "album#index"
end