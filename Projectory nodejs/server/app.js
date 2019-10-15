require('dotenv').config();
const { Client } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const app = express();
const path = require('path');
const port = 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api',router)

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
const connectionString = 'postgres://postgres:postgres@localhost:5432/projectory';


const client = new Client({
  connectionString: connectionString
});
client.connect();


app.use(express.static('/../client/public/'));
router.get('/', function(req, res) {
  // res.send('hello world');
  res.json({ success: true });
});

// app.get('/getUser', function(req, res) {
//   // res.send('hello world');
//   res.json({ success: true });
// });

// app.post('/userConnection', function(req, res){
//   `INSERT INTO users (email) VALUES ('${req.body.email}');`
//    const user = {
//       projects: [],
//       email: req.body.email,
//       theme: 'Dark'
//     };
//     console.log(req.body);
//     res.status(200).send(JSON.stringify(user));
//   }
// );

  app.post('/userConnection', function(req, res, next){
    client.query(`SELECT * FROM users WHERE email = '${req.body.email}'`, async function(err,result) {
      if (result.rows.length === 0) {
        client.query(`INSERT INTO users (email) VALUES ('${req.body.email}');`,
          function(err, result2) {
            if (err) {
              console.log(err);
              res.status(400).send(err);
            }
            const user = {
              // projects: [],
              email: req.body.email,
              theme: 'Dark'
            };
      // console.log(req.body);
      // console.log(req.body.email);
          res.status(200).send(JSON.stringify(user));
          // res.status(200).send(user);
        });
      }
      else{
        const currentTheme = await getTheme(req.body.email);
        // const listOfProjects = await getProjects(req.body.email);
        const user = {
        // projects: listOfProjects,
        email: req.body.email,
        theme: currentTheme
      };
      // console.log(user);
      res.status(200).send(user);
    }
  });
});


async function getTheme(email) {
  try {
    const result = await client.query(`SELECT theme FROM users WHERE email = '${email}'`);
    return result.rows[0].theme;
  } catch (err) {
    console.error(err);
  }
}

app.post('/changeTheme', function(req, res, next) {
  console.log('update theme');
  client.query(`UPDATE users SET theme = '${req.body.theme}' WHERE email = '${req.body.email}';`,
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(200).send();
    }
  );
});

// app.post('/getProjects', async function(req, res, next){
//   console.log('get project');
//   try {
//     const ans = await client.query(`SELECT * FROM projects WHERE email = '${req.body.email}'`);
//       console.log(ans.rows);
//       res.status(200).send(ans.rows);
//   } catch (err) {
//     console.log(err);
//     res.status(400).send(err);
//   }
// });

app.post('/getProjects', async function(req, res, next){
  console.log('get project');
   client.query(`SELECT * FROM projects WHERE email = '${req.body.email}'`, 
      function(err, result) {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        console.log('add project2');
        // res.status(200).send(result);
        result.rows.forEach(r => {
          r.tasks = [];
        });
        res.status(200).send(result.rows);
      });
});



app.post('/addProject', function(req, res, next) {
  console.log('add project');
  const date = new Date();
  const start_date = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  console.log(date);
  client.query(`INSERT INTO projects (email, project_name, start_date, checked) 
  VALUES ('${req.body.email}','Add a new project name','${start_date}',false );`,
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      client.query(`SELECT * FROM projects WHERE email = '${req.body.email}'`, 
      function(err, result) {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        console.log('add project2');
        // res.status(200).send(result);
        res.status(200).send(result.rows);
      });
    }
  );
});


app.post('/deleteProject', async function(req, res, next){
  console.log('delete project');
  const query = `DELETE FROM projects WHERE project_id = ${req.body.project_id};`;
  client.query(query, function(err, result) {
    if (err) {
      console.log(query);
      console.log(err);
      res.status(400).send(err);
    }
    console.log('delete project2');
    client.query(`SELECT * FROM projects WHERE email = '${req.body.email}'`, function(
      err,
      result
    ) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      console.log('delete project3');
      res.status(200).send(result.rows);
    });
  });
});

app.post('/renameProject', function(req, res, next) {
  console.log('update name project');
  const query = `UPDATE projects SET project_name = '${req.body.project_name}' WHERE project_id = ${req.body.project_id};`;
  console.log(query);
  client.query(
    query,
    function(err, result) {
      if (err) {
        console.log('update name project error');
        console.log(err);
        res.status(400).send(err);
      }
      client.query(`SELECT * FROM projects WHERE email = '${req.body.email}'`, function(
        err,
        result
      ) {
        if (err) {
          console.log('update name project error2');
          console.log(err);
          res.status(400).send(err);
        }
        console.log('update name project2');
        res.status(200).send(result.rows);
      });
    }
  );
});

app.post('/addTask', function(req, res, next) {
  console.log('add task');
  client.query(
    `INSERT INTO tasks (project_id, task_name) VALUES ('${req.body.project_id}','Add a new task name');`,
    function(err, result) {
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      client.query(`SELECT * FROM tasks Where project_id = ${req.body.project_id}`, function(
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

  //   async function(err,result){
  //     if (err) {
  //         console.log(err);
  //         res.status(400).send(err);
  //       }
  //     console.log(res.rows);
  //     res.status(200).send(res.rows);
  // });

// app.get('/getProject', function(req, res) {
//   // res.send('hello world');
//   res.json({ success: true });
// });


// app.post('/renameProject', function(req, res){

// })

// app.post('/checkProject', function(req, res){

// })

// app.get('/getTasks', function(req, res) {
//   // res.send('hello world');
//   res.json({ success: true });
// });

// app.post('/createTask', function(req, res){

// })

// app.post('/renameTask', function(req, res){

// })

// app.post('/deleteTask', function(req, res){

// })

// app.post('/checkTask', function(req, res){

// })



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
