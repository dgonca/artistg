get '/sessions' do
  redirect '/'
end

get '/sessions/new' do
  erb :'sessions/new'
end

post '/sessions' do
  p params[:users]
  @user = User.find_by(email: params[:users][:email])

  if @user && @user.authenticate?(params[:users][:password_text])
    session[:user_id] = @user.id
    logger.info "session id in login page: #{session[:user_id]}"
    redirect "/users/#{@user.id}"
  elsif !@user
    @errors = ["Your username was incorrect"]
    erb :'sessions/new'
  elsif !@user.authenticate?(params[:users][:password_text])
    @errors = ["Your password was incorrect"]
    erb :'sessions/new'
  end
end

delete '/sessions' do
  session.delete('user_id')
  redirect '/'
end
