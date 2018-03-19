function changeMake(argOption, argVehType) {
	
	if(!argOption)
		argOption = '';  // Allows you to target similarly named divs by prefixing them
	
	if(!argVehType)
		argVehType = '';
	
	//alert("#"+argOption+"make");
	
	var theMake = $("#"+argOption+"make").val();
	
	remoteLink("/ajax/?page=home-ajax&ajax=content&action=changeMake&make="+theMake+"&option="+argOption+"&vehType="+argVehType, argOption+"modelCont");
}

function cashCreditSwitch() {
	
	// We need to detect the state of this switch
	//alert('switch!');
	
}



function submitCarSearch(argBrowseUrl, argClientID, argUrlStructure, argSeoSlug, argOption) {
	
	if($('.switch-btn input:checked').val()=='on') 
		var cashMonthly = 'M';
	else
		var cashMonthly = 'C';
	
	if(!argOption)
		argOption = '';
	
	if(!argUrlStructure)
		argUrlStructure = 1;
	
	var theMake = $("#"+argOption+"make").val();
	var theModel = $("#"+argOption+"model").val();
	
	var branchID='all';
	
	if($("#"+argOption+"bodyType").length>0) {
		bodyType = $("#"+argOption+"bodyType").val()
	}
	else {
		bodyType = '';
	}

	if($("#"+argOption+"age").length>0) {
		age = $("#"+argOption+"age").val()
	}
	else {
		age = '';
	}

	if($("#"+argOption+"berths").length>0) {
		berths = $("#"+argOption+"berths").val()
	}
	else {
		berths = '';
	}

	
	
	if(theMake=='Choose a Make')
		theMake = '';
	
	
	// Branch Selector
	$('input[id]').each(function () {
		var patt = new RegExp("^"+argOption+"loc[0-9]$");
		if (patt.test(this.id)) {
			//alert( $('input[id='+this.id+']:checked').val() )
			if($('input[id='+this.id+']:checked').val()=='on') {
				branchID = this.id.replace(argOption+"loc", "");
			}
		}	
	});
	
	queryStr = '';

	
	if(cashMonthly=='C') {
	
	
		var minPrice = $("#"+argOption+"min-price").html();
		var maxPrice = $("#"+argOption+"max-price").html();

		if(minPrice && minPrice!='' && minPrice!='undefined') 
			queryStr += "min-price="+minPrice+"&";
		if(maxPrice && maxPrice!='' && maxPrice!='undefined') 
			queryStr += "max-price="+maxPrice+"&";
	
	}
	else if(cashMonthly=='M') {
		
	
		var minBudget = $("#"+argOption+"min-budget").html();
		var budget = $("#"+argOption+"max-budget").html();
		

		if(minBudget && minBudget!='' && minBudget!='undefined') 
			queryStr += "min-budget="+minBudget+"&";
		if(budget && budget!='' && budget!='undefined') 
			queryStr += "budget="+budget+"&";
			
	
	}

	if(age && age!='' && age!='undefined') 
		queryStr += "age="+age+"&";
	if(berths && berths!='' && berths!='undefined') 
		queryStr += "berths="+berths+"&";
	
	/* Derive from make page */
	if(argUrlStructure==3) {
		
		var url = "/"+argSeoSlug+"/";
		
		if(!theMake || theMake=='Select Make' || theMake=='Make' || theMake=='undefined') {
			//url +="/browse/";
		}
		else {
			theMake = theMake.toLowerCase()
			url += theMake;
		}	
	}
	else if(argUrlStructure==2) {
		
		var url = "/"+argSeoSlug+"/";
		
		if(theMake!='Select Make' && theMake!='Make') {
			
			queryStr += "make="+theMake.toLowerCase()+"&";
		}	
	}
	else {
		
		var url = "/"+argBrowseUrl+"/";
		
		if(!theMake || theMake=='Select Make' || theMake=='Make' || theMake=='undefined') {
			//url +="/browse/";
		}
		else {
			theMake = theMake.toLowerCase()
			url += "/make/"+theMake;
		}
		
	}
	

	
	if(theModel && theModel!='' && theModel!='Select Model' && theModel!='Model') 
		queryStr += "model="+theModel+"&";
	
	if(bodyType!='' && bodyType!='Body Type') 
		queryStr += "body-type="+bodyType+"&";

	
	if(branchID!='' && branchID!='all') 
		queryStr += "branchID="+branchID+"&";
	
	
	//alert(url+"?"+queryStr);
	
	window.location.href = url+"?"+queryStr;
	
}	



function submitFinSearch(argBrowseUrl) {
	var finBudgetVal = finBudget.noUiSlider.get();
	var finBudgetVal = finBudgetVal.replace("£", "");
	var finBudgetVal = finBudgetVal.trim();
	var url = "/"+argBrowseUrl+"/";
	var queryStr = '?budget='+finBudgetVal;
	window.location.href = url+"browse?"+queryStr;
}



function showBrowse(argPageNum, argOption, argReset, argLastSelection, argFormat='') {
	// 3rd arg will invoke reset mode
	// 5th arg (format): (G)rid or (L)ist format - used only when selecting from one of the format icons - to override the va;lue derrived from the dom
	
	if(argFormat=='L' || argFormat=='G')
		format = argFormat;
	else if($("#formatList").attr("class").search('active')!=-1)
		format = 'L';
	else if($("#formatGrid").attr("class").search('active')!=-1)
		format = 'G';
	
	
	//alert('Format:'+format);
	
	
	
	if(!argReset)
		argReset = false;
	
	if(!argPageNum)
		argPageNum = 1;
	
	if(!argOption)
		argOption = "";
	
	if(!argLastSelection)
		argLastSelection = "";

	// Initialise all the vars first
	var theMake = '';
	var theModel = '';
	var branchID='all';
	var bodyType = '';
	var transmission = '';
	var fuelType = '';
	var numDoors = '';
	var numSeats = '';
	var colour = '';
	var minPrice = '';
	var maxPrice = '';
	var minLitres = '';
	var maxLitres = '';
	var age = '';
	
	var sortOption = document.getElementById("sortOption").value;

	if(argReset) {
			remoteLink("/ajax/?page=car-browse-ajax&ajax=content&action=showBrowse&lastMake="+lastMake+"&make="+theMake+"&model="+theModel+"&branchID="+branchID+"&body-type="+bodyType+"&fuel-type="+fuelType+"&num-doors="+numDoors+"&colour="+colour+"&num-seats="+numSeats+"&transmission="+transmission+"&age="+age+"&min-price="+minPrice+"&max-price="+maxPrice+"&minLitres="+minLitres+"&maxLitres="+maxLitres+"&sortOption="+sortOption+"&pageNum="+argPageNum+"&lastSelection="+argLastSelection+"&format="+format, "browsePanel");
	}
	
	
		
	if(!argReset) {
		

		// Search for advanced bodyStyle selection
		

		$('#makeGroup').find('input').each(function () {
			tmp_id = $(this).attr('id');
			if ($('#'+tmp_id).is(':checked')) {
				tmp = tmp_id.replace('asMake', '');
				theMake += tmp+',';
			}
		});
		
		$('#modelGroup').find('input').each(function () {
			tmp_id = $(this).attr('id');
			if ($('#'+tmp_id).is(':checked')) {
				tmp = tmp_id.replace('asModel', '');
				theModel += tmp+',';
			}
		});
		
		$('#bodyTypeGroup').find('input').each(function () {
			tmp_id = $(this).attr('id');
			if ($('#'+tmp_id).is(':checked')) {
				tmp = tmp_id.replace('asBodyType', '');
				bodyType += tmp+',';
			}
		});
		
		$('#fuelTypeGroup').find('input').each(function () {
			tmp_id = $(this).attr('id');
			if ($('#'+tmp_id).is(':checked')) {
				tmp = tmp_id.replace('asFuelType', '');
				fuelType += tmp+',';
			}
		});
		
		$('#numDoorsGroup').find('input').each(function () {
			tmp_id = $(this).attr('id');
			if ($('#'+tmp_id).is(':checked')) {
				tmp = tmp_id.replace('asNumDoors', '');
				numDoors += tmp+',';
			}
		});
	

		if($("#age").length>0)
			var age = $("#age").val();


		if($("#minLitres").length>0)
			var minLitres = $("#minLitres").val();
		if($("#maxLitres").length>0)
			var maxLitres = $("#maxLitres").val();
		
		
		//alert(minLitres);

		// Search for advanced colour selection
		$('#colourGroup').find('label').each(function () {
			
			var tmpID = $(this).attr('id');
			
			//alert(tmpID);
			
			var classList = $(this).attr('class')
					
			if(classList.search('selected')!=-1) {
					tmpColour = tmpID.replace('asColour', '');
					colour += tmpColour+',';
			}
			
		});	
		
		if(colour=='') {
		
			if($("#colour").length>0) {
				colour = $("#colour").val()
			}
			else {
				colour = '';
			}
		
		}
		
		//alert('285'+colour);
		
		
		var lastMake = document.getElementById("lastMake").value;
		//alert(lastMake);
		
		
		
		
		//alert('293');
		
		//alert("/ajax/?page=car-browse-ajax&ajax=content&action=showBrowse&lastMake="+lastMake+"&make="+theMake+"&model="+theModel+"&branchID="+branchID+"&body-type="+bodyType+"&fuel-type="+fuelType+"&num-doors="+numDoors+"&colour="+colour+"&num-seats="+numSeats+"&transmission="+transmission+"&age="+age+"&min-price="+minPrice+"&max-price="+maxPrice+"&sortOption="+sortOption+"&pageNum="+argPageNum+"&lastSelection="+argLastSelection, "browsePanel");
		remoteLink("/ajax/?page=car-browse-ajax&ajax=content&action=showBrowse&lastMake="+lastMake+"&make="+theMake+"&model="+theModel+"&branchID="+branchID+"&body-type="+bodyType+"&fuel-type="+fuelType+"&num-doors="+numDoors+"&colour="+colour+"&num-seats="+numSeats+"&transmission="+transmission+"&age="+age+"&min-price="+minPrice+"&max-price="+maxPrice+"&minLitres="+minLitres+"&maxLitres="+maxLitres+"&sortOption="+sortOption+"&pageNum="+argPageNum+"&lastSelection="+argLastSelection+"&format="+argFormat, "browsePanel");
		
		document.getElementById("lastMake").value = theMake;
		
		
		//$('#bodyTypeGroup').find('input').each(function () {
			
			//alert('204');
			
			
			//tmp_id = $(this).attr('id');
			//alert(tmp_id);
			
			//if($("#"+tmp_id).is('checked')) {
			//	alert('checked');
			//}
			/*
			alert($(this).attr('checked'));
			if($(this).attr('checked'))
				alert('checked');
			*/
			
			//alert('208');
			
			
			//alert(tmpChkBox);
			
			/*
			if(tmpChkBox.includes("-sel")) {
				
				tmp = tmpChkBox.replace('-sel.svg', '');
				tmp = tmp.replace('/img/icon/body', '');
				bodyType += tmp+',';
				
			}
			*/
		//});	


		
		//theMake = document.getElementById('make').value;
		//alert(theMake);
		
		//theModel = encodeURIComponent(document.getElementById('model').value);
		//alert(theModel);

		// Look for a branch selector
		$('input[id]').each(function () {
			var patt = new RegExp("^"+argOption+"loc[0-9]$");
			//alert('Looking for '+patt);
			//alert(this.id);
			if (patt.test(this.id)) {
				//alert( $('input[id='+this.id+']:checked').val() )
				if($('input[id='+this.id+']:checked').val()=='on') {
					branchID = this.id.replace(argOption+"loc", "");
				}
			}	
		});
		
		
		// Search for advanced bodyStyle selection
		$('#bodyStyleGroup').find('img').each(function () {
			
			var tmpImg = $(this).attr('src');
			
			//alert(tmpImg);
			
			if(tmpImg.includes("-sel")) {
				
				tmp = tmpImg.replace('-sel.svg', '');
				tmp = tmp.replace('/img/icon/body', '');
				bodyType += tmp+',';
				
			}
		});	
		
		if(bodyType=='') {
		
			if($("#body-type").length>0) {
				bodyType = $("#body-type").val()
			}
			else {
				bodyType = '';
			}
		
		}
		
		
		// Search for advanced transmission selection
		$('#transmissionGroup').find('img').each(function () {
			
			var tmpImg = $(this).attr('src');
			
			//alert(tmpImg);
			
			if(tmpImg.includes("-sel")) {
				
				tmp = tmpImg.replace('-sel.svg', '');
				tmp = tmp.replace('/img/icon/trans', '');
				transmission += tmp+',';
				
			}
			
			
		});	
		
		if(transmission=='') {
		
			if($("#body-type").length>0) {
				transmission = $("#transmission").val()
			}
			else {
				transmission = '';
			}
		
		}
		
		
		
		// Search for advanced fuelType selection
		$('#fuelTypeGroup').find('img').each(function () {
			
			var tmpImg = $(this).attr('src');
			
			if(tmpImg.includes("-sel")) {
				
				tmp = tmpImg.replace('-sel.svg', '');
				tmp = tmp.replace('/img/icon/fuelType', '');
				fuelType += tmp+',';
				
			}
			
			
		});	
		
		if(fuelType=='') {
		
			if($("#body-type").length>0) {
				fuelType = $("#fuelType").val()
			}
			else {
				fuelType = '';
			}
		
		}
		
		
		// Search for advanced numDoors selection
		$('#numDoorsGroup').find('img').each(function () {
			
			var tmpImg = $(this).attr('src');
			
			if(tmpImg.includes("-sel")) {
				
				tmp = tmpImg.replace('-sel.svg', '');
				tmp = tmp.replace('/img/icon/doors', '');
				numDoors += tmp+',';
			
			}
			
		});	
		if(numDoors=='') {
		
			if($("#numDoors").length>0) {
				numDoors = $("#numDoors").val()
			}
			else {
				numDoors = '';
			}
		
		}
		
	
		
		// Search for advanced numSeats selection
		$('#numSeatsGroup').find('img').each(function () {
			
			var tmpImg = $(this).attr('src');
			
			if(tmpImg.includes("-sel")) {
				
				tmp = tmpImg.replace('-sel.svg', '');
				tmp = tmp.replace('/img/icon/seats', '');
				numSeats += tmp+',';
				
			}
			
		});	
		if(numSeats=='') {
		
			if($("#numSeats").length>0) {
				numSeats = $("#numSeats").val()
			}
			else {
				numSeats = '';
			}
		
		}
		
		// Search for advanced colour selection
		$('#colourGroup').find('div.single-colour').each(function () {
			
			var tmpID = $(this).attr('id');
			var classList = $(this).attr('class')
					
			if(classList.search('selected')!=-1) {
					tmpColour = tmpID.replace('asColour', '');
					colour += tmpColour+',';
			}
			
		});	
		
		if(colour=='') {
		
			if($("#colour").length>0) {
				colour = $("#colour").val()
			}
			else {
				colour = '';
			}
		
		}



		if($(".leftLabel").length>0)
			minPrice = $(".leftLabel").text();

		if($(".rightLabel").length>0)
			maxPrice = $(".rightLabel").text();


		if($("#age").length>0)
			age = $("#age").find(".noUi-tooltip").html();


		var sortOption = document.getElementById("sortOption").value;
		//alert(sortOption);
		
		
		//var option = document.getElementById("option").value;
		//if(option)
		//	alert(option);
		
		/*
		//var deposit = document.getElementById("deposit").value;
		//alert(deposit);
		
		//var term = document.getElementById("term").value;
		//alert(term);
		
		//var mileage = document.getElementById("mileage").value;
		//alert(mileage);
		
		//var budget1 = $("#budget").find(".noUi-tooltip").html(); 
		*/
		
	}

	document.getElementById("browsePanel").html = '';
	// Old WMG Call
	
	//alert("/ajax/?page=car-browse-ajax&ajax=content&action=showBrowse&make="+theMake+"&model="+theModel+"&body-type="+bodyType+"&transmission="+transmission+"&fuel-type="+fuelType+"&age="+age+"&min-price="+minPrice+"&max-price="+maxPrice+"&lastMake="+lastMake+"&option="+option+"&deposit="+deposit+"&term="+term+"&mileage="+mileage+"&budget="+budget1+"&sortOption="+sortOption+"&pageNum="+argPageNum, "browsePanel");
	
	// 108 WMG Call (tested)
	//alert("/ajax/?page=car-browse-ajax&ajax=content&action=showBrowse&make="+theMake+"&model="+theModel+"&body-type="+bodyType+"&transmission="+transmission+"&fuel-type="+fuelType+"&age="+age+"&min-price="+minPrice+"&max-price="+maxPrice+"&lastMake="+lastMake+"&budget="+budget1+"&sortOption="+sortOption+"&pageNum="+argPageNum, "browsePanel");
	
	
	// 108 J17 Dev Call
	//alert("/ajax/?page=car-browse-ajax&ajax=content&action=showBrowse&make="+theMake+"&model="+theModel+"&branchID="+branchID, "browsePanel");
	
	//alert("/ajax/?page=car-browse-ajax&ajax=content&action=showBrowse&lastMake="+lastMake+"&make="+theMake+"&model="+theModel+"&branchID="+branchID+"&body-type="+bodyType+"&fuel-type="+fuelType+"&num-doors="+numDoors+"&colour="+colour+"&num-seats="+numSeats+"&transmission="+transmission+"&age="+age+"&min-price="+minPrice+"&max-price="+maxPrice, "browsePanel");

		
	//remoteLink("/ajax/?page=car-browse-ajax&ajax=content&action=showBrowse&lastMake="+lastMake+"&make="+theMake+"&model="+theModel+"&branchID="+branchID+"&body-type="+bodyType+"&fuel-type="+fuelType+"&num-doors="+numDoors+"&colour="+colour+"&num-seats="+numSeats+"&transmission="+transmission+"&age="+age+"&min-price="+minPrice+"&max-price="+maxPrice+"&sortOption="+sortOption+"&pageNum="+argPageNum, "browsePanel");
	//document.getElementById("lastMake").value = theMake;
}


function showSearchForm(argMake, argModel, argBodyType, argTransmission, argFuelType, argNumDoors, argNumSeats, argColour, argAge, argMinPrice, argMaxPrice, argMinLitres, argMaxLitres, argLastMake, argOption, argBudget, argBranchID, argLastSelection) {
	
	remoteLink("/ajax/?page=car-browse-ajax&ajax=content&action=showSearchForm&make="+argMake+"&model="+argModel+"&body-type="+argBodyType+"&transmission="+argTransmission+"&fuel-type="+argFuelType+"&num-doors="+argNumDoors+"&num-seats="+argNumSeats+"&colour="+argColour+"&age="+argAge+"&min-price="+argMinPrice+"&max-price="+argMaxPrice+"&minLitres="+argMinLitres+"&maxLitres="+argMaxLitres+"&lastMake="+argLastMake+"&option="+argOption+"&budget="+argBudget+"&branchID="+argBranchID+"&lastSelection="+argLastSelection, "searchPanel");
	
}


function delSearchTag(argField, argValue) {
	
	
	//alert('Field:'+argField);
	//alert('Value:'+argValue);
	
	if(argField=='age') {
		
		$('#age :selected').remove();
		
	}
	else {
		
		if(argField=='body-type')
			argField='bodyType'
		else if(argField=='fuel-type')
			argField='fuelType'
		else if(argField=='num-doors')
			argField='numDoors'
		
		$('#'+argField+'Group').find('input').each(function () {
			
			var tmp_id = $(this).attr('id');
			
			if ($('#'+tmp_id).is(':checked')) {
				
				// Capitalise first letter
				argField = argField.replace(/^[a-z]/, function (x) {return x.toUpperCase()});
				
				//alert(tmp_id+' is checked');
				
				//alert('Field name'+argField);
				
				if(argField=='Colour') {
					tmp_id = 'asColour'+argValue;
					$("#"+tmp_id).removeClass("selected");
				}
				else {
					
					//alert('Unchecking:'+tmp_id);
					
					if(tmp==argValue) {

						$('#'+tmp_id).prop("checked", false);
					}

					
				}
			

			}
		});
		
	}
	
	showBrowse();
		
}


function newsletterSubmit() {
	
	var email = $("#newsletterEmail").val();
	remoteLink("/ajax/?page=home-ajax&ajax=content&action=newsletterSubmit&email="+email, "signUpResult");
	
}

function loadModal(argMode, argSku) {
	if(!argSku)
		argSku = '';
	
	if(argMode=='valuation' && !argSku) {
		var reg = document.getElementById('reg').value;	
		remoteLink("/ajax/?page=car-ad-ajax&ajax=content&action=loadModal&mode="+argMode+"&reg="+reg, "modalContent");
	}
	else {
		remoteLink("/ajax/?page=car-ad-ajax&ajax=content&action=loadModal&mode="+argMode+"&sku="+argSku, "modalContent");
	}
	
}

function loadModalMot() {
	var reg = document.getElementById('reg').value;	
	remoteLink("/ajax/?page=car-ad-ajax&ajax=content&action=loadModal&mode=mot&reg="+reg, "modalContent");
}

function vrnLookup(argRegDiv) {
	
	if(!argRegDiv)
		argRegDiv='reg';
	
	$("#vrnBtn").html("&nbsp&nbsp&nbsp<i class=\"fa fa-spinner fa-spin\"></i>&nbsp&nbsp&nbsp");
	
	var reg = $("#"+argRegDiv).val();
	
	var allOK = true;
	
	if(!validate('Registration No.', reg, 'text', 7, 5))
	  allOK = false;
	if(allOK)
		remoteLink("/ajax/?page=car-ad-ajax&ajax=content&action=vrnLookup&reg="+reg, "carLookupData");
	else
		alert('validation Error - Contact Support');
}

function validate(argField, argValue, argType, argMax, argMin) {
		var allOK = true;
		if(!argMin) 
			var argMin = 0;
		
		if(argType=='int' || argType=='float') {

				if(!IsNumeric(argValue)) {
					popup('text', 'The field '+argField+' must be numeric', 'Invalid Value', 'Alert');
					allOK = false;
				}
				if(+argValue > +argMax || +argValue < +argMin) {
					popup('text', 'The field '+argField+' must be within the range '+argMin+' to '+argMax, 'Invalid Value', 'Alert');
					allOK = false;
				}
		}
		else if(argType=='text') {

				if(argValue.length>argMax || argValue.length<argMin) {
					popup('text', 'The field '+argField+' must be between '+argMin+' and '+argMax+ ' characters long', 'Invalid Value', 'Alert');
					allOK = false;
				}
		}
		else {
				alert('unexpected value for validate() - please advise Support');
				allOK = false;
		}
		
		if(!allOK) {
			
			var oldValue = document.getElementById('editValue').innerHTML;
			
			document.getElementById(argField).value = oldValue;
			document.getElementById('editValue').innerHTML = 'Empty';
			
		}
		
		return allOK;
}



function sendEnq(argSource, argDivPrefix) {
	
		if(!argSource)
			argSource = '';
		if(!argDivPrefix)
			argDivPrefix = '';
		
		
		if($("#"+argDivPrefix+"surname").length>0)
			var surname = $("#"+argDivPrefix+"surname").val();
		else 
			var surname = '';
		
		if($("#"+argDivPrefix+"firstName").length>0)
			var firstName = $("#"+argDivPrefix+"firstName").val();
		else 
			var firstName = '';
		
		if($("#"+argDivPrefix+"name").length>0)
			var name = $("#"+argDivPrefix+"name").val();
		else if(firstName.length>0 || surname.length>0)
			var name = firstName+' '+surname;
		else
			var name = '';
		
		var email = $("#"+argDivPrefix+"email").val();
		var phone = $("#"+argDivPrefix+"phone").val();
		
		if($("#"+argDivPrefix+"reg").length>0)
			var reg = $("#"+argDivPrefix+"reg").val();
		else
			var reg = '';
		
		if($("#"+argDivPrefix+"mileage").length>0)
			var mileage = $("#"+argDivPrefix+"mileage").val();
		
		if($("#"+argDivPrefix+"sku").length>0)
			var sku = $("#"+argDivPrefix+"sku").val();
		
		var title = $("#"+argDivPrefix+"title").val();

		if($("#"+argDivPrefix+"carInfo").length>0) {
			var carInfo = $("#"+argDivPrefix+"carInfo").html();
		}
		else {
			if($("#"+argDivPrefix+"carLookupDesc").length>0) {
				var carInfo = $("#"+argDivPrefix+"carLookupDesc").val();
			}
		}
		
		if($("#"+argDivPrefix+"motDate").length>0)
			var motDate = $("#"+argDivPrefix+"motDate").val();
		else
			var motDate = '';
		
		if($("#"+argDivPrefix+"timeOfDay").length>0)
			var timeOfDay = $("#"+argDivPrefix+"timeOfDay").val();
		else
			var timeOfDay = '';
		
		
		var msg = $("#"+argDivPrefix+"msg").val();
		
		if($("#"+argDivPrefix+"owners").length>0) {
			var owners = $("#"+argDivPrefix+"owners").val();
			msg += "\nOwners:"+owners;
		}
		
		var garageID = 1;
		if($("#"+argDivPrefix+"garageID").length>0)
			garageID = $("#"+argDivPrefix+"garageID").val();

		msg = msg.replace(/(\r\n|\n|\r)/g," ");
		
		//alert("/ajax/?page=car-ad-ajax&ajax=content&action=sendEnq&name="+name+"&email="+email+"&phone="+phone+"&reg="+reg+"&mileage="+mileage+"&msg="+msg+"&sku="+sku+"&title="+title+"&carInfo="+carInfo+"&motDate="+motDate+"&timeOfDay="+timeOfDay+"&garageID="+garageID+"&source="+argSource, "errorMsg");
		remoteLink("/ajax/?page=car-ad-ajax&ajax=content&action=sendEnq&name="+name+"&email="+email+"&phone="+phone+"&reg="+reg+"&mileage="+mileage+"&msg="+msg+"&sku="+sku+"&title="+title+"&carInfo="+carInfo+"&motDate="+motDate+"&timeOfDay="+timeOfDay+"&garageID="+garageID+"&source="+argSource+"&divPrefix="+argDivPrefix, argDivPrefix+"errorMsg");



		
}




function showMoreOptions() {
	$('#moreOptions').toggle();
	$('#moreOptionsLink').toggle();
}




function selectPriceMode() {
	$('#togBudget').hide(); 
	$('#togMinPrice').show(); 
	$('#togMaxPrice').show();
	$('#btnPrice').addClass('selected')
	$('#btnBudget').removeClass('selected')
}

function selectBudgetMode() {
	$('#togBudget').show(); 
	$('#togMinPrice').hide(); 
	$('#togMaxPrice').hide();
	$('#btnPrice').removeClass('selected')
	$('#btnBudget').addClass('selected')
}


function startAddress() {
	remoteLink("/ajax/?page=car-ad-ajax&ajax=content&action=startAddress", "actionPanel")
	$('#reserve').collapse('toggle');
}


function validateString(argTxt, argName) {
	//alert(argName + ' '+ argTxt);
	if(argTxt.trim()=='') {
		return argName + ' cannot be blank';
	}
	else {
		return '';
	}
}


function showFullAddress(argMode) {
	
	
	
	if(argMode=='lookup') {

		var errMsg = '';
		
		var firstName = $("#firstName").val();
		var surname = $("#surname").val();
		var email = $("#email").val();
		var phone = $("#phone").val();
		var houseNameNumber = $("#houseNameNumber").val();
		var postCode = $("#postCode").val();
		var sku = $("#sku").html();
		var title = encodeURIComponent($("#title").html());
		
		if(errMsg=='')
			errMsg = validateString(firstName, 'First Name');
		
		if(errMsg=='')
			errMsg = validateString(surname, 'Surname');
		
		if(errMsg=='')
			errMsg = validateString(email, 'Email Address');
		
		if(errMsg=='')
			errMsg = validateString(phone, 'Phone Number');
		
		if(errMsg=='')
			errMsg = validateString(houseNameNumber, 'House Name or Number');
		
		if(errMsg=='')
			errMsg = validateString(postCode, 'Post Code');

		if(errMsg!='') {
			$("#errorMsg").html(errMsg);
			$('#errorMsg').addClass("errorTxt");
		}
		else {
			$('#errorMsg').removeClass("errorTxt");
			$("#errorMsg").html('');

			remoteLink("/ajax/?page=car-ad-ajax&ajax=content&action=showFullAddress&mode="+argMode+"&firstName="+firstName+"&surname="+surname+"&email="+email+"&phone="+phone+"&houseNameNumber="+houseNameNumber+"&postCode="+postCode+"&sku="+sku+"&title="+title, "actionPanel")
		}
		
	}
	else {
		remoteLink("/ajax/?page=car-ad-ajax&ajax=content&action=showFullAddress&mode="+argMode, "actionPanel")
	}
	
	
}


function saveCust() {
	
	var errMsg = '';
	
	var firstName = $("#firstName").val();
	var surname = $("#surname").val();
	var email = $("#email").val();
	var phone = $("#phone").val();
	var houseNameNumber = $("#houseNameNumber").val();
	var postCode = $("#postCode").val();
	var sku = $("#sku").html();
	var title = encodeURIComponent($("#title").html());
	
	var address1 = $("#address1").val();
	var address2 = $("#address2").val();
	var city = $("#city").val();
	var county = $("#county").val();
	
	
	if(errMsg=='')
		errMsg = validateString(firstName, 'First Name');
	
	if(errMsg=='')
		errMsg = validateString(surname, 'Surname');
	
	if(errMsg=='')
		errMsg = validateString(email, 'Email Address');
	
	if(errMsg=='')
		errMsg = validateString(phone, 'Phone Number');
	
	if(errMsg=='')
		errMsg = validateString(houseNameNumber, 'House Name or Number');
	
	if(errMsg=='')
		errMsg = validateString(postCode, 'Post Code');


	if(errMsg=='')
		errMsg = validateString(address1, 'Address Line 1');
	
	if(errMsg=='')
		errMsg = validateString(city, 'Town / City');
	
	
	if(errMsg!='') {
		$("#errorMsg").html(errMsg);
		$('#errorMsg').addClass("errorTxt");
	}
	else {

		$('#errorMsg').removeClass("errorTxt");
		$("#errorMsg").html('');
		remoteLink("/ajax/?page=car-ad-ajax&ajax=content&action=saveCust&firstName="+firstName+"&surname="+surname+"&email="+email+"&phone="+phone+"&houseNameNumber="+houseNameNumber+"&postCode="+postCode+"&sku="+sku+"&title="+title+"&address1="+address1+"&address2="+address2+"&city="+city+"&county="+county, "actionPanel")

		
	
	}
}

function validateBeforeSage() {
	
	if($('#termsChecked').attr('checked')) {
		$('#errorMsg').removeClass("errorTxt");
		$("#errorMsg").html('');
		return true;
	}
	else {
		$("#errorMsg").html('You must accept our Terms & Conditions before proceeding');
		$('#errorMsg').addClass("errorTxt");
		return false;
	}

	
}


function socialModal(argSku) {
	
	remoteLink("/ajax/?page=home-ajax&ajax=content&action=socialModal&sku="+argSku, "socialModalContent");
	
	$('#socialModal').modal();
	
}




/* Advanced Search */
function asSelectIcon(argID, argExt) {
	
	if(!argExt)
		argExt = '.svg';
	
	var tmpImg = $('#'+argID).find('img').attr('src');
	
	if(tmpImg.includes("-sel")) 
		tmpImg = tmpImg.replace('-sel'+argExt, argExt);
	else 
		tmpImg = tmpImg.replace(argExt, '-sel'+argExt);
	
	$('#'+argID).find('img').attr('src', tmpImg);
	
	showBrowse();
	
}



function asSelectColour(argID) {
	
	var tmpColour = argID.replace('asColour', '');
	
	//alert('973'+tmpColour);
	
	var classList = $("#"+argID).attr('class');
	//alert(classList);
	
	if(classList.search('selected')!=-1)
		$( "#"+argID ).removeClass('selected');
	else 
		$( "#"+argID ).addClass('selected');
	

	var classList = $("#"+argID).attr('class');
	//alert(classList);
	
	
	//alert('982'+tmpColour);
	showBrowse(1, '', false, 'colour')
	
}


function scrolltop() {
    
	var target = $('html');
    $('html,body').animate({
        scrollTop: target.offset().top
    }, 1000);
}


function copyToClipboard() {

	var copyEvent = new ClipboardEvent('copy', { dataType: 'text/plain', data: 'Hairy Monkey' } );
	document.dispatchEvent(copyEvent);
	
}



/* End: ahq-garage-sites */









/*
####################################
3 - AJAX.js
####################################
*/



//*****************************************************************************************************************
//*****		AJAX FUNCTIONS FOR LIVE SEARCH + DYNAMIC DROPDOWNS
//*****		Beginnings of an Ajax library, feel free to add to this/extend/fix. 
//*****		These should be cross server and cross browser
//*****		* Text field observer implemented.
//*****		* Remote link implemented.
//*****		* Remote forms implemented.
//*****		* show progress functions implemented for remote forms.
//*****		* remote link with progress implemented
//*****		Developer: James Burrows
//*****************************************************************************************************************
//***** API																NOTES
//***** decodeToVars(stringToDecode)					 			 -  Decodes a query string into a collection of keys and values.
//***** observe(fieldname, rate, scrtarget, replacediv)	 			 -  observes a form field, usually a text input or dropdown, scrtarget = remote method to call, replacediv is the part of the current page which will be updated.
//***** remoteLink(scrtarget, replacediv)				 			 -  goes in an anchor href, scrtarget is the remote script, replacediv is the portion of the page to be replaced.
//***** remoteLinkWithProgress(scrtarget, replacediv, progressdiv) 	 -  as above but progressdiv is the div to show whilst waiting on remote process to complete
//***** remoteForm(scrtarget, formname, replacediv, progressdiv) 	 -  goes in the form onSubmit action, does not work with multipart forms, formname is the name of the form to be collected and sent for processing
//***** showProgress(divName) 										 -  usually internal only but is used to show a specified progress div
//***** hideProgress() 												 -  usually internal but is used to hide the last shown progress div
//***** initialise(intSetdebug, strSeterrormode)					 -  sets debug level and where debug messages are sent. strSeterrormode can be "alert" for pop up messages or the name of a div for more controlled output
//********************************************** Global vars/Initialisations ****************************************************

var debug = 0; 					// 1 debugs XMLHttpRequest(), 2 debugs return methods, 0 is off.
var errorMode = "alert"; 		// can be 'alert' or the name of a div where you want errors output to.
var obTimeout = new Array(); 	// array of timeout references for observers
var obData = new Array(); 		// form field data held on last pass (so we can work out if there is any change on the next pass) 
var postbody; 					// the post variables we are sending to the remote process
var currentProgress; 			// the name of the currently active progress div
postbody = "";					// init this var to avoid 411 errors from the server (when the server thinks we haven't sent anything!)

//********************************************** Support functions ****************************************************

function ajaxIsPresent() {
	return true;
}

function newXMLHttpRequest() {
  var xmlreq = false;
  if (window.XMLHttpRequest) {
    // Create XMLHttpRequest object in non-Microsoft browsers
    xmlreq = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    // Create XMLHttpRequest via MS ActiveX
    try {
      // Try to create XMLHttpRequest in later versions
      // of Internet Explorer
      xmlreq = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e1) {
      // Failed to create required ActiveXObject
      try {
        // Try version supported by older versions
        // of Internet Explorer
        xmlreq = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e2) {
        // Unable to create an XMLHttpRequest with ActiveX
      }
    }
  }

  return xmlreq;
}

function getReadyStateHandler(req, responseXmlHandler, type, replacediv)
{
  // Return an anonymous function that listens to the
  // XMLHttpRequest instance
  return function () {
    // If the request's status is "complete"
    if (req.readyState == 4) {
      // Check that a successful server response was received
      if (req.status == 200) {
        // Pass the XML payload of the response to the
        // handler function
        if (type == "XML") {
            responseXmlHandler(req.responseXML, replacediv);
        } else {
            responseXmlHandler(req.responseText, replacediv);
        }
      } else {
        // An HTTP problem has occurred
        if (debug == 1) {
			logError("HTTP error: "+req.status+req.responseText);
		}
      }
    }
  }
}

function decodeToVars(stringToDecode)
{
	var elements = stringToDecode.split("&");
    var associative = new Array();

    for (i = 0; i < elements.length; i++) {
        var pair = elements[i];
        var components = pair.split("=");
        var key = components[0];
        var value = components[1];
        key = unescape(key);
        value = unescape(value);
        key = key.replace(/\+/g, " ");
        value = value.replace(/\+/g, " ");
        associative[key] = value;
    }

    return associative;
}

function getData(url, processfunc, replacediv) {
	if (debug == 2) {
		logError("sending request for processing at: "+url)
	}
    var req = newXMLHttpRequest();
	
    var handlerFunction = getReadyStateHandler(req, eval(processfunc), "plaintext", replacediv);
    req.onreadystatechange = handlerFunction;

    req.open("POST", url, true);

    req.setRequestHeader("Content-Type",
                       "application/x-www-form-urlencoded");
	req.send(postbody);
	postbody = ""
}

//********************************************** Business End (end user stuff) ****************************************************

function initialise(intSetdebug, strSeterrormode) {
	var debug = intSetdebug
	var errorMode = strSeterrormode
}

function observe(fieldname, rate, scrtarget, replacediv) {
	if (obTimeout[fieldname] == null) {
		// set up a new observer
		newtimeout = setTimeout("observe('"+fieldname+"', "+rate+", '"+scrtarget+"', '"+replacediv+"')", rate);
		obData[fieldname] = document.getElementById(fieldname).value
		obTimeout[fieldname] = newtimeout;
	} else {
		// do something with an existing observer
		clearTimeout(obTimeout[fieldname]);
		fdata = document.getElementById(fieldname).value;
		if (obData[fieldname] != fdata) {
			getData(scrtarget+"&"+fieldname+"="+fdata, "testProcess", replacediv);
		}
		obData[fieldname] = fdata;
		obTimeout[fieldname] = setTimeout("observe('"+fieldname+"', "+rate+", '"+scrtarget+"', '"+replacediv+"')", rate);
	}
}

function observeWithProgress(fieldname, rate, scrtarget, replacediv, progressdiv) {
	if (obTimeout[fieldname] == null) {
		// set up a new observer
		newtimeout = setTimeout("observeWithProgress('"+fieldname+"', "+rate+", '"+scrtarget+"', '"+replacediv+"', '"+progressdiv+"')", rate);
		obData[fieldname] = document.getElementById(fieldname).value
		obTimeout[fieldname] = newtimeout;
	} else {
		// do something with an existing observer
		clearTimeout(obTimeout[fieldname]);
		fdata = document.getElementById(fieldname).value;
		if (obData[fieldname] != fdata) {
			showProgress(progressdiv); //show the progress div only if we're punching out to the remote process
			getData(scrtarget+"&"+fieldname+"="+fdata, "testProcess", replacediv);
		}
		obData[fieldname] = fdata;
		obTimeout[fieldname] = setTimeout("observeWithProgress('"+fieldname+"', "+rate+", '"+scrtarget+"', '"+replacediv+"', '"+progressdiv+"')", rate);
	}
}

function remoteLink(scrtarget, replacediv) {
	getData(scrtarget, "testProcess", replacediv);
}

function remoteLinkWithProgress(scrtarget, replacediv, progressdiv) {
	showProgress(progressdiv);
	getData(scrtarget, "testProcess", replacediv);
}

function remoteForm(scrtarget, formname, replacediv, progressdiv) {
	//scan through form elements and get a postbody together!
	targetform = document.getElementById(formname);
	//targetform = eval("document."+formname);
	t = 0
	for(i=0; i<targetform.elements.length; i++){
	//for (x in targetform.elements) {
		if (targetform.elements[t] != null) {
			//alert(targetform.elements[t].type);
			if (targetform.elements[t].type == 'checkbox') {
				if (targetform.elements[t].checked == true) {
					fieldElement = targetform.elements[t];
					postbody += escape(fieldElement.name)+"="+encodeURIComponent(fieldElement.value)+"&";
				}
			} else if (targetform.elements[t].type == 'select-multiple') {
				//DOES NOT WORK IN SAFARI 3 (1 AND 2 NOT TESTED)
				values = ""
				fieldElement = targetform.elements[t];
				for (var i=targetform.elements[t].options.length-1; i >= 0;i--) {
					if (targetform.elements[t].options[i].selected) {
						postbody += escape(fieldElement.name)+"="
						postbody += encodeURIComponent(targetform.elements[t].options[i].value)+"&";
					}
				}
			} else {
				fieldElement = targetform.elements[t];
				postbody += escape(fieldElement.name)+"="+encodeURIComponent(fieldElement.value)+"&";
			}
		}
		t += 1
	}
	
	if (debug == 2) {
		logError("form data sent: "+postbody);
	}
	
	//show progress indicator and send data to server
	showProgress(progressdiv);
	getData(scrtarget, "testProcess", replacediv);
	
	//should probably clear form fields here
	t = 0
	for (x in targetform.elements) {
		if (targetform.elements[t] != null) {
			fieldElement = targetform.elements[t];
			// make sure we dont kill any button text or hidden field values!
			if (fieldElement.type != "button" && fieldElement.type != "submit" && fieldElement.type != "hidden" && fieldElement.type != "select-one" && fieldElement.type != "select-multiple") {
				fieldElement.value = "";
			}
		}
		t += 1
	}
	
	//return false as we dont actually want the form to be submitted normally
	return false;
}

function remoteFormWithOutClear(scrtarget, formname, replacediv, progressdiv) {
	targetform = document.getElementById(formname);
	//targetform = eval("document."+formname);
	t = 0
	for(t=0; t<targetform.elements.length; t++) {
		if (targetform.elements[t] != null) {
			if (targetform.elements[t].type == 'checkbox') {
				if (targetform.elements[t].checked == true) {
					fieldElement = targetform.elements[t];
					postbody += escape(fieldElement.name)+"="+encodeURIComponent(fieldElement.value)+"&";
				}
			} else if (targetform.elements[t].type == 'select-multiple') {
				//DOES NOT WORK IN SAFARI 3 (1 AND 2 NOT TESTED)
				values = ""
				fieldElement = targetform.elements[t];
				for (var i=targetform.elements[t].options.length-1; i >= 0;i--) {
					if (targetform.elements[t].options[i].selected) {
						postbody += escape(fieldElement.name)+"="
						postbody += encodeURIComponent(targetform.elements[t].options[i].value)+"&";
					}
				}
			} else {
				fieldElement = targetform.elements[t];
				postbody += escape(fieldElement.name)+"="+encodeURIComponent(fieldElement.value)+"&";
			}
		}
		//t += 1
	}
	
	if (debug == 2) {
		logError("form data sent: "+postbody);
	}
	
	//show progress indicator and send data to server
	showProgress(progressdiv);
	getData(scrtarget, "testProcess", replacediv);
	
	//return false as we dont actually want the form to be submitted normally
	return false;
}

function testProcess(data, replacediv) {
	if (debug == 2) {
		logError("processing returned data: "+data);
	}
	document.getElementById(replacediv).innerHTML = data;
	if (data.indexOf("<script>") != -1) {
		if (debug == 2) {
			logError("processing returned javascript: "+data);
		}
		// process any script sent by the browser
		scripttagstart = data.indexOf("<script>")+8
		scripttagend = data.indexOf("</script>")
		//alert(data.slice(scripttagstart,scripttagend));
		eval(data.slice(scripttagstart,scripttagend))
	}
	hideProgress();
}

function showProgress(divName) {
	// show div
	if (debug == 2) {
		logError("showing progress div")
	}
	currentProgress = divName;
	document.getElementById(currentProgress).style.display = "block";
}

function hideProgress() {
	// just toggle hidden last shown div.
	if (debug == 2) {
		logError("hiding progress div")
	}
	if ((currentProgress != "") && (currentProgress != null)) {
		document.getElementById(currentProgress).style.display = "none";
		currentProgress = "";
	}
}

function logError(strMessage) {
	if (errorMode != "alert") {
		olderrors = document.getElementById(errorMode).innerHTML;
		olderrors += "<p>"+strMessage+"</p>";
		document.getElementById(errorMode).innerHTML = olderrors;
	} else {
		alert(strMessage)
	}
}

//********************************************************* IFRAME RELATED FUNCTIONS ********************************************
//*** Much of this is borrowed from iframeRequest by Nikola Derezic. ***//

var iFrameAppendBit = 0;		// do we append or replace, 1 = append, 0 = replace 
var multipartHandle;			// retained reference when working with multipart stuff
var iFrameReplaceDiv;			// multipart div to update

function remoteFormMultipart(replacediv, progressdiv, appendBit) {
	//alert("got this far!");
	showProgress(progressdiv);
	iFrameReplaceDiv = replacediv;
	iFrameAppendBit = appendBit;
	return true;
}

function processMultipartResponse(iFrameID) {
	//alert("got this far!")
	if ((iFrameReplaceDiv != "") && (iFrameReplaceDiv != null)) {
		data = getContentDocument(document.getElementById(iFrameID)).body.innerHTML;
		if (data.indexOf("<script>") != -1) {
			if (debug == 2) {
				logError("processing returned javascript: "+data);
			}
			// process any script sent by the browser
			scripttagstart = data.indexOf("<script>")+8
			scripttagend = data.indexOf("</script>")
			eval(data.slice(scripttagstart,scripttagend))
		}
		if (iFrameAppendBit == 0) {
			document.getElementById(iFrameReplaceDiv).innerHTML = getContentDocument(document.getElementById(iFrameID)).body.innerHTML;
			//alert(getContentDocument(document.getElementById(iFrameID)).body.innerHTML);
		} else {
			document.getElementById(iFrameReplaceDiv).innerHTML += getContentDocument(document.getElementById(iFrameID)).body.innerHTML;
		}
		
		hideProgress();
		multipartCleanup(multipartHandle);
	}
}

function multipartCleanup(iframeobject) {
	// reset all variables for next use
	multipartHandle = "";
	iFrameReplaceDiv = "";
	iFrameAppendBit = 0;
}

function createIframe(inIFrameID)
{
	var iframeObj = null;
    var iFrameID = inIFrameID;
    var divID = inIFrameID+'_div';
    var iframeStyle = 'width:0px; height:0px; border: 0px; display:none;';
//    var divStyle = 'display:none;position:absolute;top:0;left:0;'; --> doesn't work in Opera
    var divStyle = 'position:absolute;top:0;left:0;width:0;height:0;overflow:hidden;';

    // ako objekat veæ postoji ... vrati referencu na njega
    if(document.getElementById(iFrameID))
      return(document.getElementById(iFrameID));
	
	var iframeHTML = '<iframe id="'+iFrameID+'" name="'+iFrameID+'" style="'+iframeStyle+'" onLoad="processMultipartResponse("'+inIFrameID+'");"><\/iframe>';

    //Put iframe in container and append to any div in page
    if (!document.getElementById(divID))
    {
        tmpDiv = document.createElement("div");
        tmpDiv.setAttribute('id', divID);
        tmpDiv.setAttribute('style', divStyle);
        tmpDiv.innerHTML = iframeHTML;
        document.getElementsByTagName('DIV')[0].appendChild(tmpDiv);
    }
    else
    {
       document.getElementById(divID).innerHTML = iframeHTML;
    }

    iframeObj = document.getElementById(iFrameID);
}

function createIframeOLD(inIFrameID)
{
    /* Routine to create hidden iframe */
    var iframeObj = null;
    var iFrameID = inIFrameID;
    var divID = inIFrameID+'_div';
    var iframeStyle = 'width:0px; height:0px; border: 0px; display:none;';
//    var divStyle = 'display:none;position:absolute;top:0;left:0;'; --> doesn't work in Opera
    var divStyle = 'position:absolute;top:0;left:0;width:0;height:0;overflow:hidden;';

    // ako objekat veæ postoji ... vrati referencu na njega
    if(document.getElementById(iFrameID))
      return(document.getElementById(iFrameID));

    try
    {
        //Create Iframe and put it at bottom of page
        var tmpFrame = document.createElement("iframe");
        tmpFrame.setAttribute("id", iFrameID);
        tmpFrame.setAttribute("name", iFrameID);
        tmpFrame.setAttribute("style", iframeStyle);
		tmpFrame.setAttribute("onLoad", "processMultipartResponse('"+inIFrameID+"');");

        //IE 6.0 fix using wrapper div with display none
        var tmpDiv = document.createElement("div");
        tmpDiv.setAttribute("id", divID);
        tmpDiv.setAttribute("style", divStyle);
        tmpDiv.appendChild(tmpFrame);
        document.body.appendChild(tmpDiv);

        if (typeof document.frames != "undefined")
        {
            /* Required for IE 5 on Mac and throws error on IE 5.0 PC
             * which we need to branch to a different process.
             */
            iframeObj = document.frames[iFrameID];
        }
        if (!iframeObj || typeof iframeObj.nodeType == "undefined")
        {
           /* Most browsers yield null or good iframe reference above,
            * but some return an object with no properties so nodeType test.
            */
            iframeObj = document.getElementById(iFrameID);
        }
    }
    catch (e)
    {
       /* Hack to handle IE 5.0 on PC, which doesn't want to 'automate'
        * adding an iframe.
        *
        * CSS:
        * iframe-div {position: absolute;} gets it out of document flow
        * rs-frame {border-style: none; height: 0; widht: 0; visibility: hidden;}
        *
        * Reguired:
        * 1. HTML string for iframe and NOT an element object.
        * 2. use iframe src attribute to load first RPC; otherwise only subsequent calls work
        * 3. Block container for iframe
        * 4. Attach container and iframe to any block inside body but NOT the body.
        */

        //String HTML describing iframe and first URL called   ... src="'+url+'"  <-- ovo sam izbacio
        var iframeHTML = '<iframe id="'+iFrameID+'" name="'+iFrameID+'" style="'+iframeStyle+'" onLoad="processMultipartResponse("'+inIFrameID+'");"><\/iframe>';

        //Put iframe in container and append to any div in page
        if (!document.getElementById(divID))
        {
            tmpDiv = document.createElement("div");
            tmpDiv.setAttribute('id', divID);
            tmpDiv.setAttribute('style', divStyle);
            tmpDiv.innerHTML = iframeHTML;
            document.getElementsByTagName('DIV')[0].appendChild(tmpDiv);
        }
        else
        {
           document.getElementById(divID).innerHTML = iframeHTML;
        }

        iframeObj = document.getElementById(iFrameID);
    }

    //return iframeObj;

} //eof createIframe

function getContentDocument(inIFrameObj)
{
  if (inIFrameObj.contentDocument) // For NS6
  {
    // debug('<b>getContentDocument</b>:contentDocument');
    return(inIFrameObj.contentDocument);
  }
  else if (inIFrameObj.contentWindow) // For IE5.5 and IE6
  {
    // debug('<b>getContentDocument</b>:contentWindow');
    return(inIFrameObj.contentWindow.document);
  }
  else if (inIFrameObj.document) // For IE5
  {
    // debug('<b>getContentDocument</b>:document');
    return(inIFrameObj.document);
  }
 else
  {
    // debug('<b>getContentDocument</b>:undefined');
    return(undefined);
  }
}

