class User < ActiveRecord::Base
  validates_presence_of :username, :email
  validates_uniqueness_of :username, :email

  def password
    self.password ||= BCrypt::Password.new(password_hash)
  end

  def password=(new_password)
    @raw_password = new_password
    @password = BCrypt::Password.create(new_password)
    self.password_hash = @password
  end

  def authenticate?(password_text)
    BCrypt::Password.new(self.password_hash) == password_text
  end
end
