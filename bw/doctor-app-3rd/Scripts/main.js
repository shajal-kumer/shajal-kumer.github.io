(function($) {
  "use strict";

  jQuery(document).ready(function($) {
    var activeCallToken = "";
    var waitingRoom = {};
    var messages = [];
    var waitingPatients = [];
    var tempPatientList = [];
    var rID;
    var numberOFWaitingRoom = 0;
    var userID = document.getElementById("tempaccountID").innerHTML;

    function getRoomNumber() {
      let roomID;
      if (localStorage.getItem("roomID") === null) {
        roomID = 1;
      } else {
        roomID = JSON.parse(localStorage.getItem("roomID"));
      }
      rID = roomID;
    }
    getRoomNumber();
    function storeTaskInLocalStorage(rID) {
      let roomID;
      if (localStorage.getItem("tasks") === null) {
        roomID = "";
      } else {
        roomID = JSON.parse(localStorage.getItem("roomID"));
      }
      roomID = rID;
      localStorage.setItem("roomID", JSON.stringify(roomID));
    }

    // Get Rooms
    function getRooms(userId, token) {
      $.ajax({
        url: "https://nettie.azurewebsites.net/api/getrooms",
        type: "GET",
        data: {
          userID: userId,
          token: token
        },
        success: function(data) {
          getWaitingQueue(rID, 1);
          getMessages(rID, 1);
          numberOFWaitingRoom = data.length;
          rederHtml();
        },
        error: function(data) {
          console.error(JSON.stringify(data, null, 4));
        }
      });
    }
    getRooms(userID, 1);

    function rederHtml() {
      var HTML = "";
      if (numberOFWaitingRoom === 0) {
        $(".select").append("<option>No Waiting Room</option>");
      } else {
        for (var i = 1; i <= numberOFWaitingRoom; i++) {
          HTML += "<option> WAITINGROOM " + i + "</option >";
        }
        $(".select").append(HTML);
      }
      $("select").niceSelect();
      $(".list li").removeClass("selected");
      $(".list li:nth-child(" + rID + ")").addClass("selected");
      var text = $(".option.selected").text();
      $(".current").text(text);
    }
    setTimeout(() => {
      var listUl = document.querySelector(".list");
      listUl.addEventListener("click", event => {
        var li = event.target;
        if (event.target.tagName == "LI") {
          var data = $(li).attr("data-value");
          rID = data.split(" ")[1];
          getWaitingQueue(rID, 1);
          getMessages(rID, 1);
          storeTaskInLocalStorage(rID);
        }
      });
    }, 2000);

    // 5 Sec interval
    setInterval(function() {
      //   getWaitingQueue(rID, 1);
    }, 5000);
    // Toggle Finished Conversations
    $("#checkboxHideConversations").click(function() {
      if ($(this).is(":checked")) {
        $(".conversationOffline")
          .parent()
          .hide();
      } else {
        $(".conversationOffline")
          .parent()
          .show();
      }
    });

    // Save Message
    $("#btnSaveMessage").click(function() {
      var token = "";
      var msg = $("#txtMessage").val();
      $("#txtMessage").val("");
      if ($.trim(msg) != "") {
        $.ajax({
          url: "https://nettie.azurewebsites.net/api/addmessage",
          type: "GET",
          data: {
            roomid: rID,
            messageText: msg,
            token: token
          },
          success: function(data) {
            getMessages(rID, token);
          },
          error: function(data) {
            console.error(JSON.stringify(data, null, 4));
          }
        });
      }
    });

    // Delete message
    $("body").on("click", ".del-msg", function() {
      var token = "";
      $.ajax({
        url: "https://nettie.azurewebsites.net/api/delMessage",
        type: "GET",
        data: {
          roomid: rID,
          messageID: this.attributes.id.value,
          token: token
        },
        success: function(data) {
          getMessages(rID, token);
        },
        error: function(data) {
          console.error(JSON.stringify(data, null, 4));
        }
      });
    });

    //hide finished conversations
    function hideFinishedConversations() {
      $('[id$="_convers_' + appliedFilter[i] + '"]')
        .parent()
        .parent()
        .parent()
        .show();
    }

    // Get Waiting Queue
    var totalnewQueue;
    var totalOldQueue;
    var newUsers = [];

    // Get Messages
    function getMessages(roomId, token) {
      $.ajax({
        url: "https://nettie.azurewebsites.net/api/getmessages",
        type: "GET",
        data: {
          roomid: roomId,
          token: token
        },
        success: function(data) {
          messages = $.extend(true, {}, data);
          var elem = [];
          $.each(data, function(index, item) {
            elem.push(
              '<li class="list-group-item">' +
                item.messagetext +
                '<span id="' +
                item.id +
                '" style="cursor: pointer;font-size: 20px;margin-top: -3px;" class="del-msg pull-right">&times;</span></li>'
            );
          });
          $("#messageList")
            .html("")
            .append(elem.join(""));
          $("#messageList").scrollTop($("#messageList")[0].scrollHeight);
        },
        error: function(data) {
          console.error(JSON.stringify(data, null, 4));
        }
      });
    }

    var firstcall = "0";
    function getWaitingQueue(roomId, token) {
      totalnewQueue = 0;

      $.ajax({
        url: "https://nettie.azurewebsites.net/api/getWaitingQueue",
        type: "GET",
        data: {
          roomid: roomId,
          token: token
        },
        success: function(data) {
          tempPatientList = $.extend(true, [], data);
          if (null != data && data.length > 0) {
            // Single User Joined
            if (null != waitingPatients && waitingPatients.length == 0) {
              waitingPatients = $.extend(true, [], data);
              $.each(data, function(index, item) {
                if (item.status == "online") {
                  newUsers.push(item.clientname);
                }
              });
            }
            // User joined a queue
            else if (null != waitingPatients && waitingPatients.length > 0) {
              //
              for (var i = 0; i < waitingPatients.length; i++) {
                for (var j = 0; j < data.length; j++) {
                  if (waitingPatients[i].id == data[j].id) {
                    waitingPatients[i] = $.extend(true, {}, data[j]);
                    data.splice(j, 1);
                  }
                }
              }
              $.each(data, function(index, item) {
                if (item.status == "online") {
                  newUsers.push(item.clientname);
                }
              });
            }
          }
          // Set patients list
          waitingPatients = $.extend(true, [], tempPatientList);
          var elemList = [];
          $.each(waitingPatients, function(index, item) {
            totalnewQueue++;
            var elemTemplate = [];
            $("#patientsList").html("");

            elemTemplate.push("<tr>");
            elemTemplate.push("<td>" + item.clientname + "</td>");
            var _time = new Date(item.entered);
            elemTemplate.push(
              "<td>" + _time.getHours() + ":" + _time.getMinutes() + "</td>"
            );
            switch (item.status) {
              case "online":
                elemTemplate.push(
                  '<td class="conversation"><a data-conId="' +
                    item.id +
                    '" data-clientname="' +
                    item.clientname +
                    '" href="#popup1" type="button" class="adjust-Video btn btn-success call-client" style="width: 100px">Start</a></td>'
                );
                break;
              case "finished":
                elemTemplate.push(
                  '<td class="conversationOffline"><a href="" type="button" class="btn btn-finished" style="width: 100px">Finished</a></td>'
                );
                break;
              case "offline":
                elemTemplate.push(
                  '<td class=""><a href="" type="button" class="btn btn-offline" style="width: 100px;pointer-event:none">Offline</a></td>'
                );
                break;
              case "started":
                elemTemplate.push(
                  '<td class="conversation"><a data-conId="' +
                    item.id +
                    '" data-clientname="' +
                    item.clientname +
                    '" class="adjust-Video btn btn-primary" style="width: 100px" href="#popup1">Join</a>&nbsp;<a data-conId="' +
                    item.id +
                    '" data-clientname="' +
                    item.clientname +
                    '" class="btn btn-danger stop-call" style="width: 100px" href="">Stop</a></td>'
                );
                break;
              default:
                elemTemplate.length = 0;
                break;
            }
            elemTemplate.push("</tr>");
            elemList.push(elemTemplate.join(""));
          });
          // Online User Notification

          if (firstcall == "1") {
            if (newUsers.length > 0) {
              showBrowserNotification(newUsers.join(", "));
              newUsers.length = 0;
            }
          } else {
            //dont show notifications for clients that are already in the waitingroom at startup of this scree
            newUsers.length = 0;
            firstcall = "1";
          }

          // Append the client list
          if (waitingPatients.length != 0) {
            $("#patientsList").append(elemList.join(""));
          } else {
            $("#patientsList").html("");
          }

          // Hide Finished Conversation If Checkbox is checked
          if ($("#checkboxHideConversations:checked").length > 0) {
            $(".conversationOffline")
              .parent()
              .hide();
          }

          // Start call
          $(".call-client").on("click", function(e) {
            startConversation($(e.target).attr("data-conId"));
            // document.getElementById("invitelink").value = $(e.target).attr("data-conId");
          });
          // Adjust video side
          $(".adjust-Video").on("click", function(e) {
            setTimeout(function() {
              $("#iframeCall").height($(".popup").height() - 80);
            }, 1000);
          });

          // Stop Call
          $(".stop-call").on("click", function(e) {
            stopConversation($(e.target).attr("data-conId"));
          });
        },
        error: function(data) {
          console.error(JSON.stringify(data, null, 4));
        }
      });
    }

    // Start call
    function startConversation(conversationId) {
      $.ajax({
        url: "https://nettie.azurewebsites.net/api/startConversation",
        type: "GET",
        data: jQuery.param({
          conversationID: conversationId,
          token: ""
        }),
        success: function(data) {
          if (activeCallToken != data[0].conversationtoken) {
            debugger;
            activeCallToken = data[0].conversationtoken;
            $("#iframeCall").attr(
              "src",
              "https://appr.tc/r/" + data[0].conversationtoken
            );
            document.getElementById("invitelink").value =
              "https://appr.tc/r/" + data[0].conversationtoken;
          }
        },
        error: function(data) {
          console.error(JSON.stringify(data, null, 4));
        }
      });
    }

    // Stop Call
    function stopConversation(conversationId) {
      $.ajax({
        url: "https://nettie.azurewebsites.net/api/stopConversation",
        type: "GET",
        data: jQuery.param({
          conversationID: conversationId,
          token: ""
        }),
        success: function(data) {},
        error: function(data) {
          console.error(JSON.stringify(data, null, 4));
        }
      });
    }

    // Get Rooms
    function Invite() {
      var contactin = document.getElementById("contactin").value;
      var messagein = document.getElementById("invitelink").value;
      $.ajax({
        url: "ahttps://nettie.azurewebsites.net/pi/Invite",
        type: "GET",
        data: {
          contact: contactin,
          message: messagein
        },
        success: function(data) {
          alert("invite send");
        },
        error: function(data) {
          console.error(JSON.stringify(data, null, 4));
        }
      });
    }

    function initNotifications() {
      if ("Notification" in window) {
        if (Notification.permission === "granted") {
          notificationsAvailable = true;
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission(function(permission) {
            notificationsAvailable = permission === "granted";
          });
        }
      }
    }

    function showPatientCameOnlineNotification(name) {
      if (true) {
        var options = { body: "Open waitingroom.", icon: "favo.ico" };

        var message = new Notification(name, options);
        beep();
        message.onclick = function() {
          message.close();
        };
      }
    }

    function showBrowserNotification(name) {
      if (Notification.permission !== "granted")
        Notification.requestPermission();
      else {
        var notification = new Notification("Nettie Beeldzorg", {
          icon: "",
          body: "Patient " + name + " is online!"
        });

        notification.onclick = function() {
          //window.open("Enter Url");
        };
      }
    }
  }); //  End Window load function
})(jQuery);
