var listOfValues = [];
var checkForFirstRun = 0;
var nodeElement = 1;
var totalServers = 0;
var selectedOption = "";
var listOfAttributesSelectedIndex = 1;
var listOfAttributesInDiv = [];

window.onload = function(){
	catchXml();
};

//get xml dat from xml file
var catchXml = function(){
					var xhttp = new XMLHttpRequest();
					xhttp.onreadystatechange = function(){
						if(this.readyState == 4 && this.status == 200){
								listOfAttributes = [
									'server-name',
									'database-name',
									'config'
								];
								listOfAttributesInDiv = listOfAttributes;
							loader(this, listOfAttributes);
						}
					};
					xhttp.open('GET','data.xml',true);
					xhttp.send();
 
				};

//get values from xml and add pass it to select maker
function loader(xml, listOfAttributes){
	var xmlDoc = xml.responseXML;
	var i = 0;	
	for(var j=0; j<listOfAttributes.length; j++){
		while(typeof(xmlDoc.getElementsByTagName(listOfAttributes[j] + nodeElement)[i].childNodes[0].nodeValue) !== undefined)
		{
			listOfValues.push(xmlDoc.getElementsByTagName(listOfAttributes[j] + nodeElement)[i].childNodes[0].nodeValue);
			try{
				if(xmlDoc.getElementsByTagName(listOfAttributes[j] + nodeElement)[i+1].childNodes[0].nodeValue === undefined){
				}
			}
			catch(e){	
				break;
			}
			i++;
			totalServers++;
		}	
		if(checkForFirstRun == 0)
		{
			listOfValues = [];
			var l = 1;
			while(typeof(xmlDoc.getElementsByTagName('server-name' + l)[0].childNodes[0].nodeValue) !== undefined)
			{
				listOfValues.push(xmlDoc.getElementsByTagName('server-name' + l)[0].childNodes[0].nodeValue);
				try{
					if(xmlDoc.getElementsByTagName('server-name' + (l+1))[0].childNodes[0].nodeValue === undefined){
					}
				}
				catch(e){	
					break;
				}
				l++;
			}
			checkForFirstRun = 1;			
			insertDiv(listOfValues);
			l = 1;
		}
		else
		{
			checkForFirstRun = 11;
			insertDiv(listOfValues);
		}
		listOfValues = [];
		i = 0;
	}	
}

//make select dropdown from the xml data passed in listofelements
function insertDiv(listOfElements){
	var div = document.getElementById("t");
	var select = document.createElement('select');	
	if(checkForFirstRun == 1){ 
		select.name = 'servers';
		select.id = 'servers';
	}
	if(checkForFirstRun == 11){ 
		select.name = listOfAttributesInDiv[listOfAttributesSelectedIndex];
		select.id = listOfAttributesInDiv[listOfAttributesSelectedIndex];
		checkForFirstRun = 1;
		listOfAttributesSelectedIndex++;
	}	
	checkForFirstRun = 2;
	for(var k=0; k<listOfElements.length; k++)
	{
		if(listOfElements[k] == selectedOption)
		{
			var option = new Option('text', 'value', false, true);		
			option.value = listOfElements[k];
			option.text = listOfElements[k];		
			select.appendChild(option);			
		}
		else
		{
			var option = new Option('text', 'value', false, false);		
			option.value = listOfElements[k];
			option.text = listOfElements[k];		
			select.appendChild(option);
		}
	}
	div.appendChild(select);
	if(checkForFirstRun == 2){
		checkForFirstRun = 3;
		changeInServer();
	}
}

//if the main node is changed... change the whole dropdown
function changeInServer(){
		document.getElementById('servers').addEventListener('change',function(){
			checkForFirstRun = 0;
			listOfAttributesSelectedIndex = 1;
			try{
				var e = document.getElementById("servers");
				selectedOption = e.options[e.selectedIndex].text;
				if(nodeElement <= totalServers){
					nodeElement = e.selectedIndex + 1;
					document.getElementById("t").innerHTML = "";		
					catchXml();	
				}
				else
				{
					nodeElement = 1;
				}
			}
			catch(e){}
		});	
	checkForFirstRun = 1;
}

//when submit button is clicked.. do things
function submitClicked(){
	var e = document.getElementById("servers");
	selectedOption = e.options[e.selectedIndex].text;	
	alert(selectedOption);	
	var e = document.getElementById("database-name");
	selectedOption = e.options[e.selectedIndex].text;	
	alert(selectedOption);
	var e = document.getElementById("config");
	selectedOption = e.options[e.selectedIndex].text;	
	alert(selectedOption);	
}

