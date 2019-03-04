const HTMLDOM = {
	settingBtn: document.querySelector(".setting-btn"),
	stepOne: document.querySelector(".step-1"),
	stepTwo: document.querySelector(".step-2"),
	stepThree: document.querySelector(".step-3"),
	stepFour: document.querySelector(".step-4"),
	DeviceList: document.querySelector(".device-list"),
	stepFour: document.querySelector(".step-4"),
	stepOnePlusIcon: document.querySelector(".step-1 .plus-icon"),
	stepTwoArrayLeftBtn: document.querySelector(".step-2 .array-left-btn"),
	stepThreeArrayLeftBtn: document.querySelector(".step-3 .array-left-btn"),
	stepFourArrayLeftBtn: document.querySelector(".step-4 .array-left-btn"),
	clientID: document.querySelector(".device-number"),
	stepTwoBtnOK: document.querySelector(".step-2 .ok-btn"),
	deviceList: document.querySelector(".device-list"),
	selectedDevice: document.querySelector(".selected-device"),
	selectDeviceBtn: document.querySelector(".select-device-btn"),
	deviceType: document.querySelector(".device-type"),
	stepThreeBtnOK: document.querySelector(".step-3 .ok-btn"),
	deviceToken: document.querySelector(".device-token"),
	clientName: document.querySelector(".client-name"),
	stepFourBtnOK: document.querySelector(".step-4 .ok-btn"),
	sadIcon: document.querySelector(".sad-icon"),
	smileIcon: document.querySelector(".smile-icon")
};

//Get LocalStorage
function getLocalStorage(key) {
	var value = localStorage.getItem(key);
	return null == value ? "" : value;
}

//Set LocalStorage
function setLocalStorage(key, value) {
	localStorage.setItem(key, null == value ? "" : value);
}

// API base URL
const baseURL = "https://nettiethuis-in.azurewebsites.net/Api/";

// Render Device List Function
function renderDevices(para1, para2) {
	let clientID = getLocalStorage("clientID");
	if (clientID === "") {
		clientID = null;
	}
	var renderHTML = "<ul>";
	axios
		.get(baseURL + "MyDevices?userid=" + clientID)
		.then(function(response) {
			// console.log(response);
			response.data.forEach(element => {
				renderHTML += `<li data-deviceID=${
					element.deviceID
				} class="delete-device">${
					element.deviceType
				} <button type="button" class="btn">
        <i class="fas fa-times"></i>
      </button> </li>`;
			});
			renderHTML += "</ul>";
			if (para1 !== null || para2 !== null) {
				para1.classList.remove("active");
				para2.classList.add("active");
			}
			$(".device-list").html(renderHTML);
		})
		.catch(function(error) {
			alert(error);
		});
}

// Go to second step
HTMLDOM.settingBtn.addEventListener("click", () => {
	renderDevices(HTMLDOM.stepOne, HTMLDOM.stepTwo);
	HTMLDOM.clientID.value = getLocalStorage("clientID");
});

// Back to step One
HTMLDOM.stepTwoArrayLeftBtn.addEventListener("click", () => {
	HTMLDOM.stepOne.classList.add("active");
	HTMLDOM.stepTwo.classList.remove("active");
});

// Go to step four
HTMLDOM.stepOnePlusIcon.addEventListener("click", () => {
	HTMLDOM.stepOne.classList.remove("active");
	HTMLDOM.stepFour.classList.add("active");
});

// Set clientID to LocalStorage
HTMLDOM.stepTwoBtnOK.addEventListener("click", () => {
	if (HTMLDOM.clientID.value !== "") {
		HTMLDOM.clientID.classList.remove("empty-input");
		setLocalStorage("clientID", HTMLDOM.clientID.value);
		HTMLDOM.clientID.value = getLocalStorage("clientID");
		// console.log(getLocalStorage("clientID"));
	} else {
		HTMLDOM.clientID.classList.add("empty-input");
	}
});

// Select Device from list
HTMLDOM.selectDeviceBtn.addEventListener("click", () => {
	let deviceType = HTMLDOM.selectedDevice.value;
	setLocalStorage("Device type", deviceType);
	if (HTMLDOM.clientID.value !== "") {
		HTMLDOM.stepTwo.classList.remove("active");
		HTMLDOM.stepThree.classList.add("active");
		HTMLDOM.deviceType.innerHTML = deviceType;
	} else {
		HTMLDOM.clientID.classList.add("empty-input");
	}
});

// Add Device token on step 3
HTMLDOM.stepThreeBtnOK.addEventListener("click", () => {
	let deviceTokenVal = HTMLDOM.deviceToken.value;
	if (deviceTokenVal !== "") {
		let deviceType = getLocalStorage("Device type");
		let clientID = getLocalStorage("clientID");

		axios
			.get(baseURL + "AddDevice", {
				params: {
					userid: clientID,
					deviceType: deviceType,
					Token: deviceTokenVal
				}
			})
			.then(function(response) {
				// console.log(response);

				HTMLDOM.stepThree.classList.remove("active");
				HTMLDOM.stepTwo.classList.add("active");
				HTMLDOM.selectedDevice.options[0].selected = true;
				renderDevices(HTMLDOM.stepThree, HTMLDOM.stepTwo);
			})
			.catch(function(error) {
				alert(error);
			});
	} else {
		HTMLDOM.deviceToken.classList.add("empty-input");
	}
});

// Delete device
HTMLDOM.deviceList.addEventListener("click", e => {
	if (e.target.parentNode.parentNode.classList.contains("delete-device")) {
		let deviceID = e.target.parentNode.parentNode.dataset.deviceid;
		axios
			.get(baseURL + "DelDevice", {
				params: {
					userid: getLocalStorage("clientID"),
					deviceID: deviceID
				}
			})
			.then(function(response) {
				// console.log(response);

				renderDevices(null, null);
			})
			.catch(function(error) {
				alert(error);
			});
	}
});

// Go back to step 1 from step 4
HTMLDOM.stepFourArrayLeftBtn.addEventListener("click", () => {
	HTMLDOM.stepFour.classList.remove("active");
	HTMLDOM.stepOne.classList.add("active");
});
// Go back to step 3 from step 2
HTMLDOM.stepThreeArrayLeftBtn.addEventListener("click", () => {
	HTMLDOM.stepThree.classList.remove("active");
	HTMLDOM.stepTwo.classList.add("active");
});
