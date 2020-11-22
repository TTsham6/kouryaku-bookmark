# ユーザーModel作成
user = User.new(email: 'hogehoge@hoge.com', password: 'hugahuga')
user.save!

# ユーザーModelに紐づいたゲームModelを作成
user.games.create!(game_name: "ゼルダの伝説")
user.games.create!(game_name: "ゼルダの伝説2")

# ゲームModelに紐づいたブックマークを10個作成
games = Game.order(:created_at).take(6)
games.each do |game|
 10.times do
    bookmark_name = Faker::Games::Zelda.game
    url = 'hoge@test.com'
    game.bookmarks.create!(bookmark_name: bookmark_name, url: url, category: "ダンジョン")
  end
end