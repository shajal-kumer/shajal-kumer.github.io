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
  clientNumber: document.querySelector(".device-number"),
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
const baseURL = "https://nettie-in.azurewebsites.net/Api/";

// Render Device List Function
function renderDevices(para1, para2) {
  let clientNumber = getLocalStorage("client Number");
  if (clientNumber === "") {
    clientNumber = null;
  }
  var renderHTML = "<ul>";
  axios
    .get(baseURL + "MyDevices?userid=" + clientNumber)
    .then(function(response) {
      console.log(response);
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
  // renderDevices(HTMLDOM.stepOne, HTMLDOM.stepTwo);

  HTMLDOM.stepOne.classList.remove("active");
  HTMLDOM.stepTwo.classList.add("active");
  HTMLDOM.clientNumber.value = getLocalStorage("client Number");
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

// Set Client Number to LocalStorage
HTMLDOM.stepTwoBtnOK.addEventListener("click", () => {
  if (HTMLDOM.clientNumber.value !== "") {
    HTMLDOM.clientNumber.classList.remove("empty-input");
    setLocalStorage("client Number", HTMLDOM.clientNumber.value);
    HTMLDOM.clientNumber.value = getLocalStorage("client Number");
    console.log(getLocalStorage("client Number"));
  } else {
    HTMLDOM.clientNumber.classList.add("empty-input");
  }
});

// Select Device from list
HTMLDOM.selectDeviceBtn.addEventListener("click", () => {
  let deviceType = HTMLDOM.selectedDevice.value;
  setLocalStorage("Device type", deviceType);
  HTMLDOM.stepTwo.classList.remove("active");
  HTMLDOM.stepThree.classList.add("active");
  HTMLDOM.deviceType.innerHTML = deviceType;
});

// Add Device token on step 3
HTMLDOM.stepThreeBtnOK.addEventListener("click", () => {
  let deviceTokenVal = HTMLDOM.deviceToken.value;
  let deviceType = getLocalStorage("Device type");
  let d = getLocalStorage("client Number");
  console.log(d);

  axios
    .get(baseURL + "AddDevice", {
      params: {
        userid: d,
        deviceType: deviceType,
        Token: deviceTokenVal
      }
    })
    .then(function(response) {
      HTMLDOM.stepThree.classList.remove("active");
      HTMLDOM.stepTwo.classList.add("active");
      HTMLDOM.selectedDevice.options[0].selected = true;
      renderDevices(HTMLDOM.stepThree, HTMLDOM.stepTwo);
    })
    .catch(function(error) {
      alert(error);
    });
});

// Delete device
HTMLDOM.deviceList.addEventListener("click", e => {
  if (e.target.parentNode.parentNode.classList.contains("delete-device")) {
    let deviceID = e.target.parentNode.parentNode.dataset.deviceid;
    axios
      .get(baseURL + "DelDevice", {
        params: {
          userid: getLocalStorage("client Number"),
          deviceID: deviceID
        }
      })
      .then(function(response) {
        renderDevices(null, null);
      })
      .catch(function(error) {
        alert(error);
      });
  }
});

// Set client name and go back to Home
/*
HTMLDOM.stepFourBtnOK.addEventListener("click", () => {
  if (HTMLDOM.clientName.value !== "") {
    axios
      .get(baseURL + "PromisForm", {
        params: {
          userid: getLocalStorage("client Number"),
          clientData: HTMLDOM.clientName.value
        }
      })
      .then(function(response) {
        setLocalStorage("client status", response.data[0].clientstatus);
        if (response.data[0].clientstatus === "Good") {
          HTMLDOM.smileIcon.classList.add("active");
        } else {
          HTMLDOM.sadIcon.classList.add("active");
        }
        renderDevices(HTMLDOM.stepFour, HTMLDOM.stepOne);
      })
      .catch(function(error) {
        alert(error);
      });
  } else {
    HTMLDOM.clientName.classList.add("empty-input");
  }
});
*/

HTMLDOM.stepFourArrayLeftBtn.addEventListener("click", () => {
  HTMLDOM.stepFour.classList.remove("active");
  HTMLDOM.stepOne.classList.add("active");
});
HTMLDOM.stepThreeArrayLeftBtn.addEventListener("click", () => {
  HTMLDOM.stepThree.classList.remove("active");
  HTMLDOM.stepTwo.classList.add("active");
});

HTMLDOM.stepFourBtnOK.addEventListener("click", () => {
  let clientNumber = getLocalStorage("client Number");
  if (HTMLDOM.clientName.value !== "") {
    /*
    const Url =
      "https://cors-anywhere.herokuapp.com/http://nettie-in.azurewebsites.net/api/PromisForm";

    const othePram = {
      headers: { "Content-Type": "application/json" },
      body: clientNumber,
      method: "POST"
    };

    fetch(Url, othePram)
      .then(res => {
        console.log(res);
      })
      .then(e => {
        console.log(e);
      });
*/
    /*
    axios
      .post(
        "https://cors-anywhere.herokuapp.com/http://nettie-in.azurewebsites.net/api/PromisForm",
        clientNumber,
        {
          headers: { "Content-Type": "application/json" }
        }
      )

      */

    axios({
      method: "post",
      url:
        "https://cors-anywhere.herokuapp.com/http://nettie-in.azurewebsites.net/api/PromisForm",
      data: {
        userid: clientNumber,
        PromisOutcome: HTMLDOM.clientName.value
      },
      config: { headers: { "Content-Type": "application/json" } }
    })
      .then(function(response) {
        if (response.request.readyState === 4) {
          HTMLDOM.smileIcon.classList.add("active");
        } else {
          HTMLDOM.sadIcon.classList.add("active");
        }
        renderDevices(HTMLDOM.stepFour, HTMLDOM.stepOne);
      })
      .catch(function(error) {
        alert(error);
      });
  } else {
    HTMLDOM.clientName.classList.add("empty-input");
  }
});
