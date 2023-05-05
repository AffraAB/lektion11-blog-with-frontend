const dbDriver = require('better-sqlite3');

const db = dbDriver('blog.sqlite3');

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.static('frontend'));

app.get('/api/posts', (req, res) => {
  const statement = db.prepare('SELECT * FROM posts');
  const posts = statement.all();
  res.json(posts);
});

app.get('/api/posts/:id', (req, res) => {
  const statement = db.prepare('SELECT * FROM posts WHERE id = ?');
  const post = statement.get(req.params.id); // Does not return array
  res.json(post);
});

app.post('/api/posts', (req, res) => {
  const post = req.body;
  //console.log(req.body);
  //res.json({ status: 'ok' });
  //return;
  const statement = db.prepare('INSERT INTO posts (title, content) VALUES (?, ?)');
  const result = statement.run(post.title, post.content);
  res.json({ id: result.lastInsertRowid, success: true });
});

app.put('/api/posts/:id', (req, res) => {
  console.log(req.body);
  const post = req.body;
  const statement = db.prepare('UPDATE posts SET title = ?, content = ? WHERE id = ?');
  const result = statement.run(post.title, post.content, req.params.id);
  //res.json({ success: true });
  res.json({ changes: result.changes, success: true});
});

app.delete('/api/posts/:id', (req, res) => {
  const statement = db.prepare('DELETE FROM posts WHERE id = ?');
  const result = statement.run(req.params.id);
  res.json({ success: true });
});


app.listen(3000, () => console.log('Server listening on port 3000'));