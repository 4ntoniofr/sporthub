const sqlite3 = require("sqlite3").verbose();
const multer = require("multer");
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const bcrypt = require("bcrypt");
const saltRounds = 10;
const port = 8080;
const cors = require("cors");
require("dotenv").config();
app.use(cors());
const upload = multer({ dest: "uploads/" });

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the SQlite database.");
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

/**
 * API USUARIOS
 */

app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";

  db.all(query, (err, rows) => {
    if (err) {
      res.send(err.message);
    }
    res.send(rows);
  });
});

app.get("/userInfo/:username", (req, res) => {
  const query = "SELECT * FROM users WHERE username = ?";
  const username = req.params.username;

  db.get(query, [username], (err, row) => {
    if (err) {
      res.send(err.message);
    }
    res.send(row);
  });
});

app.post("/newUser", (req, res) => {
  const { username, password, name, email, lastName, date } = req.body;
  const sql = `INSERT INTO users (username, password, name, email, lastname, profileImage) VALUES (?, ?, ?, ?, ?, ?)`;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    } else {
      db.get(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err, row) => {
          if (err) {
            console.error(err.message);
            res.status(500).send("Internal server error");
          } else if (row) {
            res
              .status(400)
              .send("The username was already inserted in the database");
          } else {
            db.run(
              sql,
              [username, hash, name, email, lastName, null],
              (err) => {
                if (err) {
                  if (err.message.includes("UNIQUE constraint failed")) {
                    res.status(400).send("Username already exists");
                  }
                  console.error(err.message);
                  res.status(500).send("Internal server error");
                } else {
                  token = jwt.sign(
                    { username: username },
                    process.env.TOKEN_KEY
                  );
                  res.status(200).send(token);
                }
              }
            );
          }
        }
      );
    }
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ?";
  db.all(sql, [username], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    } else {
      user = rows[0];
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            console.error(err.message);
            res.status(500).send("Internal server error");
          } else {
            if (result) {
              token = jwt.sign({ username: username }, process.env.TOKEN_KEY);
              res.status(200).send(token);
            } else {
              res.status(403).send("Password not valid");
            }
          }
        });
      } else {
        res.status(403).send("Username not valid");
      }
    }
  });
});

app.post("/userByToken", (req, res) => {
  try {
    const { token } = req.body;
    if (token) {
      const user = jwt.verify(token, process.env.TOKEN_KEY);
      res.status(200).send(user);
    } else {
      res.status(100).send("No token");
    }
  } catch (e) {
    res.status(400).send("Token not valid");
  }
});

app.post("/setUserProfile", upload.single("image"), (req, res) => {
  const imageBinaryData = req.file.buffer;
  const { user } = req.body;
  db.run(
    "UPDATE users SET profileImage = ? WHERE id = ?",
    [imageBinaryData, user],
    (err) => {
      if (err) {
        console.log(err.message);
        res.status(500).json({ message: "Error setting profile image." });
      } else {
        res.sendStatus(200);
      }
    }
  );
  db.close();
});

app.post("/updateUser", (req, res) => {
  const {
    username,
    password,
    name,
    email,
    date,
    lastname,
    phone,
    address1,
    address2,
    country,
    postalcode,
    gender,
  } = req.body;
  const sql = `UPDATE users SET username = ?, name = ?, email = ?, date = ?, lastname = ?, phone = ?, address1 = ?, address2 = ?, country = ?, postalcode = ?, gender = ? WHERE username = ?`;
  db.get("SELECT * FROM users WHERE username = ?", [username], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    } else {
      let user = rows;
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err) {
            console.error(err.message);
            res.status(500).send("Internal server error");
          } else {
            if (result) {
              db.run(
                sql,
                [
                  username,
                  name,
                  email,
                  date,
                  lastname,
                  phone,
                  address1,
                  address2,
                  country,
                  postalcode,
                  gender,
                  username,
                ],
                (err) => {
                  if (err) {
                    if (err.message.includes("UNIQUE constraint failed")) {
                      console.log("porla");
                      res.status(400).send("Username already exists");
                    }
                    console.error(err.message);
                    res.status(500).send("Internal server error");
                  } else {
                    token = jwt.sign(
                      { username: username },
                      process.env.TOKEN_KEY
                    );
                    res.status(200).send(token);
                  }
                }
              );
            } else {
              res.sendStatus(403);
            }
          }
        });
      } else {
        console.log("username not valid");
        res.status(403).send("Username not valid");
      }
    }
  });
});

/**
 * API PRODUCTOS
 */

app.get("/products", (req, res) => {
  const query =
    "SELECT p.*, u.username AS seller_username, u.name AS seller_name, u.email AS seller_email FROM products p JOIN users u ON p.seller = u.id";

  db.all(query, (err, rows) => {
    if (err) {
      res.send(err.message);
    }
    res.send(rows);
  });
});

app.post("/newProduct", (req, res) => {
  const { name, description, image, price, seller } = req.body;
  const sql = `INSERT INTO products (name, description, image, price, seller) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [name, description, image, price, seller], (err) => {
    if (err) {
      if (err.message.includes("UNIQUE constraint failed")) {
        res.status(400).send("Product already exists");
      }
      console.error(err.message);
      res.status(500).send("Internal server error");
    } else {
      res.status(200).send();
    }
  });
});

/**
 * API WISHLIST
 */

app.post("/addToWishlist", (req, res) => {
  const { username, productId } = req.body;
  const sql =
    "INSERT INTO wishlist(user, product) VALUES ((SELECT id FROM users WHERE username = ?),?)";

  db.run(sql, [username, productId], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    } else {
      res.status(200).send();
    }
  });
});

app.post("/removeFromWishlist", (req, res) => {
  const { username, productId } = req.body;
  const sql =
    "DELETE FROM wishlist WHERE user = (SELECT id FROM users WHERE username = ?) and product = ?";

  db.run(sql, [username, productId], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    } else {
      res.status(200).send();
    }
  });
});

app.post("/getWishlist", (req, res) => {
  const { username } = req.body;
  const sql =
    "SELECT product FROM wishlist WHERE user = (SELECT id FROM users WHERE username = ?)";

  db.all(sql, [username], (err, rows) => {
    if (err) {
      console.log(err.message);
      res.status(500).send("Internal Server ERROR");
    } else {
      res.status(200).send(rows);
    }
  });
});

/**
 * API CART
 */

app.post("/addToCart", (req, res) => {
  const { username, productId } = req.body;
  const sql =
    "INSERT INTO cart(user, product) VALUES ((SELECT id FROM users WHERE username = ?),?)";

  db.run(sql, [username, productId], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    } else {
      res.status(200).send();
    }
  });
});

app.post("/removeFromCart", (req, res) => {
  const { username, productId } = req.body;
  const sql =
    "DELETE FROM cart WHERE user = (SELECT id FROM users WHERE username = ?) and product = ?";

  db.run(sql, [username, productId], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    } else {
      res.status(200).send();
    }
  });
});

app.post("/getCart", (req, res) => {
  const { username } = req.body;
  const sql =
    "SELECT product FROM cart WHERE user = (SELECT id FROM users WHERE username = ?)";

  db.all(sql, [username], (err, rows) => {
    if (err) {
      console.log(err.message);
      res.status(500).send("Internal Server ERROR");
    } else {
      res.status(200).send(rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

