
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Route to get address
app.get('/getAddress', (req, res) => {
  const id = req.query.id;
  getAddress(id, (err, address) => {
      if (err) {
          res.status(500).send('Error retrieving address');
      } else {
          const response = {
              address: address,
          };
          res.send(response);
      }
  });
});

// Route to add address
app.post('/addAddress', (req, res) => {
  const signature = req.body.signature;

  const message = req.body.message;
  const address = verifySignedMessage(message, signature);
  addAddress(address, (err, id) => {
      if (err) {
          res.status(500).send('Error adding address');
      } else {
          const response = {
              id: id,
              address: address,
          };
          res.send(response);
      }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
