class CreateBookmarks < ActiveRecord::Migration[6.0]
  def change
    create_table :bookmarks do |t|
      t.integer :game_id
      t.string :bookmark_name
      t.string :url
      t.string :category

      t.timestamps
    end
  end
end
