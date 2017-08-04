get '/users' do
  erb :'users/index'
end

get '/users/new' do
  erb :'/users/new'
end

get '/users/:id' do
  authenticate!
  current_id = params[:id].to_i
  logger.info current_id.class
  if current_user.id == current_id
    @user = User.find_by(id: current_user.id)
    erb :"users/show"
  else
    redirect '/404'
  end
end

post '/users' do
  @user = User.new(params[:user])
  @user.password = params[:password]

  if @user.save
    session[:user_id] = @user.id
    redirect "/generations/new"
  else
    @errors = @user.errors.full_messages
    erb :'users/new'
  end
end
