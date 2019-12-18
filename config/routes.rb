Rails.application.routes.draw do
  get '/advices' => 'advices#index'
  get '/advices/:id' => 'advices#show'
  
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
