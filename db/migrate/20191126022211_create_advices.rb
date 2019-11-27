class CreateAdvices < ActiveRecord::Migration[5.2]
  def change
    create_table :advices do |t|
      t.string :quote
      t.references :user, foreign_key: true
    end
  end
end
