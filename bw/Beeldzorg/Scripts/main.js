(function($) {
	'use strict';

	//var baseURL='';
	var baseURL = 'https://nettie.azurewebsites.net/';

	jQuery(document).ready(function($) {
		// setInterval(function() {
		// 	var height = $('.chatpluginchat').height();
		// 	$('.panel-body').scrollTop(height);
        // }, 10);

        // Select the node that will be observed for mutations
        var chatList = document.querySelector('.doctor-chatlist');

        // Options for the observer (which mutations to observe)
        var configChatList = { attributes: true, childList: true, subtree: true };

        // Callback function to execute when mutations are observed
        var callback = function (mutationsList, observer) {
            for (var mutation of mutationsList) {
                $('.doctor-panel-body').scrollTop(10000);
            }
        };
        // Create an observer instance linked to the callback function
        var observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(chatList, configChatList);
        
        // Chat panel body height set
        var contentHeight = $(".popup .content").height();
        $('#Elchat .panel-body').css('height', contentHeight - 150)
       
        
        

        // Dont reload the page or form preventDefault
		$('#form1').keydown(function(event) {
			if (event.keyCode === 13) {
				event.preventDefault();
				return false;
			}
		});

        // Chat open / close
		$('.chat__box--btn').on('click', function() {
			$('.chat__box-field').toggleClass('open');
			if ($('.chat__box-field').hasClass('open')) {
				$(this).removeClass('active');
			}
		});

		$('#txtMensaje').on('click', function() {
			$('.chat__box--btn').removeClass('active');
		});

		$('.popup .close').on('click', function() {
			$('.chatpluginchat').html('');
			$('.bandwidth-framerate-wrap').css('display', 'none');
		});

		var doctorIframeHeight = $('#iframeCall').height();
		localStorage.setItem('doctorIframeHeight', doctorIframeHeight);

		setInterval(() => {
			if ($(window).innerWidth() < 992) {
				$('#iframeCall')
					.contents()
					.find('.patient-two .media-container')
					.css({
						width: 100 + '%',
						height: $('#iframeCall').innerHeight() / 2 + 'px'
					});
				$('#iframeCall')
					.contents()
					.find('.patient-two .media-box')
					.css({
						height: 100 + '%'
					});
				$('#iframeCall')
					.contents()
					.find('.patient-two .media-box video')
					.css({
						height: 100 + '%'
					});

				var doctorIframeHeight = localStorage.getItem(
					'doctorIframeHeight'
				);
				$('#iframeCall')
					.contents()
					.find('.patient-one .media-container')
					.css('height', '');
				$('#iframeCall')
					.contents()
					.find('.patient-one .media-box video')
					.css('height', doctorIframeHeight + 'px');
			} else {
				$('#iframeCall')
					.contents()
					.find('.patient-two .media-container')
					.css({
						width: 50 + '%',
						float: 'left',
						height: $('#iframeCall').innerHeight() + 'px'
					});

				$('#iframeCall')
					.contents()
					.find('.patient-one .media-container')
					.css({
						width: 100 + '%',
						float: 'none'
					});
			}
		}, 1000);

		var activeCallToken = '';
		var waitingRoom = {};
		var messages = [];
		var waitingPatients = [];
		var tempPatientList = [];
		var rID;
		var userID = document.getElementById('accountID').innerHTML;

		function getRoomNumber() {
			let roomID;
			if (localStorage.getItem('activeRoomNumber') === null) {
				roomID = 1;
			} else {
				roomID = localStorage.getItem('activeRoomNumber');
			}
			rID = roomID;
		}
		getRoomNumber();
		getRooms(userID, 1);
		// Get Rooms
		function getRooms(userId, token) {
			$.ajax({
				url: baseURL + 'api/getrooms',
				type: 'GET',
				data: {
					userID: userId,
					token: token
				},
				success: function(data) {
					rID = parseInt(data[0].id);

					if (localStorage.getItem('activeRoomNumber') === null) {
						getWaitingQueue(rID, 1);
						getMessages(rID, 1);
					} else {
						getWaitingQueue(
							localStorage.getItem('activeRoomNumber'),
							1
						);
						getMessages(
							localStorage.getItem('activeRoomNumber'),
							1
						);
					}

					rederHtml(data);
				},
				error: function(data) {
					console.error(JSON.stringify(data, null, 4));
				}
			});
		}

		function rederHtml(waitingRoomdata) {
			var HTML = '';
			if (waitingRoomdata.length === 0) {
				$('.select').append('<option>No Waiting Room</option>');
			} else {
				for (var i = 0; i < waitingRoomdata.length; i++) {
					HTML +=
						'<option data-id=' +
						waitingRoomdata[i].id +
						'>' +
						waitingRoomdata[i].name +
						'</option >';
				}
				$('.select').append(HTML);
			}

			$('select').niceSelect();
			var text = $('.option.selected').text();
			$('.current').text(text);

			if (localStorage.getItem('activeRoomNumber') === null) {
				getWaitingQueue(1, 1);
				getMessages(1, 1);
			} else {
				var activeRoomNumber = localStorage.getItem('activeRoomNumber');
				var roomList = $('.list li');
				for (var i = 0; i < roomList.length; i++) {
					roomList[i].classList.remove('selected');
				}
				$(
					'.list .option:nth-child(' +
						parseInt(activeRoomNumber) +
						')'
				).addClass('selected');
				var currentRoomText = $(
					'.list .option:nth-child(' +
						parseInt(activeRoomNumber) +
						')'
				).text();

				$('.current').text(currentRoomText);
				getWaitingQueue(activeRoomNumber, 1);
				getMessages(activeRoomNumber, 1);
			}

			// On click change room
			$('.list').on('click', function(event) {
				var li = event.target;
				if (event.target.tagName === 'LI') {
					rID = $(li).attr('data-id');
					console.log('room id on click : ', rID);
					console.log(typeof rID);
					getWaitingQueue(rID, 1);
					getMessages(rID, 1);
					localStorage.setItem('activeRoomNumber', rID);
				}
			});
		}

		// Toggle Finished Conversations
		$('#checkboxHideConversations').click(function() {
			if ($(this).prop('checked') == true) {
				localStorage.setItem('isFinishedConversationChecked', true);
			} else if ($(this).prop('checked') == false) {
				localStorage.setItem('isFinishedConversationChecked', false);
			}

			if ($(this).is(':checked')) {
				$('.conversationOffline')
					.parent()
					.hide();
			} else {
				$('.conversationOffline')
					.parent()
					.show();
			}
		});

		// Save Message
		$('#btnSaveMessage').click(function() {
			var token = '';
			var msg = $('#txtMessage').val();
			$('#txtMessage').val('');
			if ($.trim(msg) !== '') {
				$.ajax({
					url: baseURL + 'api/addmessage',
					type: 'GET',
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
		$('body').on('click', '.del-msg', function() {
			var token = '';
			$.ajax({
				url: baseURL + 'api/delMessage',
				type: 'GET',
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
				url: baseURL + 'api/getmessages',
				type: 'GET',
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
					$('#messageList')
						.html('')
						.append(elem.join(''));
					$('#messageList').scrollTop(
						$('#messageList')[0].scrollHeight
					);
				},
				error: function(data) {
					console.error(JSON.stringify(data, null, 4));
				}
			});
		}

		var firstcall = '0';

		function getWaitingQueue(roomId, token) {
			totalnewQueue = 0;

			$.ajax({
				url: baseURL + 'api/getWaitingQueue',
				type: 'GET',
				data: {
					roomid: roomId,
					token: token
				},
				success: function(data) {
					tempPatientList = $.extend(true, [], data);
					if (null !== data && data.length > 0) {
						// Single User Joined
						if (
							null !== waitingPatients &&
							waitingPatients.length === 0
						) {
							waitingPatients = $.extend(true, [], data);
							$.each(data, function(index, item) {
								if (item.status === 'online') {
									newUsers.push(item.clientname);
								}
							});
						}
						// User joined a queue
						else if (
							null !== waitingPatients &&
							waitingPatients.length > 0
						) {
							//
							for (var i = 0; i < waitingPatients.length; i++) {
								for (var j = 0; j < data.length; j++) {
									if (waitingPatients[i].id === data[j].id) {
										waitingPatients[i] = $.extend(
											true,
											{},
											data[j]
										);
										data.splice(j, 1);
									}
								}
							}
							$.each(data, function(index, item) {
								if (item.status === 'online') {
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
						$('#patientsList').html('');

						elemTemplate.push('<tr>');
						elemTemplate.push('<td>' + item.clientname + '</td>');

						var _time = new Date(item.entered);
						var minutes = _time.getMinutes();
						minutes = minutes > 9 ? minutes : '0' + minutes;

						elemTemplate.push('<td>' + '' + '</td>');

						elemTemplate.push(
							'<td>' + _time.getHours() + ':' + minutes + '</td>'
						);

						switch (item.status) {
							case 'online':
								elemTemplate.push(
									'<td class="conversation"><a data-conId="' +
										item.id +
										'" data-clientname="' +
										item.clientname +
										'" href="#popup1" type="button" class="adjust-Video btn btn-success call-client start-call" style="width: 100px">Start</a></td>'
								);
								break;
							case 'finished':
								elemTemplate.push(
									'<td class="conversationOffline"><a href="" type="button" class="btn btn-finished" style="width: 100px" >Finished</a></td>'
								);
								break;
							case 'plannend':
								elemTemplate.push(
									'<td class=""><a href="" type="button" class="btn btn-offline" style="width: 100px;pointer-event:none">Offline</a></td>'
								);
								break;
							case 'offline':
								elemTemplate.push(
									'<td class=""><a href="" type="button" class="btn btn-offline" style="width: 100px;pointer-event:none">Offline</a></td>'
								);
								break;
							case 'started':
								elemTemplate.push(
									'<td class="conversation"><a data-conId="' +
										item.id +
										'" data-conToken="' +
										'" data-clientname="' +
										item.clientname +
										'" class="adjust-Video btn btn-primary" style="width: 100px" href="#popup1">Join</a>&nbsp;<button data-conId="' +
										item.id +
										'" data-clientname="' +
										item.clientname +
										'" class="btn btn-danger stop-call" style="width: 100px">Stop</button></td>'
								);
								break;
							default:
								elemTemplate.length = 0;
								break;
						}
						elemTemplate.push('</tr>');
						elemList.push(elemTemplate.join(''));
					});
					// Online User Notification

					if (firstcall === '1') {
						if (newUsers.length > 0) {
							showBrowserNotification(newUsers.join(', '));
							newUsers.length = 0;
						}
					} else {
						//dont show notifications for clients that are already in the waitingroom at startup of this scree
						newUsers.length = 0;
						firstcall = '1';
					}

					// Append the client list
					if (waitingPatients.length !== 0) {
						$('#patientsList').append(elemList.join(''));
					} else {
						$('#patientsList').html('');
					}

					// Hide Finished Conversation If Checkbox is checked
					if ($('#checkboxHideConversations:checked').length > 0) {
						$('.conversationOffline')
							.parent()
							.hide();
					}

					// Start call
					$('.call-client').on('click', function(e) {
						if (e.target.classList.contains('start-call')) {
							startConversation($(e.target).attr('data-conId'));
						}
					});
					// Join video call
					$('.adjust-Video').on('click', function(e) {
						if (e.target.classList.contains('adjust-Video')) {
							joinConversation($(e.target).attr('data-conId'));
						}
					});

					// Stop Call
					$('.stop-call').on('click', function(e) {
						$(this).prop('disabled', true);
						stopConversation($(e.target).attr('data-conId'));
						e.preventDefault();
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
				url: baseURL + 'api/startConversation',
				type: 'GET',
				data: jQuery.param({
					conversationID: conversationId,
					token: '',
					userid: 'testuser'
				}),
				success: function(data) {
					startup(data[0].conversationtoken);
					localStorage.setItem(
						'Doctorconversationtoken',
						data[0].conversationtoken
					);
					console.log('data: ', data[0].speed);

					if (data[0].conversationtoken !== '') {
						$('#iframeCall').attr(
							'src',
							'callbasic/index.html?room=' +
								data[0].conversationtoken
						);

						document.getElementById('invitelink').value =
							window.location.origin +
							'/callbasic/index.html/?room=' +
							data[0].conversationtoken;
					}
					
				},
				error: function(data) {
					console.error(JSON.stringify(data, null, 4));
				}
			});
		}
        
		function setInternetSpeed(clientNetSpeed) {
			var imageAddr =
				'../Images/img.jpg' +
				'?n=' +
				Math.random();
			var startTime, endTime;
			var downloadSize = [4995374];

			var download = new Image();
			download.onload = function() {
				endTime = new Date().getTime();
				showResults();
			};
			startTime = new Date().getTime();
			download.src = imageAddr;

			function showResults() {
				var duration = (endTime - startTime) / 1000;
				var bitsLoaded = downloadSize * 8;
				var speedBps = (bitsLoaded / duration).toFixed(2);
				var speedKbps = (speedBps / 1024).toFixed(2);
				var speedMbps = (speedKbps / 1024).toFixed(2).toString();

				// var intervalForGettingFramerate = setInterval(function() {
				// 	var frameRate = localStorage.getItem('frameRate');
				// 	if (frameRate) {
                //         clearInterval(intervalForGettingFramerate);
				// 		$('.bandwidth-framerate-wrap').css('display', 'block');
				// 		$('.framerate').text(
				// 			'Your video quality is (' + frameRate + 'fps)'
				// 		);
				// 		$('.bandwidth').html(
				// 			'Your internet speed (' + speedMbps + 'Mbps)'
				// 		);
				// 		$('.client-bandwidth').text(
				// 			'Client internet speed is (' +
				// 				clientNetSpeed +
				// 				'Mbps)'
				// 		);
				// 	}
				// }, 500);
			}
		}
        setInternetSpeed()
		// Join call
		function joinConversation(conversationId) {
			
			$.ajax({
				url: baseURL + 'api/join',
				type: 'GET',
				data: jQuery.param({
					conversationID: conversationId,
					token: ''
				}),
				success: function(data) {

					if (data[0].conversationtoken !== '') {

						$('#iframeCall').attr(
							'src',
							'callbasic/index.html?room=' +
								data[0].conversationtoken
						);

						document.getElementById('invitelink').value =
							window.location.origin +
							'/callbasic/index.html/?room=' +
							data[0].conversationtoken;

						
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
				url: baseURL + 'api/stopConversation',
				type: 'GET',
				data: jQuery.param({
					conversationID: conversationId,
					token: ''
				}),
				success: function(data) {
                   
                    
                },
				error: function(data) {
					console.error(JSON.stringify(data, null, 4));
				}
			});
		}

		// 5 Sec interval
		setInterval(function() {
			if (localStorage.getItem('activeRoomNumber') === null) {
				getWaitingQueue(rID, 1);
				getMessages(rID, 1);
			} else {
				getWaitingQueue(localStorage.getItem('activeRoomNumber'), 1);
				getMessages(localStorage.getItem('activeRoomNumber'), 1);
			}
		}, 5000);
		// Get Rooms
		function Invite() {
			var contactin = document.getElementById('contactin').value;
			var messagein = document.getElementById('invitelink').value;
			$.ajax({
				url: baseURL + 'api/Invite',
				type: 'GET',
				data: {
					contact: contactin,
					message: messagein
				},
				success: function(data) {
					alert('invite send');
				},
				error: function(data) {
					console.error(JSON.stringify(data, null, 4));
				}
			});
		}

		function initNotifications() {
			if ('Notification' in window) {
				if (Notification.permission === 'granted') {
					notificationsAvailable = true;
				} else if (Notification.permission !== 'denied') {
					Notification.requestPermission(function(permission) {
						notificationsAvailable = permission === 'granted';
					});
				}
			}
		}

		function showPatientCameOnlineNotification(name) {
			//if (true) {
			var options = {
				body: 'Open waitingroom.',
				icon: 'favo.ico'
			};

			var message = new Notification(name, options);
			beep();
			message.onclick = function() {
				message.close();
			};
			//}
		}

		function showBrowserNotification(name) {
			if (Notification.permission !== 'granted')
				Notification.requestPermission();
			else {
				var notification = new Notification('Nettie Beeldzorg', {
					icon: '',
					body: 'Patient ' + name + ' is online!'
				});

				notification.onclick = function() {
					//window.open("Enter Url");
				};
			}
		}
	});

	$(window).on('load', function() {
		var isTrue =
			localStorage.getItem('isFinishedConversationChecked') == 'true'
				? true
				: false;
		$('#checkboxHideConversations').prop('checked', isTrue);
	});
})(jQuery);
