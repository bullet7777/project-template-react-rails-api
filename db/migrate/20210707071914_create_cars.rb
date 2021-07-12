class CreateCars < ActiveRecord::Migration[6.1]
  def change
    create_table :cars do |t|
      t.string :name
      t.string :year
      t.integer :user_id
      t.integer :make_id
      t.timestamps
    end
  end
end
