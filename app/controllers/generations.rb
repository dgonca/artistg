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
  @user.college = params[:college]
  @user.email = params[:email]

  if @user.save
    if request.xhr?
      content_type :json
      {name: @user.users_name, location: @user.location, college: @user.college}.to_json
    end
  end

end

post '/generations/photos' do
  @user = current_user
  @photo = @user.photos.new(url: params[:url])

  if @photo.save
    if request.xhr?
      content_type :json
      { url: @photo.url }.to_json
    end
  end
end
