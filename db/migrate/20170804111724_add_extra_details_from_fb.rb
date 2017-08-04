class AddExtraDetailsFromFb < ActiveRecord::Migration[5.1]
  def change
    change_table :users do |t|
      t.column :users_name, :string
      t.column :location, :string
      t.column :about, :string
      t.column :website, :string
    end
  end
end
