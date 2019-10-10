require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');
const app = express();
const path = require('path');
const PORT = 3000;
app.use(express.static('./dist/projectory'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

//connect to db
// const connectionString = 'postgres://postgres:postgres@localhost:5432/postgres';
const connectionString = process.env.DATABASE_URL;
const client = new Client({
  connectionString: connectionString
});
client.connect();

//***********************************************************************************
app.get('/getProject', function(req, res, next) {
  console.log('get projects');
  client.query(`SELECT * FROM tbProject WHERE email = '${req.query.userEmail}'`, function(
    err,
    result
  ) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });
});

app.get('/tasks', function(req, res, next) {
  console.log('get tasks');
  client.query(`SELECT * FROM tbTask Where idProject = ${req.query.idProject}`, function(
    err,
    result
  ) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send(result.rows);
  });
});

app.post('/addProject', function(req, res, next) {
  console.log('add project');
  const d = new Date();
  const date_start = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;

  client.query(
    `INSERT INTO tbProject (name, date_start, checked,email) VALUES ('${req.body.name}','${date_start}',false ,'${req.body.userEmail}');`,
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      client.query(`SELECT * FROM tbProject WHERE email = '${req.body.userEmail}'`, function(
        err,
        result
      ) {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(result.rows);
      });
    }
  );
});

app.post('/deleteProject', function(req, res, next) {
  console.log('delete project');
  client.query(`DELETE FROM tbProject WHERE id = ${req.body.id};`, function(err, result) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    client.query(`SELECT * FROM tbProject WHERE email = '${req.body.userEmail}'`, function(
      err,
      result
    ) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(200).send(result.rows);
    });
  });
});

app.post('/addTask', function(req, res, next) {
  console.log('add task');
  client.query(
    `INSERT INTO tbTask (idProject, name, checked) VALUES ('${req.body.idProject}','${req.body.nameTask}',false);`,
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      client.query(`SELECT * FROM tbTask Where idProject = ${req.body.idProject}`, function(
        err,
        result
      ) {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(result.rows);
      });
    }
  );
});

app.post('/deleteTask', function(req, res, next) {
  console.log('delete task');
  client.query(`DELETE FROM tbTask WHERE id = ${req.body.id};`, function(err, result) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    client.query(`SELECT * FROM tbTask Where idProject = ${req.body.idProjectCurrent}`, function(
      err,
      result
    ) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(200).send(result.rows);
    });
  });
});

app.post('/updateCheckProject', function(req, res, next) {
  console.log('update checked project');
  client.query(
    `UPDATE tbProject SET checked = (CASE WHEN (checked = true) THEN false ELSE true END) WHERE id = ${req.body.id};`,
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      client.query(`SELECT * FROM tbProject WHERE email = '${req.body.userEmail}'`, function(
        err,
        result
      ) {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(result.rows);
      });
    }
  );
});

app.post('/updateCheckTask', function(req, res, next) {
  console.log('update checked Task');
  client.query(
    `UPDATE tbTask SET checked = (CASE WHEN (checked = true) THEN false ELSE true END) WHERE id = ${req.body.id};`,
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      client.query(`SELECT * FROM tbTask Where idProject = ${req.body.idProjectCurrent}`, function(
        err,
        result
      ) {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(result.rows);
      });
    }
  );
});

app.post('/renameProject', function(req, res, next) {
  console.log('update name project');
  client.query(
    `UPDATE tbProject SET name = '${req.body.renameProject}' WHERE id = ${req.body.idProject};`,
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      client.query(`SELECT * FROM tbProject WHERE email = '${req.body.userEmail}'`, function(
        err,
        result
      ) {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(result.rows);
      });
    }
  );
});

app.post('/connectUser', function(req, res, next) {
  console.log('connectUser');
  client.query(`SELECT * FROM tbUser WHERE email = '${req.body.email}'`, async function(
    err,
    result
  ) {
    if (result.rows.length === 0) {
      client.query(
        `INSERT INTO tbUser (email, password) VALUES ('${req.body.email}','${req.body.password}');`,
        function(err, result2) {
          if (err) {
            console.log(err);
            res.status(400).send(err);
          }
          const user = {
            listProjects: [],
            emailUser: req.body.email,
            themes: 'Dark'
          };
          console.log(user);
          res.status(200).send(JSON.stringify(user));
        }
      );
    } else {
      const themes = await themesUser(req.body.email);
      const listProjects = await projectsUser(req.body.email);
      const user = {
        listProjects: listProjects,
        emailUser: req.body.email,
        themes: themes
      };
      console.log(user);
      res.status(200).send(user);
    }
  });
});

async function projectsUser(email) {
  try {
    const result = await client.query(`SELECT * FROM tbProject WHERE email = '${email}'`);
    return result.rows;
  } catch (err) {
    console.error(err);
  }
}
async function themesUser(email) {
  try {
    const result = await client.query(`SELECT themes FROM tbUser WHERE email = '${email}'`);
    return result.rows[0].themes;
  } catch (err) {
    console.error(err);
  }
}

app.post('/changeThemeUser', function(req, res, next) {
  console.log('update theme user');
  client.query(
    `UPDATE tbUser SET themes = '${req.body.theme}' WHERE email = '${req.body.userEmail}';`,
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(200).send();
    }
  );
});
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/projectory/index.html'));
});
app.listen(process.env.PORT || PORT, function() {
  console.log('server started at port ' + PORT);
});
