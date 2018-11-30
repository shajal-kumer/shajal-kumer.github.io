// ......................................................
// .......................UI Code........................
// ......................................................
document.getElementById("open-room").onclick = function() {
  disableInputButtons();
  connection.open(document.getElementById("room-id").value, function(
    isRoomOpened,
    roomid,
    error
  ) {
    if (isRoomOpened === true) {
      showRoomURL(connection.sessionid);
    } else {
      disableInputButtons(true);
      if (error === "Room not available") {
        alert(
          "Someone already created this room. Please either join or create a separate room."
        );
        return;
      }
      alert(error);
    }
  });
};

document.getElementById("join-room").onclick = function() {
  disableInputButtons();
  connection.join(document.getElementById("room-id").value, function(
    isJoinedRoom,
    roomid,
    error
  ) {
    if (error) {
      disableInputButtons(true);
      if (error === "Room not available") {
        alert(
          "This room does not exist. Please either create it or wait for moderator to enter in the room."
        );
        return;
      }
      alert(error);
    }
  });
};

// document.getElementById("open-or-join-room").onclick = function() {
window.onload = function() {
  disableInputButtons();
  connection.openOrJoin(connection.token(), function(
    isRoomExist,
    roomid,
    error
  ) {
    if (error) {
      disableInputButtons(true);
      alert(error);
    } else if (connection.isInitiator === true) {
      // if room doesn't exist, it means that current user will create the room
      showRoomURL(roomid);
    }
  });
};

// ......................................................
// ..................RTCMultiConnection Code.............
// ......................................................

var connection = new RTCMultiConnection();

// by default, socket.io server is assumed to be deployed on your own URL
// connection.socketURL = '/';

// comment-out below line if you do not have your own socket.io server
connection.socketURL = "https://rtcmulticonnection.herokuapp.com:443/";

connection.socketMessageEvent = "video-conference-demo";

connection.session = {
  audio: true,
  video: true
};

connection.sdpConstraints.mandatory = {
  OfferToReceiveAudio: true,
  OfferToReceiveVideo: true
};

connection.videosContainer = document.getElementById("videos-container");
connection.onstream = function(event) {
  var existing = document.getElementById(event.streamid);
  if (existing && existing.parentNode) {
    existing.parentNode.removeChild(existing);
  }

  event.mediaElement.removeAttribute("src");
  event.mediaElement.removeAttribute("srcObject");
  event.mediaElement.muted = true;
  event.mediaElement.volume = 0;

  var video = document.createElement("video");

  try {
    video.setAttributeNode(document.createAttribute("autoplay"));
    video.setAttributeNode(document.createAttribute("playsinline"));
  } catch (e) {
    video.setAttribute("autoplay", true);
    video.setAttribute("playsinline", true);
  }

  if (event.type === "local") {
    video.volume = 0;
    try {
      video.setAttributeNode(document.createAttribute("muted"));
    } catch (e) {
      video.setAttribute("muted", true);
    }
  }
  video.srcObject = event.stream;

  var width = parseInt(connection.videosContainer.clientWidth / 3) - 20;
  var mediaElement = getHTMLMediaElement(video, {
    title: event.userid,
    buttons: ["full-screen"],
    width: width,
    showOnMouseEnter: false
  });

  connection.videosContainer.appendChild(mediaElement);

  setTimeout(function() {
    mediaElement.media.play();
  }, 5000);

  mediaElement.id = event.streamid;

  // to keep room-id in cache
  localStorage.setItem(connection.socketMessageEvent, connection.sessionid);

  chkRecordConference.parentNode.style.display = "none";

  if (chkRecordConference.checked === true) {
    btnStopRecording.style.display = "inline-block";
    recordingStatus.style.display = "inline-block";

    var recorder = connection.recorder;
    if (!recorder) {
      recorder = RecordRTC([event.stream], {
        type: "video"
      });
      recorder.startRecording();
      connection.recorder = recorder;
    } else {
      recorder.getInternalRecorder().addStreams([event.stream]);
    }

    if (!connection.recorder.streams) {
      connection.recorder.streams = [];
    }

    connection.recorder.streams.push(event.stream);
    recordingStatus.innerHTML =
      "Recording " + connection.recorder.streams.length + " streams";
  }

  if (event.type === "local") {
    connection.socket.on("disconnect", function() {
      if (!connection.getAllParticipants().length) {
        location.reload();
      }
    });
  }
};

connection.onstreamended = function(event) {
  var mediaElement = document.getElementById(event.streamid);
  if (mediaElement) {
    mediaElement.parentNode.removeChild(mediaElement);
  }
};

connection.onMediaError = function(e) {
  if (e.message === "Concurrent mic process limit.") {
    if (DetectRTC.audioInputDevices.length <= 1) {
      alert(
        "Please select external microphone. Check github issue number 483."
      );
      return;
    }

    var secondaryMic = DetectRTC.audioInputDevices[1].deviceId;
    connection.mediaConstraints.audio = {
      deviceId: secondaryMic
    };

    connection.join(connection.sessionid);
  }
};

// ..................................
// ALL below scripts are redundant!!!
// ..................................

function disableInputButtons(enable) {
  document.getElementById("room-id").onkeyup();

  document.getElementById("open-or-join-room").disabled = !enable;
  document.getElementById("open-room").disabled = !enable;
  document.getElementById("join-room").disabled = !enable;
  document.getElementById("room-id").disabled = !enable;
}

// ......................................................
// ......................Handling Room-ID................
// ......................................................

function showRoomURL(roomid) {
  var roomQueryStringURL = "?conversationToken=" + roomid;

  var html = "<h2>Unique URL for your room:</h2><br>";

  html +=
    'QueryString URL: <a href="' +
    roomQueryStringURL +
    '" target="_blank">' +
    roomQueryStringURL +
    "</a>";

  var roomURLsDiv = document.getElementById("room-urls");
  roomURLsDiv.innerHTML = html;

  roomURLsDiv.style.display = "block";
}

(function() {
  var params = {},
    r = /([^&=]+)=?([^&]*)/g;

  function d(s) {
    return decodeURIComponent(s.replace(/\+/g, " "));
  }
  var match,
    search = window.location.search;
  while ((match = r.exec(search.substring(1))))
    params[d(match[1])] = d(match[2]);
  window.params = params;
})();

var roomid = "";
if (localStorage.getItem(connection.socketMessageEvent)) {
  roomid = localStorage.getItem(connection.socketMessageEvent);
} else {
  roomid = connection.token();
}

var txtRoomId = document.getElementById("room-id");
txtRoomId.value = roomid;
txtRoomId.onkeyup = txtRoomId.oninput = txtRoomId.onpaste = function() {
  localStorage.setItem(
    connection.socketMessageEvent,
    document.getElementById("room-id").value
  );
};

var hashString = location.hash.replace("#", "");
if (hashString.length && hashString.indexOf("comment-") == 0) {
  hashString = "";
}

var roomid = params.roomid;
if (!roomid && hashString.length) {
  roomid = hashString;
}

if (roomid && roomid.length) {
  document.getElementById("room-id").value = roomid;
  localStorage.setItem(connection.socketMessageEvent, roomid);

  // auto-join-room
  (function reCheckRoomPresence() {
    connection.checkPresence(roomid, function(isRoomExist) {
      if (isRoomExist) {
        connection.join(roomid);
        return;
      }

      setTimeout(reCheckRoomPresence, 5000);
    });
  })();

  disableInputButtons();
}

// detect 2G
if (
  navigator.connection &&
  navigator.connection.type === "cellular" &&
  navigator.connection.downlinkMax <= 0.115
) {
  alert("2G is not supported. Please use a better internet service.");
}
