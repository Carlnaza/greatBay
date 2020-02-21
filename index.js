const prompt = require('inquirer').createPromptModule();

quesionsPost = [
  ''
];
questionsBid = [
  ''
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
  .then( (response) => {
    if(response.choice === 'POST AN ITEM'){
      postItem();
    }
    else {
      bidItem();
    }
  })
  .catch(e => console.log(e))
}

function postItem(){
  console.log('ok')
}
function bidItem(){
  console.log('ok boomer')
}

init();