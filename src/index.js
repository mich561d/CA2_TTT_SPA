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

what.innerHTML = choicesToHTML(whatChoices);
what.addEventListener("change", addChoicesToHow);
how.innerHTML = choicesToHTML(companyChoices);
how.addEventListener("change", setInputField);
setInputField();
fetchButton.addEventListener("click", fetchData);

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
    var html = json;
    return html;
}

function cityToHTML(json) {
    var html = json.map(city => "<li>City: " + city.city + " - Zip: " + city.zipCode + "</li>").join("");
    return "<ul>" + html + "</ul>";
}