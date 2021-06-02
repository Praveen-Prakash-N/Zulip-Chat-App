const zulip = require('zulip-js');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
var encodeUrl = require('encodeurl');
const FormData = require('form-data');



const app = express();
const PORT = process.env.PORT || 8080;

// const globalConfig = {
//   username: 'gdinesh1707@gmail.com', password:'DineshKumar&DTech', realm: 'https://dtech.zulipchat.com'
// }

// const path = require('path');
// const zuliprc = path.resolve(__dirname, '.zuliprc');
const config = { zuliprc: ".zuliprc" };

// Data Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// HTTP request logger
app.use(cors());
app.use(morgan('tiny'));



// get Users
app.get('/users', (req, res) => {
  (async  () => {
        const client = await zulip(config);

        await client.users.retrieve({ })
          .then((data) => {
            console.log('Data:', data);
            res.json(data);
          })
          .catch((error) => {
            console.log('error', daerrorta)
          })
    
        // console.log(await client.users.retrieve());
    
        // console.log(await client.users.retrieve({client_gravatar: true}));
    })();
})


// get messages
app.get('/messages/:otherUser', (req, res) => {
  (async () => {
    const client = await zulip(config);

    const mail = req.params.otherUser;

    const readParams = {
        anchor: "newest",
        num_before: 100,
        num_after: 0,
        narrow: [
            {operator: "pm-with", operand: mail }
        ],
    };

    await client.messages.retrieve(readParams)
      .then((data) => {
        console.log('Data:', data);
        res.json(data);
      })
      .catch((error) => {
        console.log('error', daerrorta)
      })
  })();
})

app.get('/getUserByEmail/:otherUser', (req, res) => {

  (async () => {
    const client = await zulip(config);

    const email = req.params.otherUser;

    await client.callEndpoint(`/users/${email}`, 'GET')
      .then((data) => {
        console.log('Data:', data);
        res.json(data);
      })
      .catch((error) => {
        console.log('error', error);
      })
  })();

})

// send message

app.post('/send', (req, res) => {
  (async () => {
    const client = await zulip(config);
    const user_mail_id = req.body.user;
    // const msgType = req.body.msgType;
    const msgContent = req.body.msg;
    params = {
        to: user_mail_id,
        type: "private",
        content: msgContent
    };

    await client.messages.send(params),((error) => {
      if (error) {
        res.status(500).json({ msg: 'Sorry, internal server errors' });
        return;
    }
    
    res.json({
        msg: 'Your msg has been sent!!!'
    });
    }) 
    
  })();

});


// Get own user

app.get('/ownuser', (req, res) => {

  (async () => {
    const client = await zulip(config);

    await client.users.me.getProfile({ })
      .then((data) => {
        console.log('Data:', data);
        res.json(data);
      })
      .catch((error) => {
        console.log('error', daeerrorta)
      })

  })();
  
})

// Get User Profile

app.get('/getUserByEmail', (req, res) => {
  
  let username = req.body.username;
  let myName = req.body.otheruser;

  let config = {
    username, password: 'DineshKumar&DTech', apiURL: "https://dtech.zulipchat.com"
  }
  var data = new FormData();
  data.append('username', myName);
  // data.append('password', 'Dinesh&Dtech');

  let configg = {
    method: 'post',
    url: 'https://dtech.zulipchat.com/api/v1/fetch_api_key',
    headers: {
      ...data.getHeaders()
    },
    data: data
  };

  axios(configg)
    .then(function (response) {
      let apiKeyData = response.data;
      let { email, api_key } = apiKeyData;
      let auth = Buffer.from("".concat(email,":").concat(api_key)).toString('base64');
      var authHeader = "Basic ".concat(auth);

      axios.get(`https://dtech.zulipchat.com/api/v1/users/${myName}`, {
        headers: {
          'Authorization': authHeader
        }
      }).then(details => {
        console.log(details.data)
        res.send(details.data)
      })
    })
    .catch(function (error) {
      console.log(error);
    });
})

// Create a New Group 

app.post('/createnewgroup', (req, res) => {
  (async () => {
    const client = await zulip(config);

    const grpName = req.body.grpName;
    var userMailId = [];

    userMailId.push(req.body.mailId);
    
    for(let i=0; i<userMailId.length; i++) {
      const createGroupParams = {
        subscriptions: JSON.stringify([{name: grpName}]),
        principals: JSON.stringify(userMailId[i]),
      }
      await client.users.me.subscriptions.add(createGroupParams),((error) => {
        if(error) {
          res.status(500).json({ msg: 'Sorry, Internal server error' });
          return;
        }

        res.json({
          msg: 'Your group has been created with the following users!!!'
        });
      })
    }

  })();  
})


// Get subscribed groups 

app.get('/subscribedGroups', (req, res) => {
  (async () => {
    const client = await zulip(config);
    // console.log(await client.streams.subscriptions.retrieve({include_subscribers: true}));
    await client.streams.subscriptions.retrieve({include_subscribers: true})
    .then((data) => {
      console.log('Data:', data);
      res.json(data);
    })
    .catch((error) => {
      console.log('error', error);
    })
  })();
})


// Get User Profile

app.get('/getUserByEmail/:otherUser', (req, res) => {

  (async () => {
    const client = await zulip(config);

    const email = req.params.otherUser;

    await client.callEndpoint(`/users/${email}`, 'GET')
      .then((data) => {
        console.log('Data:', data);
        res.json(data);
      })
      .catch((error) => {
        console.log('error', error);
      })
  })();

})

// Get User presence

app.get('/getUserPresence/:otherUser', (req, res) => {

  (async () => {
    const client = await zulip(config);

    const email = req.params.otherUser;

    await client.callEndpoint(`/users/${email}/presence`, 'GET')
      .then((data) => {
        console.log('Data:', data);
        res.json(data);
      })
      .catch((error) => {
        console.log('error', error);
      })
  })();

})


// Register for events
app.post('/registerForMessageEvents', (req, res) => {
  // let username = req.body.username;
  let config = {
    username:'praveenprakash2699@gmail.com', password: 'Praveen@02', apiURL: "https://dtech.zulipchat.com", realm: 'https://dtech.zulipchat.com'
  }
  zulip(config).then(async (z) => {
    let params = {
      event_types: ["message"],
    };
    return await z.queues.register(params);
  }).then(r => {
    console.log(r)
    res.send(r)
  }).catch(console.err)
})

// LongPoll Api

app.post('/longpoll', (req, res) => {
  let { queue_id } = req.body;
  queue_id = queue_id.replace(':',"%3A")
  var data = new FormData();
  data.append('username', 'praveenprakash2699@gmail.com');
  data.append('password', 'Praveen@02');

  let configg = {
    method: 'post',
    url: 'https://dtech.zulipchat.com/api/v1/fetch_api_key', 
    headers: {
      ...data.getHeaders()
    },
    data: data
  };
  let url = `https://dtech.zulipchat.com/json/events?dont_block=false&queue_id=${queue_id}&last_event_id=-1`
  let encodedUrl = encodeUrl(url);
  axios(configg)
    .then(function (response) {
      let apiKeyData = response.data;
      let { email, api_key } = apiKeyData;
      let auth = Buffer.from("".concat(email,":").concat(api_key)).toString('base64');
      var authHeader = "Basic ".concat(auth);
      console.log(authHeader)
      axios.get(encodedUrl, { headers: { 'Authorization': authHeader } 
      }).then(pollResponse => {
        console.log('%o', pollResponse.data)
        res.send(pollResponse.data)
      }).catch(console.log)
    })
    .catch(console.err);
})


// const config = { zuliprc: ".zuliprc-admin" };

// sending a private message

// (async () => {
//   const client = await zulip(config);
  
//   const user_mail_id = "nirmalkumarcse07@gmail.com";
//   params = {
//       to: [user_mail_id],
//       type: "private",
//       content: "Hi bro, This message is sent from node"
//   };
//   console.log(await client.messages.send(params));
// })();


// Get all users

// (async  () => {
//     const client = await zulip(config);

//     console.log(await client.users.retrieve());

//     console.log(await client.users.retrieve({client_gravatar: true}));
// })();





// Create a user

// (async () => {
//     const client = await zulip(config);

//     const params = {
//         email: "techyfresh2k21@gmail.com",
//         password: "TechyFresh2k21",
//         full_name: "Prem Kumar"
//     };
//     console.log(await client.users.create(params));
// })();


// Get a messages 

// (async () => {
//     const client = await zulip(config);

//     const readParams = {
//         anchor: "newest",
//         num_before: 100,
//         num_after: 0,
//         narrow: [
//             {operator: "sender", operand: "dineshvinayakam2065620@gmail.com"},
//             {operator: "stream", operand: "DFreshers" },
//         ],
//     };

//     console.log(await client.messages.retrieve(readParams));
// })();

app.listen(PORT, () => console.log(`Server Started at ${PORT}`));