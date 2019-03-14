import "bootstrap/dist/css/bootstrap.css";

const url = "https://dueinator.dk/CA2/api/";
const whatChoices = ["Company", "Person", "Hobby", "City"];
const companyChoices = ["Phone", "CVR", "Employee Count", "Email", "All", "City", "Address", "Market Value"];
const personChoices = ["Phone", "Hobby", "City", "Email", "All", "Address"];
const hobbyChoices = ["Name", "All"]; // TODO: All return entity not DTO
const cityChoices = ["Zip", "All Zips", "All Cities"];
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
            return "<input type=\"text\">";
        case "CVR":
            return "<input type=\"number\">";
        case "Employee Count":
            return "<input type=\"number\">";
        case "Email":
            return "<input type=\"email\">";
        case "All":
            return "<input type=\"text\" disabled=\"disabled\">";
        case "City":
            return "<input type=\"number\">";
        case "Address":
            return "<input type=\"text\">";
        case "Market Value":
            return "<input type=\"number\">";
        case "Hobby":
            return "<input type=\"text\">";
        case "Name":
            return "<input type=\"text\">";
        case "Zip":
            return "<input type=\"number\">";
        case "All Zips":
            return "<input type=\"text\" disabled=\"disabled\">";
        case "All Cities":
            return "<input type=\"text\" disabled=\"disabled\">";
        default:
            alert("Something went wrong, please try again or reload page (F5)");
            return "<input type=\"text\" disabled=\"disabled\">";
    }
}

function fetchData() {
    var whatValue = what.value;
    var howValue = how.value.replace(" ", "");
    var inputValue = input.value;
    alert("What:" + whatValue + "| How: " + howValue + "| Input: " + inputValue);
    var newUrl = "";
    if (inputValue === undefined) {
        newUrl = url + whatValue + "/" + howValue;
    } else {
        newUrl = url + whatValue + "/" + howValue + "/" + inputValue;
    }
    fetch(newUrl).then(res => res.json()).then(json => dataDiv.innerHTML = json);
}