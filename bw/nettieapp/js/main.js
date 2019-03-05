// API base URL
const baseURL = "https://nettiethuis-in.azurewebsites.net/Api/";

//Get LocalStorage
function getLocalStorage(key) {
	var value = localStorage.getItem(key);
	return null == value ? "" : value;
}

//Set LocalStorage
function setLocalStorage(key, value) {
	localStorage.setItem(key, null == value ? "" : value);
}

//initialize pre loader
function setPreloaderState(state) {
	console.log(state);
	isLoading = state;
	const preloader = document.querySelector(".preloader");
	if (isLoading) {
		preloader.classList.add("active");
	} else {
		preloader.classList.remove("active");
	}
}

// After DOM Content Loaded render home content
document.addEventListener("DOMContentLoaded", () => {
	renderHomeStep();
});

// Document Event listener
document.addEventListener("click", event => {
	let className = event.target.classList[event.target.classList.length - 1];
	let parentParentClassName =
		event.target.parentNode.parentNode.classList[
			event.target.parentNode.parentNode.classList.length - 1
		];

	switch (className) {
		case "fa-cog":
			// Go to step two
			goToSecondStep();
			break;
		case "back-to-step-one":
			// Back to step One
			renderHomeStep();
			break;
		case "back-to-home":
			// Back to step One
			renderHomeStep();
			break;

		case "client-id-btn":
			// Set clientID to LocalStorage
			setClientIDTOLocalstorage();
			break;
		case "select-device-btn-icon":
			//  selectDevice function
			selectDevice();
			break;
		case "token-set-btn":
			// Set device token
			setDeviceToken();
			break;
		case "back-to-step-two":
			// Back to step Two from three
			backToStepTwoFromThree();
			break;
		case "form-btn":
			// Set Promis Header functionality
			setpromizHeader();
			break;
	}

	// Delete Device
	if (parentParentClassName === "delete-device") {
		let deviceID = event.target.parentNode.parentNode.dataset.deviceid;
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

	// Set Promis Header functionality
	function setpromizHeader() {
		document.querySelector(".header-area").innerHTML = headerTemplate(
			"Promis",
			"long-arrow-left reset-session-id",
			"go-back-btn"
		);
	}
	// Go to second step
	function goToSecondStep() {
		setPreloaderState(true);
		document.querySelector(".header-area").innerHTML = headerTemplate(
			"Setup",
			"long-arrow-left back-to-step-one",
			"go-back-btn"
		);
		document.querySelector(
			".main-content"
		).innerHTML = renderDeviceListAndSelect();
		document.querySelector(".footer-area").innerHTML = "";
		document.querySelector(".footer-area").classList.add("no-border");
		let clientID = document.querySelector(".device-number");
		clientID.value = getLocalStorage("clientID");
	}

	// Set clientID to LocalStorage
	function setClientIDTOLocalstorage() {
		let clientID = document.querySelector(".device-number");
		if (clientID.value !== "") {
			clientID.classList.remove("empty-input");
			setLocalStorage("clientID", clientID.value);
			clientID.value = getLocalStorage("clientID");
			// console.log(getLocalStorage("clientID"));
		} else {
			clientID.classList.add("empty-input");
		}
	}

	// Select Device from list
	function selectDevice() {
		const selectedDevice = document.querySelector(".selected-device");
		let clientID = document.querySelector(".device-number");
		setLocalStorage("Device type", selectedDevice.value);
		if (clientID.value !== "") {
			document.querySelector(".header-area").innerHTML = headerTemplate(
				"Setup",
				"long-arrow-left back-to-step-two",
				"go-back-btn"
			);
			document.querySelector(".main-content").innerHTML = renderDeviceToken();
			document.querySelector(".footer-area").innerHTML = "";
		} else {
			clientID.classList.add("empty-input");
		}
	}

	// Add Device token on step 3
	function setDeviceToken() {
		const deviceToken = document.querySelector(".device-token");
		let deviceTokenVal = deviceToken.value;
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
					document.querySelector(".header-area").innerHTML = headerTemplate(
						"Setup",
						"long-arrow-left back-to-step-one",
						"go-back-btn"
					);
					document.querySelector(
						".main-content"
					).innerHTML = renderDeviceListAndSelect();
					document.querySelector(".footer-area").innerHTML = "";
					let clientID = document.querySelector(".device-number");
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

	// Back to step Two from three
	function backToStepTwoFromThree() {
		document.querySelector(".header-area").innerHTML = headerTemplate(
			"Setup",
			"long-arrow-left back-to-step-one",
			"go-back-btn"
		);
		document.querySelector(
			".main-content"
		).innerHTML = renderDeviceListAndSelect();
		document.querySelector(".footer-area").innerHTML = "";
		let clientID = document.querySelector(".device-number");
		clientID.value = getLocalStorage("clientID");
	}
});

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
				<p class="">Good Morning</p>
			</div>
		</div>
	`;
}

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
			<h3 class="header-border-bottom">My Devices:</h3>
			<div class="device-list">${renderDeviceList()}</div>
		</div>
		<div class="select-devices">
			<h3 class="header-border-bottom">Add device:</h3>
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

// Render Home step
function renderHomeStep() {
	document.querySelector(".header-area").innerHTML = headerTemplate(
		"Nettie Thuis",
		"cog",
		"setting-btn"
	);
	document.querySelector(".main-content").innerHTML = welcomeMsgTemplate();
	document.querySelector(".footer-area").innerHTML = footerTemplate("list-alt");
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

// Render Device Token
function renderDeviceToken() {
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
					<i class="fa fa-check-circle token-set-btn"></i>
				</button>
			</div>
		</div>
	`;
}

//back to Home from Promis
(function() {
	document.addEventListener("click", function(e) {
		if (e.target.classList.contains("reset-session-id")) renderHomeStep();
	});
})();
