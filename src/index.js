import "bootstrap/dist/css/bootstrap.css";
import { debug } from "util";

const url = "https://dueinator.dk/CA2/api/";
const urlZipCodes = url + "City/AllZips";
const zipCodesFetched = fetchZipCodes();
const whatChoices = ["Company", "Person", "Hobby", "City"];
const companyChoices = ["Phone", "CVR", "Employee Count", "Email", "All", "City", "Address", "Market Value"];
const personChoices = ["Phone", "Hobby", "City", "Email", "All", "Address"];
const hobbyChoices = ["Name", "All"]; // TODO: All return entity not DTO
const cityChoices = ["Zip", "All Cities"];
var what = document.getElementById("select");
var how = document.getElementById("how");
var input = document.getElementById("input");
var fetchButton = document.getElementById("fetchButton");
var dataDiv = document.getElementById("data");
var clearData = document.getElementById("clearData");

what.innerHTML = choicesToHTML(whatChoices);
what.addEventListener("change", addChoicesToHow);
how.innerHTML = choicesToHTML(companyChoices);
how.addEventListener("change", setInputField);
setInputField();
fetchButton.addEventListener("click", fetchData);
clearData.addEventListener("click", clearData);

function clearData() {
    dataDiv.innerHTML = "<h1>Data has been cleared</h1>";
}

function addChoicesToHow() {
    var selectedWhat = what.value;
    switch (selectedWhat) {
        case "Company":
            how.innerHTML = choicesToHTML(companyChoices);
            break;
        case "Person":
            how.innerHTML = choicesToHTML(personChoices);
            break;
        case "Hobby":
            how.innerHTML = choicesToHTML(hobbyChoices);
            break;
        case "City":
            how.innerHTML = choicesToHTML(cityChoices);
            break;
        default:
            alert("Something went wrong, please try again or reload page (F5)");
            break;
    }
    setInputField();
}

function choicesToHTML(choices) {
    return choices.map(choice => "<option value=\"" + choice + "\">" + choice + "</option>");
}

function setInputField() {
    input.innerHTML = getInputFieldHTML();
}

function getInputFieldHTML() {
    var selectedHow = how.value;
    switch (selectedHow) {
        case "Phone":
            return "<input id=\"inputField\" type=\"text\">";
        case "CVR":
            return "<input id=\"inputField\" type=\"number\">";
        case "Employee Count":
            return "<input id=\"inputField\" type=\"number\">";
        case "Email":
            return "<input id=\"inputField\" type=\"email\">";
        case "All":
            return "<input type=\"text\" disabled=\"disabled\">";
        case "City":
            return "<input id=\"inputField\" type=\"number\">";
        case "Address":
            return "<input id=\"inputField\" type=\"text\">";
        case "Market Value":
            return "<input id=\"inputField\" type=\"number\">";
        case "Hobby":
            return "<input id=\"inputField\" type=\"text\">";
        case "Name":
            return "<input id=\"inputField\" type=\"text\">";
        case "Zip":
            return "<select id=\"inputField\" class=\"mdb-select md-form\">" + zipCodesFetched + "</select>";
        case "All Cities":
            return "<inpu type=\"text\" disabled=\"disabled\">";
        default:
            alert("Something went wrong, please try again or reload page (F5)");
            return "<input type=\"text\" disabled=\"disabled\">";
    }
}

function fetchZipCodes() {
    var html = "";
    fetch(urlZipCodes).then(res => res.json()).then(json => html += "<option value=\"" + json.zipCode + "\">" + json.zipCode + "</option>");
    return html;
}

function fetchData() {
    var whatValue = what.value;
    var howValue = how.value.replace(" ", "");
    var inputValue = document.getElementById("inputField");
    var newUrl = "";
    if (inputValue === null) {
        newUrl = url + whatValue + "/" + howValue;
    } else {
        newUrl = url + whatValue + "/" + howValue + "/" + inputValue.value;
    }
    fetch(newUrl).then(res => res.json()).then(json => dataDiv.innerHTML = jsonToHTML(json, whatValue));
}

function jsonToHTML(json, whatValue) {
    switch (whatValue) {
        case "Company":
            return companyToHTML(json);
        case "Person":
            return personToHTML(json);
        case "Hobby":
            return hobbyToHTML(json);
        case "City":
            return cityToHTML(json);
        default:
            alert("Something went wrong, please try again or reload page (F5)");
            break;
    }
}

function companyToHTML(json) {
    var html = json;
    return html;
}

function personToHTML(json) {
    var html = json;
    return html;
}

function hobbyToHTML(json) {
    var html = json.map(hobby => "<li>Hobby: " + hobby.name + " - Description: " + hobby.description + "</li>").join("");
    return "<ul>" + html + "</ul>";
}

function cityToHTML(json) {
    var html = json.map(city => "<li>City: " + city.city + " - Zip: " + city.zipCode + "</li>").join("");
    return "<ul>" + html + "</ul>";
}

//**************CRUD ************************************* */

const crud =  ["Create", "Update"]
const whatCRUD = ["Company", "Person", "Hobby"];
var choice = document.getElementById("selectCRUD");
var what1 = document.getElementById("createSel");
var input2 = document.getElementById("input2")
var btnCU = document.getElementById("btnCU");

choice.innerHTML = choicesToHTML(crud);
what1.innerHTML = choicesToHTML(whatCRUD);
what1.addEventListener("change", createInputFields);
setInputField2();
btnCU.addEventListener("click",postMethod);

function setInputField2() {
    input2.innerHTML = createInputFields();
}

//Den er stuck med Company inputsene.. 
function createInputFields() {
    var selectedCRUD = what1.value;
    console.log(selectedCRUD);
    var inputs = "";
    switch (selectedCRUD) {   
        case "Company":
            inputs += "<input id=\"cID\" class=\"form-control\" type=\"number\" placeholder=\"ID (Only for update)\">";
            inputs += "<input id=\"cName\" class=\"form-control\" type=\"text\" placeholder=\"Company name..\">";
            inputs += "<input id=\"cDesc\" class=\"form-control\" type=\"text\" placeholder=\"Company description..\">";
            inputs += "<input id=\"cCVR\" class=\"form-control\" type=\"number\" value=\"70000601\">";
            inputs += "<input id=\"cNumOfEmp\" class=\"form-control\" type=\"number\" placeholder=\"Amount of employees..\">";
            inputs += "<input id=\"cMarketValue\" class=\"form-control\" type=\"number\" placeholder=\"Market value..\">";
            inputs += "<input id=\"cEmail\" class=\"form-control\" type=\"text\" placeholder=\"Email\">";
            inputs += "<input id=\"cPhone\" class=\"form-control\" type=\"number\" placeholder=\"Phone number\">";
            inputs += "<input id=\"cAddress\" class=\"form-control\" type=\"text\" placeholder=\"Address\">";
            return inputs;
        case "Person":
            inputs += "<input id=\"pID\" type=\"number\" placeholder=\"ID (Only for update)\">";
            inputs += "<input id=\"pFName\" type=\"text\"> <br>";
            inputs += "<input id=\"pLName\" type=\"text\"> <br>";
            inputs += "<input id=\"pHobby\" type=\"text\"> <br>";
            inputs += "<input id=\"pEmail\" type=\"text\"> <br>";
            inputs += "<input id=\"pPhone\" type=\"number\"> <br>";
            inputs += "<input id=\"pAdress\" type=\"text\"> <br>";
            return inputs;
        case "Hobby":
            inputs += "<input id=\"hID\" type=\"number\" placeholder=\"ID (Only for update)\">";             
            inputs += "<input id=\"hName\" type=\"text\" placeholder=\"Write the name here..\">";
            inputs += "<input id=\"hDesc\" type=\"text\"> placeholder=\"Write the desc here..\"";
            return inputs;
        default:
            alert("Something went wrong, please try again or reload page (F5)");
            return "<input type=\"text\" disabled=\"disabled\">";
    }
}

function postMethod() {
    var data = "";
    var alertMessage = "";
    var method = '';
    const chosenValue = what1.value;
    if(choice.value === "Create") {
        data = createData;
        method = "POST"
        var alertMessage = "Entity has been created"
    } else {
        data = updateData;
        method = 'PUT'
        var alertMessage = "Entity has been updated"
    }
    fetch(url.concat(chosenValue), {
        method: method,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then((res) => res.json()).then((data) => {
        console.log('data from post', data);        
        alertMessage(alertMessage);
    }).catch(error => console.log(error));
}

function createData() {
    var selectedEntity = what1.value;
    switch(selectedEntity) {
        case "Hobby":
            var hName = document.getElementById("hName");
            var hDesc = document.getElementById("hDesc");
            var hData = {hName, hDesc}
            return hData;
        case "Company":
            var cName = document.getElementById("cName");
            var cDesc = document.getElementById("cDesc");
            var cCVR = document.getElementById("cCVR");
            var cNumOfEmp = document.getElementById("cNumOfEmp");
            var cMarketValue = document.getElementById("cMarketValue");
            var cEmail = document.getElementById("cEmail");
            var cPhone = document.getElementById("cPhone");
            var cAddress = document.getElementById("cAddress");
            var cData = {cName, cDesc, cCVR, cNumOfEmp, cMarketValue, cEmail, cPhone, cAddress};
            return cData;
        case "Person":
            var pFName = document.getElementById("pFName");
            var pLName = document.getElementById("pLName");
            var pHobby = document.getElementById("pHobby");
            var pEmail = document.getElementById("pEmail");
            var pPhone = document.getElementById("pPhone");
            var pAddress = document.getElementById("pAddress");
            var pData = {pFName, pLName, pHobby, pEmail, pPhone, pAddress}
            return pData;
    }
}

function updateData() {
    var selectedEntity = what1.value;
    switch(selectedEntity) {
        case "Hobby":
            var hId;
            var hName = document.getElementById("hName");
            var hDesc = document.getElementById("hDesc");
            var hData = {hId, hName, hDesc}
            return hData;
        case "Company":
            var cId;
            var cName = document.getElementById("cName");
            var cDesc = document.getElementById("cDesc");
            var cCVR = document.getElementById("cCVR");
            var cNumOfEmp = document.getElementById("cNumOfEmp");
            var cMarketValue = document.getElementById("cMarketValue");
            var cEmail = document.getElementById("cEmail");
            var cPhone = document.getElementById("cPhone");
            var cAddress = document.getElementById("cAddress");
            var cData = {cName, cDesc, cCVR, cNumOfEmp, cMarketValue, cEmail, cPhone, cAddress};
            return cData;
        case "Person":
            var pId;
            var pFName = document.getElementById("pFName");
            var pLName = document.getElementById("pLName");
            var pHobby = document.getElementById("pHobby");
            var pEmail = document.getElementById("pEmail");
            var pPhone = document.getElementById("pPhone");
            var pAddress = document.getElementById("pAddress");
            var pData = {pFName, pLName, pHobby, pEmail, pPhone, pAddress}
            return pData;
    }
}//************DELETE ********************************/
var selectDelete = document.getElementById("selectDelete");
var deleteID = document.getElementById("deleteID");
var urlDelete = ""
selectDelete.innerHTML = choicesToHTML(whatCRUD);


function deleteEntity() {
    const selectedID = deleteID.value;
    const entityToDelete = selectDelete.value; 
    fetch(url + entityToDelete + "/delete/id=" + selectedID, { method: 'DELETE' }).then(res => res.json()).then((data) => {
        getAllPersons();
    }).catch(error => console.log(error));
}