const BASE_URL = "http://apiv11.myquestionnaire.nl";
const auth_data = {
  username: "mobilecare_admin@cleversoft.nl", 
  password: "123456", 
  SessionID: "062235ba-cf18-4d6e-b633-a5fc30c15e20",
  PatientID: Math.floor(Math.random() * 10), 
  access_token: null, 
  customerID: null, 
  ItembankID: null, 
  ItemID: null
};
let isLoading = false;

//login and get the access-token on page load
(function() {
  axios(`${BASE_URL}/token`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }, 
    method: 'POST', 
    data: Qs.stringify({
      grant_type: 'password', 
      username: auth_data.username, 
      password: auth_data.password
    })
  }).then(function(res) {
    
    auth_data.customerID = res.data.customerID;
    auth_data.access_token = res.data.access_token;
    auth_data.username = res.data.username;
    
  }).catch(function(error) {
    console.log(error);
  });
})();


//load categories on document load
(function() {
  "use strict"

  const plus_icon = document.querySelector('.plus-icon');

  plus_icon.addEventListener('click', function() {
    //set preloader
    setPreloaderState(true);
    axios(`${BASE_URL}/api/ItemBank/GetItemBank?customerID=${auth_data.customerID}`, { 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Authorization': `Bearer ${auth_data.access_token}`
      },  
      method: 'GET'
      })
      .then(function(res) {
        console.log(res.data);
        insertIntoApp(chooseCategoryTemplate(res.data));
        //hide preloader
        setPreloaderState(false);
      })
      .catch(function(error) {
        console.log(error);
        setPreloaderState(false);
      });

  });

})();

//select question category 
(function() {
  "use strict"

  const categorySelectBtn = document.querySelector('#select_category');
  
  categorySelectBtn.addEventListener('click', function() {
    if(!getSelectedCategory()) {
      console.log('please select a category');
      return true;
    }

    //init preloader
    setPreloaderState(true);
    
    axios(`${BASE_URL}/api/ItemBank/GetItem`, { 
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${auth_data.access_token}`
      }, 
      data: JSON.stringify({
        PatientID: auth_data.PatientID, 
        ItembankID: getSelectedCategory(), 
        SessionID: auth_data.SessionID, 
        CustomerID: auth_data.customerID
      }), 
      method: 'POST'
      })
      .then(function(res) {
        console.log(res.data.ItembankID);
        insertIntoApp(questionTemplate(res.data));
        changeId();

        //hide preloader
        setPreloaderState(false);

        renderQuestions();

        auth_data.ItembankID = res.data.ItembankID;
        auth_data.ItemID = res.data.ItemID;

      })
      .catch(function(error) {
        console.log(error);
        setPreloaderState(true);
      });

  });
})();

//submit a question answer
function renderQuestions() {
  return (function() {
    "use strict"
    const questionSubmitBtn = document.querySelector('#submit_answer');
    
    if(questionSubmitBtn) {
      questionSubmitBtn.addEventListener('click', function() {
        
        if(!getSelectedAnswer()) {
          console.log('please select an answer');
          return true;
        }

        //init preloader
        setPreloaderState(true);

        axios(`${BASE_URL}/api/ItemBank/UpdateResponse`, { 
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${auth_data.access_token}`
          }, 
          data: JSON.stringify({
            PatientID: "123", 
            ItembankID: auth_data.ItembankID, 
            SessionID: auth_data.SessionID, 
            CustomerID: auth_data.customerID, 
            RespondedID: getSelectedAnswer(), 
            ItemID: auth_data.ItemID
          }), 
          method: 'POST'
          })
          .then(function(res) {
            
            insertIntoApp(questionTemplate(res.data));

            //hide preloader
            setPreloaderState(false);
          });
      });
    }
  })();
}


//category choosing template
function chooseCategoryTemplate(lists) {
  return `
    <h6>Please select a category from below</h6>
    <div class="categories">
      <ul>
        ${
          lists.map(function(list) {
            return `
              <li>
                <div class="custom-control custom-radio">
                  <input type="radio" class="custom-control-input" id=${list.ID} name="radio-category" required>
                  <label class="custom-control-label" for=${list.ID}>${list.Name}</label>
                </div>
              </li>
            `
          }).join('')
        }
      </ul> 
    </div>
  `
}

//question template
function questionTemplate(question) {
  return `
    <div class="question" id=${question.ItembankID}>
      <h6>${question.ItemTitle}</h6>
      <ul>
        ${
          question.Responses.map(function(response) {
            return `
              <li>
                <div class="custom-control custom-radio">
                  <input type="radio" class="custom-control-input" id=${response.ResponseID} name="radio-question" required>
                  <label class="custom-control-label" for=${response.ResponseID}>${response.Description}</label>
                </div>
              </li>
            `
          }).join('')
        }
      </ul>
    </div>
  `
}

//insert something into DOM (#app)
function insertIntoApp(DOM) {
  document.querySelector('#app').innerHTML = DOM;
}

//get the category user selected
function getSelectedCategory() {
  const radioButtons = document.getElementsByName('radio-category');
  for(let i = 0; i < radioButtons.length; i++) {
    if(radioButtons[i].checked) {
      return radioButtons[i].getAttribute('id');
    }
  }
}

//get the option user selected
function getSelectedAnswer() {
  const radioButtons = document.getElementsByName('radio-question');
  for(let i = 0; i < radioButtons.length; i++) {
    if(radioButtons[i].checked) {
      
      return radioButtons[i].getAttribute('id');
    }
  }
}

//change the submit button id to submit question
function changeId() {
  const categoryBtn = document.querySelector('#select_category');
  categoryBtn.setAttribute('id', 'submit_answer');
}

//initalize preloader
function setPreloaderState(state) {
  isLoading = state;
  const preloader = document.querySelector('.preloader');
  if(isLoading) {
    preloader.classList.add('active');
  } else {
    preloader.classList.remove('active');
  }
}