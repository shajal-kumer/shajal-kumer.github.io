(function() {
	// API base URL
	const baseURL = "https://nettiethuis-in.azurewebsites.net/Api/";

	//Get LocalStorage
	function getLocalStorage(key) {
		var value = localStorage.getItem(key);
		return null === value ? "" : value;
	}

	//setValue LocalStorage
	function setLocalStorage(key, value) {
		localStorage.setItem(key, null === value ? "" : value);
	}

	//initialize pre loader
	function setPreloaderState(state) {
		const preloader = document.querySelector(".preloader");
		if (state) {
			preloader.classList.add("active");
		} else {
			preloader.classList.remove("active");
		}
	}

	// Document Event listener
	document.addEventListener("click", event => {
		const className = event.target.classList[event.target.classList.length - 1];
		const parentParentClassName =
			event.target.parentNode.parentNode.classList[
				event.target.parentNode.parentNode.classList.length - 1
			];

		switch (className) {
			case "fa-cog":
				// Go to step two
				breadCrumb.goToSecondStep();
				break;
			case "back-to-step-one":
				// Back to step One
				render.homeStep();
				break;
			case "back-to-home":
				// Back to step One
				render.homeStep();
				break;

			case "client-id-btn":
				// setValue clientID to LocalStorage
				setValue.clientIDTOLocalstorage();
				break;
			case "select-device-btn-icon":
				//  selectDevice function
				setValue.selectDevice();
				break;
			case "token-setValue-btn":
				// setValue device token
				setValue.deviceToken();
				break;
			case "back-to-step-two":
				// Back to step Two from three
				breadCrumb.backToStepTwoFromThree();
				break;
			case "form-btn":
				// setValue Promis Header functionality
				setValue.promizHeader();
				break;
			case "reset-session-id":
				//back to Home from Promis
				render.homeStep();
				break;
		}

		// Delete Device
		if (parentParentClassName === "delete-device") {
			const deviceID = event.target.parentNode.parentNode.dataset.deviceid;
			axios
				.get(baseURL + "DelDevice", {
					params: {
						userid: getLocalStorage("clientID"),
						deviceID: deviceID
					}
				})
				.then(function(response) {
					// console.log(response);
					renderDeviceList();
				})
				.catch(function(error) {
					alert(error);
				});
		}
	});

	// navigation or bradcumb object
	const breadCrumb = {
		backToStepTwoFromThree: backToStepTwoFromThree,
		goToSecondStep: goToSecondStep
	};
	// Go to second step
	function goToSecondStep() {
		setPreloaderState(true);
		document.querySelector(".header-area").innerHTML = templates.header(
			"Setup",
			"long-arrow-left back-to-step-one",
			"go-back-btn"
		);
		document.querySelector(
			".main-content"
		).innerHTML = renderDeviceListAndSelect();
		document.querySelector(".footer-area").style.display = "none";
		const clientID = document.querySelector(".device-number");
		clientID.value = getLocalStorage("clientID");
	}

	// Back to step Two from three
	function backToStepTwoFromThree() {
		document.querySelector(".header-area").innerHTML = templates.header(
			"Setup",
			"long-arrow-left back-to-step-one",
			"go-back-btn"
		);
		document.querySelector(
			".main-content"
		).innerHTML = renderDeviceListAndSelect();
		document.querySelector(".footer-area").style.display = "none";
		const clientID = document.querySelector(".device-number");
		clientID.value = getLocalStorage("clientID");
	}

	// setValue Object
	const setValue = {
		clientIDTOLocalstorage: setClientIDTOLocalstorage,
		selectDevice: selectDevice,
		deviceToken: setDeviceToken,
		promizHeader: setpromizHeader
	};

	// set Promis Header Content
	function setpromizHeader() {
        if (localStorage.getItem("clientID") !== null) {
            document.querySelector(".header-area").innerHTML = templates.header(
                "Promis",
                "long-arrow-left reset-session-id",
                "go-back-btn"
            );
        }
		
	}

	// set clientID to LocalStorage
	function setClientIDTOLocalstorage() {
		const clientID = document.querySelector(".device-number");
		if (clientID.value !== "") {
			clientID.classList.remove("empty-input");
            setLocalStorage("clientID", clientID.value);
            let cID = getLocalStorage("clientID");
            clientID.value = cID;
            document.querySelector("#clientID").value = cID;
			// console.log(getLocalStorage("clientID"));
		} else {
			clientID.classList.add("empty-input");
		}
	}

	// Select Device from list
	function selectDevice() {
		const selectedDevice = document.querySelector(".selected-device");
		const clientID = document.querySelector(".device-number");
		setLocalStorage("Device type", selectedDevice.value);
		if (clientID.value !== "") {
			document.querySelector(".header-area").innerHTML = templates.header(
				"Setup",
				"long-arrow-left back-to-step-two",
				"go-back-btn"
			);
			document.querySelector(".main-content").innerHTML = renderDeviceToken();
			document.querySelector(".footer-area").style.display = "none";
		} else {
			clientID.classList.add("empty-input");
		}
	}

	// Add Device token on step 3
	function setDeviceToken() {
		const deviceToken = document.querySelector(".device-token");
        const deviceTokenVal = deviceToken.value;
        console.log('deviceTokenVal for vivago: ', deviceTokenVal);
        
		if (deviceTokenVal !== "") {
            const deviceType = getLocalStorage("Device type");           
			const clientID = getLocalStorage("clientID");
			setPreloaderState(true);
			axios
				.get(baseURL + "AddDevice", {
					params: {
						userid: clientID,
						deviceType: deviceType,
						Token: deviceTokenVal
					}
				})
				.then(function(response) {
					document.querySelector(".header-area").innerHTML = templates.header(
						"Setup",
						"long-arrow-left back-to-step-one",
						"go-back-btn"
					);
					document.querySelector(
						".main-content"
					).innerHTML = renderDeviceListAndSelect();
					document.querySelector(".footer-area").style.display = "none";
					const clientID = document.querySelector(".device-number");
					clientID.value = getLocalStorage("clientID");
					setPreloaderState(false);
				})
				.catch(function(error) {
					alert(error);
				});
		} else {
			deviceToken.classList.add("empty-input");
		}
	}

	// Template object
	const templates = {
		header: headerTemplate,
		footer: footerTemplate,
		welcomeMessage: welcomeMsgTemplate
	};
	// Header Template
	function headerTemplate(title, iconOne, btnClass) {
		return `
		 <h2 class="title">${title}</h2>
		 <button class="btn ${btnClass}" type="button">
			<i class="fa fa-${iconOne}"></i>
		</button>
		`;
	}

	// Footer Template
	function footerTemplate(icon) {
		return `
		<button class="form-btn">Form
			<i class="fa fa-${icon}"></i>
		</button>
	`;
	}

	// Welcome message Template
	function welcomeMsgTemplate() {
		return `
		<div class="welcome-msg-area">
			<div class="single-msg d-flex">
				<img class="align-self-end" src="img/logo.svg" alt="" />
				<p class="">Goedendag</p>
			</div>
		</div>
	`;
	}

	// Render object
	const render = {
		deviceListAndSelectItem: renderDeviceListAndSelect,
		homeStep: renderHomeStep,
		deviceToken: renderDeviceToken
	};

	// Render Device List And Select Device select box
	function renderDeviceListAndSelect() {
		return `
		<div class="client-number-input">
			<h3 class="header-border-bottom">Client ID:</h3>
			<div class="form-row">
				<div class="form-group col-10">
					<input
						type="text"
						class="form-control device-number"
						placeholder="Client id"
					/>
				</div>
				<div class="form-group col-2">
					<button type="button" class="btn ok-btn">
						<i class="fa fa-check-circle client-id-btn"></i>
					</button>
				</div>
			</div>
		</div>
			<div class="my-devices">
			<h3 class="header-border-bottom">Mijn Thuismeters</h3>
			<div class="device-list">${renderDeviceList()}</div>
		</div>
		<div class="select-devices">
			<h3 class="header-border-bottom">Thuismeter toevoegen:</h3>
			<select class="custom-select selected-device custom-select-md">
				<option value="LEA">LEA</option>
				<option value="Apple">Apple</option>
				<option value="Sensara">Sensara</option>
				<option value="Vivago">Vivago</option>
			</select>
			<button type="button" class="btn select-device-btn">
				<i class="fa fa-plus select-device-btn-icon"></i>
			</button>
		</div>
	`;
	}

	// Render Device List
	function renderDeviceList() {
		let clientID = getLocalStorage("clientID");
		setPreloaderState(true);
		if (clientID === "") {
			clientID = null;
		}
		axios
			.get(baseURL + "MyDevices?userid=" + clientID)
			.then(function(response) {
				let renderHTML = "<ul>";
				response.data.forEach(element => {
					renderHTML += `<li data-deviceID=${
						element.deviceID
					} class="delete-device">${
						element.deviceType
					} <button type="button" class="btn delete-device-btn">
					<i class="fa fa-times"></i>
					</button> </li>`;
				});
				renderHTML += "</ul>";

				$(".device-list").html(renderHTML);

				setPreloaderState(false);
			})
			.catch(function(error) {
				alert(error);
			});
	}

	// Render Home step
	function renderHomeStep() {
		document.querySelector(".header-area").innerHTML = templates.header(
			"Nettie Thuis",
			"cog",
			"setting-btn"
		);
		document.querySelector(
			".main-content"
		).innerHTML = templates.welcomeMessage();
		document.querySelector(".footer-area").innerHTML = templates.footer(
			"list-alt"
		);
		document.querySelector(".footer-area").style.display = "block";
	}

	// Render Device Token
	function renderDeviceToken() {
        const deviceType = getLocalStorage("Device type"); 
      
        if (deviceType === 'Vivago')  {
            return `
		<div class="form-row mt-4">
			<div class="form-group col-12 text-center">
                <img class="vivago" src="img/vivago.png" alt="">
				<button type="button" class="btn ok-btn">
					<i class="fa fa-check-circle token-setValue-btn"></i>
                </button>
                <input
					type="hidden"
					class="form-control device-token" value="1"
                />
            </div>
		</div>
	`;
        } else {
            return `
		<div class="form-row mt-4">
			<div class="form-group col-10">
                <input
					type="text"
					class="form-control device-token"
					placeholder="Token"
                />
			</div>
			<div class="form-group col-1">
				<button type="button" class="btn ok-btn">
					<i class="fa fa-check-circle token-setValue-btn"></i>
				</button>
            </div>
		</div>
	`;
        }
		
    }
    
    window.onload = function() {
        document.querySelector("#clientID").value = getLocalStorage("clientID");
    }
})();
