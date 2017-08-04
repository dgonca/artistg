class AddCollegeToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :college, :string
  end
end
