-- ユーザーデータ --
INSERT INTO users (user_id, user_name, email, password) VALUES (1,  'Test Taro',  'hoge@mail.com',  'testpass');

--  ゲームデータ --
INSERT INTO games (game_id, user_id, game_name) VALUES (1,  1,  'ゼルダの伝説　時のオカリナ');

INSERT INTO games (game_id, user_id, game_name) VALUES (2,  1,  'スーパーマリオサンシャイン');

-- ブックマークデータ --
INSERT INTO bookmarks (bookmark_id,  game_id, bookmark_name, url, category, tag, has_period)
                VALUES (1, 1, '森の神殿', 'hoge.com', null, null, TRUE);

INSERT INTO bookmarks (bookmark_id,  game_id, bookmark_name, url, category, tag, has_period)
                VALUES (2, 1, '炎の神殿', 'fuji.com', null, null, FALSE);

INSERT INTO bookmarks (bookmark_id,  game_id, bookmark_name, url, category, tag, has_period)
                VALUES (3, 1, '水の神殿', 'mizu.com', null, null, FALSE);

-- ブックマークの期間 --
INSERT INTO bookmark_periods(period_id, bookmark_id, start_date, end_date)
                VALUES (1, 1, null, '2020-12-9');
