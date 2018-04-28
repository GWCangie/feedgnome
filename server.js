
//test stuff to run querry
var vfile = require('to-vfile');
var retext = require('retext');
var keywords = require('retext-keywords');
var nlcstToString = require('nlcst-to-string');
//end of querry testing 

//code to make into web page
var http = require('http');
http.createServer(onRequest).listen(3000);
console.log('server has started ');

function onRequest(request, response){
  response.writeHead(200);
  response.write();
  response.end();
}

function showPage(response){
  response.writeHead(200);
  response.write('hello noders');
  response.node();
}
//code to interact with user 
 var readlineSync = require('readline-sync');

//end of web page code 
var fs = require('fs');
var Twit = require('twit');
var fs = require('fs'),
    path = require('path'),
    Twit = require('twit'),
    config = require(path.join(__dirname, 'config.js'));
var T = new Twit(config);

//function that lists statuses of users in said list 
var liststatuses = function(){
   var options = {
    //name of user 
    owner_screen_name:'tampabayWaVE',
    //name of owned list
    slug:'Roundtable',
    include_entities: false
    //count:15
    };
 
//gets statuses of users in the specified list 
T.get('lists/statuses', options,function(err,data){
  
  if(!err){
    //local array to copy statuses too
    var statusesdata = [ ];
    //used for indexing statuses when loading array
    var count = 0;
    //this for loop goes through the tweets returned
    for(var i=0;i<data.length;i++){
      //console.log(data[i].source);
     //console.log(data[i].created_at);
     //console.log(data[i].text);

        //if a tweet has a higher favorite count then retweet count it will 
        //be copied to an array that stores tweets to be analyed
       if(data[i].favorite_count>data[i].retweet_count){
          //takes tweet and stores it to local array of tweets
           statusesdata[count]=data[i].text;
           //updates index for position of next tweet
           count =count +1;
        }
       }
     }
     //testing puposes for loop to test array isint empty
     for(var j=0;j<statusesdata.length;j++){
      console.log(statusesdata[j]);
     }
     //opens file and transfers from local array to test.txt
     var stream = fs.createWriteStream("test.txt");
stream.once('open', function(fd) {
  for(var i =0;i<statusesdata.length;i++){
    stream.write(statusesdata[i]);
  }
  
  
  stream.end();
});

})
}

 

//liststatuses();


//adds a user to the list 
var adduser = function(){
  //will allow for user input
  //used when adding user from command line 
 
var params = {
  owner_screen_name:'tampabayWaVE',
  screen_name:'MichelleObama',
  slug:'TBWaVE members'
}

T.post('lists/members/create',params, function(err,data){
   if(!err){
    console.log('user added successfully!');
   }
   else{
    console.log('something went wrong');
   }
})
}
 //adduser();


//removes user from list 
var removeuser = function(){

var params = {
  owner_screen_name:'tampabayWaVE',
  screen_name:'MichelleObama',
  slug:'TBWaVE members'
}

T.post('lists/members/destroy',params,function(err,data){
  if(!err){
    console.log('User removed succesfully!!!');
  }
  else{
    console.log('Something went wrong');
  }
})

}

//removeuser();
 liststatuses();
//analyzes text in test.txt for key words
 function keysearch(){


retext()
  .use(keywords)
  .process(vfile.readSync('test.txt'), function (err, file) {
    if (err) throw err;

    console.log('Keywords:');
    file.data.keywords.forEach(function (keyword) {
      console.log(nlcstToString(keyword.matches[0].node));
    });

    console.log();
    console.log('Key-phrases:');
    file.data.keyphrases.forEach(function (phrase) {
      console.log(phrase.matches[0].nodes.map(nlcstToString).join(''));
    });
  }
);
}

keysearch();
var name = readlineSync.question('what is your name ?');
console.log(name);
