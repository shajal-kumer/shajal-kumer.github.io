const BASE_URL = "https://apiv11.myquestionnaire.nl";
const auth_data = {
	username: "mobilecare_admin@cleversoft.nl",
	password: "123456",
	SessionID: UUIDjs.create().hex,
	PatientID: localStorage.getItem("clientID"),
	// MaxQuestions: 3,
	access_token: null,
	customerID: null,
	ItembankID: null,
	ItemID: null
};
let isLoading = false;
let categorySelected = false;
let categoryName = "";
//login and get the access-token on page load
(function() {
	axios(`${BASE_URL}/token`, {
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		method: "POST",
		data: Qs.stringify({
			grant_type: "password",
			username: auth_data.username,
			password: auth_data.password
		})
	})
		.then(function(res) {
			auth_data.customerID = res.data.customerID;
			auth_data.access_token = res.data.access_token;
			// auth_data.username = res.data.username;
		})
		.catch(function(error) {
			alert(error);
		});
})();

//load categories
(function() {
	"use strict";

	document.addEventListener("click", function(event) {
		if (event.target.classList.contains("form-btn")) {
			//set preloader
			if (localStorage.getItem("clientID") === null) {
                console.log(alert("Uw clientID is nog niet ingevuld"));
                return;
			}
            setPreloaderState(true);
            
			axios(
				`${BASE_URL}/api/ItemBank/GetItemBank?customerID=${
					auth_data.customerID
				}`,
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
						Authorization: `Bearer ${auth_data.access_token}`
					},
					method: "GET"
				}
			)
				.then(function(res) {
					insertIntoApp(chooseCategoryTemplate(res.data));
					//show category select button

					document.querySelector(".footer-area").innerHTML = showButton(
						"category"
					);
					//hide preloader
					setPreloaderState(false);
				})
				.catch(function(error) {
					setPreloaderState(false);
				});
		}
	});
})();

//select question category
(function() {
	"use strict";
	document.addEventListener("click", function(e) {
		if (
			e.target.classList.contains("select_category") ||
			e.target.classList.contains("fa") ||
			e.target.classList.contains("select-text")
		) {
			if (!getSelectedCategory()) {
				return false;
			}

			//init preloader
			setPreloaderState(true);

			axios(`${BASE_URL}/api/ItemBank/GetItem`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${auth_data.access_token}`
				},
				data: JSON.stringify({
					PatientID: auth_data.PatientID,
					ItembankID: getSelectedCategory(),
					SessionID: auth_data.SessionID,
					CustomerID: auth_data.customerID,
					// MaxQuestions: auth_data.MaxQuestions
				}),
				method: "POST"
			})
				.then(function(res) {
					insertIntoApp(questionTemplate(res.data));

					document.querySelector(".footer-area").innerHTML = showButton(
						"question"
					);
					categorySelected = true;

					//hide preloader
					setPreloaderState(false);

					auth_data.ItembankID = res.data.ItembankID;
					auth_data.ItemID = res.data.ItemID;
				})
				.catch(function(error) {
					alert(error);
					setPreloaderState(true);
				});
		}
	});
})();

//submit a question answer
(function() {
	"use strict";
	document.addEventListener("click", function(e) {
		if (
			e.target.classList.contains("submit_answer") ||
			e.target.classList.contains("fa") ||
			e.target.classList.contains("next-text")
		) {
			if (!getSelectedAnswer()) {
				return true;
			}

			//init preloader
			setPreloaderState(true);

			axios(`${BASE_URL}/api/ItemBank/UpdateResponse`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${auth_data.access_token}`
				},
				data: JSON.stringify({
					PatientID: auth_data.PatientID,
					ItembankID: auth_data.ItembankID,
					SessionID: auth_data.SessionID,
					CustomerID: auth_data.customerID,
					RespondedID: getSelectedAnswer(),
					ItemID: auth_data.ItemID,
					// MaxQuestions: auth_data.MaxQuestions
				}),
				method: "POST"
			}).then(function(res) {
                               
				let CORSProxy = "https://cors-anywhere.herokuapp.com/";
                if (res.data.ScoreInterpretations.length !== 0) {
					let posNeg = null;
					if (
						localStorage
							.getItem("categoryName")
							.trim()
							.toLowerCase()
							.includes("angst")
					) {
						posNeg =
							res.data.ScoreInterpretations[0].Score < 50 ? "pos" : "neg";
					} else {
						posNeg =
							res.data.ScoreInterpretations[0].Score > 50 ? "pos" : "neg";
					}
					axios(
						CORSProxy +
							"https://nettiethuis-in.azurewebsites.net/Api/PromisForm",
						{
							headers: {
								"Content-Type": "application/json"
							},
							data: JSON.stringify({
								userid: localStorage.getItem("clientID"),
								PromisFormName: localStorage.getItem("categoryName").trim(),
								PromisOutcome: res.data.ScoreInterpretations[0].Score.toString(),
								PromisAverage: res.data.ScoreInterpretations[0].SE.toString(),
								Description: posNeg
							}),
							method: "POST"
						}
					)
						.then(function(res) {
							// console.log(res);
						})
						.catch(function(error) {
							alert(error);
						});

					insertIntoApp(
						renderReport(
							res.data.ScoreInterpretations[0],
							localStorage.getItem("categoryName").trim()
						)
					);
					setPreloaderState(false);
					document.querySelector("#submit_answer").style.display = "none";
					return true;
				}

				insertIntoApp(questionTemplate(res.data));

				auth_data.ItemID = res.data.ItemID;

				//hide preloader
				setPreloaderState(false);
			});
		}
	});
})();

//back to home button
(function() {
	document.addEventListener("click", function(e) {
		if (e.target.classList.contains("reset-session-id"))
			auth_data.SessionID = UUIDjs.create().hex;
	});
})();

//category choosing template
function chooseCategoryTemplate(lists) {
	return `
    <h5 class="mb-3">Selecteer een categorie:</h5>
    <div class="categories">
      <ul>
        ${lists
					.map(function(list) {
						return `
              <li>
                <div class="d-flex align-items-center">
                  <label class="radio-label">
                        <div>
                    <input type="radio" id=${
                            list.ID
                            } name="radio-category" required>
                    <label class="radio-button" for=${list.ID}></label>
                  </div>
                  <div class="radio-label-text">
                    ${list.Name.replace("Dutch", "").replace("Flemish", "").replace("PROMIS", "").replace("Bank", "").replace("bank", "").replace("Nederlandse versie", "").replace("v1.2", "").replace("v1.0", "").replace("US v0.2", "").replace("DF v0.6", "").replace("|", "").replace("-", "").replace("-", "").replace("-", "")}
                  </div>
                  </label>
                </div>
              </li>
            `;
					})
					.join("")}
      </ul> 
    </div>
  `;
}

//question template
function questionTemplate(question) {
	if (question.Responses.length > 0) {
		return `
      <div class="question" id=${question.ItemID}>
        <h5 class="mb-3">${question.ItemTitle}</h5>
        <ul>
          ${question.Responses.map(function(response) {
			return `
                <li>
                  <div class="d-flex align-items-start">
                        <label class="radio-label">
                            <div>
                                <input type="radio" id=${
                                        response.ResponseID
                                        } name="radio-question" required>
                                <label class="radio-button" for=${
                                        response.ResponseID
                                        }></label>
                            </div>
                            <div class="radio-label-text">
                            ${response.Description}
                            </div>
                        </label>
                  </div>
                </li>
              `;
					}).join("")}
        </ul>
      </div>
    `;
	}

	return `
    <h6>No more question, Thanks</h6>
  `;
}

// Render Report
function renderReport(report, categoryName) {
	if (categoryName.toLowerCase().includes("angst")) {
		return `<h4 class="show_result">
            ${
							report.Score < 50
								? "<i class='fa fa-smile-o'></i>"
								: "<i class='fa fa-frown-o'></i>"
						}
          </h4>`;
	} else {
		return `<h4 class="show_result">
            ${
							report.Score > 50
								? "<i class='fa fa-smile-o'></i>"
								: "<i class='fa fa-frown-o'></i>"
						}
          </h4>`;
	}
}

//insert something into DOM (#app)
function insertIntoApp(DOM) {
	document.querySelector(".main-content").innerHTML = DOM;
}

//get the category user selected
function getSelectedCategory() {
	const radioButtons = document.getElementsByName("radio-category");
	for (let i = 0; i < radioButtons.length; i++) {
		if (radioButtons[i].checked) {
			localStorage.setItem(
				"categoryName",
				radioButtons[i].parentNode.parentNode.children[1].innerHTML
			);
			return radioButtons[i].getAttribute("id");
		}
	}
}

//get the option user selected
function getSelectedAnswer() {
	const radioButtons = document.getElementsByName("radio-question");
	for (let i = 0; i < radioButtons.length; i++) {
		if (radioButtons[i].checked) {
			return radioButtons[i].getAttribute("id");
		}
	}
}

//change the submit button id to submit question
function showButton(button) {
	if (button === "category") {
		return `
			<div class="question_box_footer text-right">
					<button id="select_category" class="select_category">
						<span class="select-text">Start</span>
						<i class="fa fa-angle-right"></i>
					</button>
				</div>
		`;
	}

	if (button === "question") {
		return `
			<div class="question_box_footer text-right">
					<button id="submit_answer" class="submit_answer">
						<span class="next-text">Volgende</span>
						<i class="fa fa-angle-right"></i>
					</button>
			</div>
		`;
	}
}

//initialize preloader
function setPreloaderState(state) {
	isLoading = state;
	const preloader = document.querySelector(".preloader");
	if (isLoading) {
		preloader.classList.add("active");
	} else {
		preloader.classList.remove("active");
	}
}
