get '/generations' do
  erb :'generations/index'
end

get '/generations/new' do
  erb :'generations/new', layout: false
end

post '/generations/begin' do
  @user = current_user
  @user.users_name = params[:name]
  @user.location = params[:location]

  if request.xhr?
    content_type :json
    {name: @user.users_name, location: @user.location}.to_json
  end

end
