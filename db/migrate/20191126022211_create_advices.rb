class CreateAdvices < ActiveRecord::Migration[5.2]
  def change
    create_table :advices do |t|
      t.integer :user_id
      t.string :quote
    end
  end
end
