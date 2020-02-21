const prompt = require('inquirer').createPromptModule();
const mysql = require('mysql2')

questionsPost = [
  'What is the name of the item?',
  'What is the category of the item?',
  'What is the starting bid?'
];
questionsBid = [
  'How much would you like to bid?'
];

function init() {
  prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: ['POST AN ITEM', 'BID ON AN ITEM']
    }
  ])
    .then((response) => {
      if (response.choice === 'POST AN ITEM') {
        postItem();
      }
      else {
        bidItem();
      }
    })
    .catch(e => console.log(e))
}

function postItem() {
  prompt([
    {
      type: 'input',
      name: 'name',
      message: questionsPost[0]
    },
    {
      type: 'input',
      name: 'category',
      message: questionsPost[1]
    },
    {
      type: 'number',
      name: 'starting_price',
      message: questionsPost[2]
    }
  ])
    .then((response) => {
      console.log(response);
      createAuction(response.name, response.category, response.starting_price, response.starting_price);

    })
    .catch(e => console.log(e));
}
function bidItem() {
  connection.query('SELECT * FROM auctions', (err, items) => {
    if (err) { console.log(err) }
    prompt([
      {
        type: 'list',
        name: 'item',
        message: 'Which item do you want to bid on?',
        choices: function () {
          let choices = [];
          for (let i = 0; i < items.length; i++) {
            choices.push(items[i].item);
          }
          return choices;
        }
      },
      {
        type: 'number',
        name: 'bid',
        message: questionsBid[0]
      }
    ])
      .then((response) => {

        connection.query('SELECT current_bid FROM auctions WHERE item = ?', { item: `${response.item}` }, (err, price) => {
          if (err) { console.log(err) }

          if (price >= response.bid) {
            console.log(`Bid is too low, current bid is ${price}`);

          } else {
            bid(response.bid, response.item);

          }
        })


      })
      .catch(e => console.log(e));
  })



}

init();


const connection = mysql.createConnection(
  {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'spikey11',
    database: 'greatbay'
  }
)


// Creates an auction
function createAuction(item, cat, starting, current) {
  connection.query('INSERT INTO auctions SET ?', {
    item: item,
    category: cat,
    starting_bid: starting,
    current_bid: current
  }, (err) => {
    if (err) { console.log(err) }
    console.log(`You've created an item:${item}`)
    init();
  })
}

function getAuction(item) {
  connection.query('SELECT * FROM auctions WHERE item = ?', { item: `${item}` }, (err, items) => {
    if (err) { console.log(err) }
    console.log(items)
  })
}
function getAuctionPrice(item) {

}
// Finds Item to bid on
function getAuctions() {
  connection.query('SELECT item FROM auctions', (err, items) => {
    if (err) { console.log(err) }
    console.log(items)
  })
}

// search by keyword
function searchAuctions(search) {
  connection.query(`SELECT * FROM auctions WHERE item LIKE '${search}%'`, (err, items) => {
    if (err) { console.log(err) }
    console.log(items)
  })
}

// Makes a bid on an item
function bid(bid, item) {
  connection.query('UPDATE auctions SET ? WHERE ?', [{ current_bid: `${bid}` }, { item: `${item}` }], (err) => {
    if (err) { console.log(err) }
    console.log(`New highest bid is set to ${bid}.`)
  })
}
