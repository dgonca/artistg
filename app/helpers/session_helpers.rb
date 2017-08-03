#sets current user to session[:user_id] from login
def current_user
  current_user ||= User.find_by(id: session_user)
end

def session_user
  session[:user_id]
end

#checks if session[:user_id] is not nil, which will only happen if someone is logged in
def logged_in?
  session_user != nil
end

def authenticate!
  redirect '/404' unless logged_in?
end
