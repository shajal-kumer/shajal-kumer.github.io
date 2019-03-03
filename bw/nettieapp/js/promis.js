const BASE_URL = "http://apiv11.myquestionnaire.nl";
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
let categorySelected = false;


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
    // auth_data.username = res.data.username;
    
  }).catch(function(error) {
    console.log(error);
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
        
        insertIntoApp(chooseCategoryTemplate(res.data));
        //show category select button
        showButton('category');
        //hide preloader
        setPreloaderState(false);
      })
      .catch(function(error) {
        
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
      
      return false;
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
        CustomerID: auth_data.customerID, 
        MaxQuestions: auth_data.MaxQuestions
      }), 
      method: 'POST'
      })
      .then(function(res) {
        
        insertIntoApp(questionTemplate(res.data));
        showButton('question');

        categorySelected = true;

        //hide preloader
        setPreloaderState(false);

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
(function() {
  "use strict"
  const questionSubmitBtn = document.querySelector('#submit_answer');
  
  if(questionSubmitBtn) {
    questionSubmitBtn.addEventListener('click', function() {
      
      
      if(!getSelectedAnswer()) {
        
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
          if(res.data.ScoreInterpretations.length > 0) {
            insertIntoApp(renderReport(res.data.ScoreInterpretations[0]));
            setPreloaderState(false);
            const submitBtn = document.querySelector('#submit_answer').style.display = "none";
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

//back button
(function() {

  const backButton = document.querySelector('#question_back_button');
  
  backButton.addEventListener('click', function() {
    
    auth_data.SessionID = UUIDjs.create().hex;
    
  });

})();


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
                <div class="d-flex align-items-center">
                  <div>
                    <input type="radio" id=${list.ID} name="radio-category" required>
                    <label class="radio-button" for=${list.ID}></label>
                  </div>
                  <div class="ml-3">
                    ${list.Name.slice(26,)}
                  </div>
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
                  <div class="d-flex align-items-start">
                    <div>
                      <input type="radio" id=${response.ResponseID} name="radio-question" required>
                      <label class="radio-button" for=${response.ResponseID}></label>
                    </div>
                    <div class="ml-2">
                      ${response.Description}
                    </div>
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

function renderReport(report) {
  return `<h4 class="show_result">
            ${
    report.Score >= report.SE ? "<i class='far fa-smile'></i>": "<i class='far fa-frown'></i>"
            }
          </h4>`;
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