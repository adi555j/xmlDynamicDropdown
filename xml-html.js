var listOfValues = [];
var checkForFirstRun = 0;
var nodeElement = 1;
var totalServers = 0;
var selectedOption = "";
var listOfAttributesSelectedIndex = 1;
var listOfAttributesInDiv = [];
var whereToInsert = '';
var xmlFilePath = '';

//get xml dat from xml file
var catchXml = function(){
					var xhttp = "";
					if (window.XMLHttpRequest) {
						xhttp = new XMLHttpRequest();
					} else {
						xhttp = new ActiveXObject("Microsoft.XMLHTTP");
					}
					xhttp.onreadystatechange = function(){
						if(this.readyState == 4 && this.status == 200){
							loader(this, listOfAttributesInDiv);
						}
					};
					xhttp.open('GET',xmlFilePath,true);
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
			while(typeof(xmlDoc.getElementsByTagName(listOfAttributes[0] + l)[0].childNodes[0].nodeValue) !== undefined)
			{
				listOfValues.push(xmlDoc.getElementsByTagName(listOfAttributes[0] + l)[0].childNodes[0].nodeValue);
				try{
					if(xmlDoc.getElementsByTagName(listOfAttributes[0] + (l+1))[0].childNodes[0].nodeValue === undefined){
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
	var div = document.getElementById(whereToInsert);
	var select = document.createElement('select');	
	if(checkForFirstRun == 1){ 
		select.name = listOfAttributesInDiv[0];
		select.id = listOfAttributesInDiv[0];
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
		document.getElementById(listOfAttributesInDiv[0]).addEventListener('change',function(){
			checkForFirstRun = 0;
			listOfAttributesSelectedIndex = 1;
			try{
				var e = document.getElementById(listOfAttributesInDiv[0]);
				selectedOption = e.options[e.selectedIndex].text;
				if(nodeElement <= totalServers){
					nodeElement = e.selectedIndex + 1;
					document.getElementById(whereToInsert).innerHTML = "";		
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

//data => xml tags ,  where to insert in html , xmlfilepath
function addXmlData(data, insertWhereInHtml, path){
	for(var i=0; i<data.length; i++){
		listOfAttributesInDiv.push(data[i]);
	}
	whereToInsert = insertWhereInHtml;
	xmlFilePath = path;
	catchXml();	
}

