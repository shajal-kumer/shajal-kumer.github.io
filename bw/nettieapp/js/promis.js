const BASE_URL = "https://apiv11.myquestionnaire.nl";
const auth_data = {
  username: "mobilecare_admin@cleversoft.nl", 
  password: "123456", 
  SessionID: UUIDjs.create().hex,
  PatientID: localStorage.getItem('client Number'), 
  MaxQuestions: 3,
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
    // console.log('login response = ', res.data);
    
    auth_data.customerID = res.data.customerID;
    auth_data.access_token = res.data.access_token;
    // auth_data.username = res.data.username;
    
  }).catch(function(error) {
   alert(error);
  });
})();

//load categories
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
        // console.log('getItemBank ', res.data);
        insertIntoApp(chooseCategoryTemplate(res.data));
        //show category select button
        showButton('category');
        //hide preloader
        setPreloaderState(false);
      })
      .catch(function(error) {
        alert(error);
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
      alert('please select a category');
      return false;
    }

    //init preloader
    setPreloaderState(true);
    // console.log('auth data = ', auth_data);
    
    axios(`${BASE_URL}/api/ItemBank/GetItem`, { 
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${auth_data.access_token}`
      }, 
      data: JSON.stringify({
        PatientID: auth_data.PatientID, 
        ItembankID: getSelectedCategory(), 
        SessionID: auth_data.SessionID, 
        CustomerID: auth_data.customerID, 
        MaxQuestions: auth_data.MaxQuestions
      }), 
      method: 'POST'
      })
      .then(function(res) {
        // console.log('itembandid = ', res.data.ItembankID);
        // console.log(res.data);
        insertIntoApp(questionTemplate(res.data));
        showButton('question');

        //hide preloader
        setPreloaderState(false);

        renderQuestions();

        auth_data.ItembankID = res.data.ItembankID;
        auth_data.ItemID = res.data.ItemID;

      })
      .catch(function(error) {
        alert(error);
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
        // console.log('selected answer ', getSelectedAnswer());
        
        if(!getSelectedAnswer()) {
          alert('please select an answer');
          return true;
        }

        //init preloader
        setPreloaderState(true);
        // console.log('selected answer ', getSelectedAnswer());
        
        axios(`${BASE_URL}/api/ItemBank/UpdateResponse`, { 
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${auth_data.access_token}`
          }, 
          data: JSON.stringify({
            PatientID: auth_data.PatientID, 
            ItembankID: auth_data.ItembankID, 
            SessionID: auth_data.SessionID, 
            CustomerID: auth_data.customerID, 
            RespondedID: getSelectedAnswer(), 
            ItemID: auth_data.ItemID, 
            MaxQuestions: auth_data.MaxQuestions
          }), 
          method: 'POST'
          })
          .then(function(res) {
            // console.log(res.data);

            if(res.data.ScoreInterpretations.length > 0) {
              let report = '';
              res.data.ScoreInterpretations.forEach(function(score) {
                report += `${score.Norm} = ${score.Score} \n`;
              });
              alert(report);
              insertIntoApp(renderReport());
              setPreloaderState(false);
              return true;
            }
            
            insertIntoApp(questionTemplate(res.data));

            auth_data.ItemID = res.data.ItemID;

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
    <h6 class="mb-3">Please select a category from below</h6>
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
  if(question.Responses.length > 0) {
    return `
      <div class="question" id=${question.ItemID}>
        <h6 class="mb-3">${question.ItemTitle}</h6>
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

  return `
    <h6>No more question, Thanks</h6>
  `
}

function renderReport() {
  const submitBtn = document.querySelector('#submit_answer').style.display = 'none';
  return `<h4>Thanks for participating!</h4>`;
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
function showButton(button) {
  if(button === "category") {
    const submitBtn = document.querySelector('#submit_answer');
    submitBtn.style.display = 'none';

    const categoryBtn = document.querySelector('#select_category');
    categoryBtn.style.display = 'inline-block';
  }

  if(button === "question") {
    const categoryBtn = document.querySelector('#select_category');
    categoryBtn.style.display = 'none';

    const submitBtn = document.querySelector('#submit_answer');
    submitBtn.style.display = 'inline-block';
  }
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