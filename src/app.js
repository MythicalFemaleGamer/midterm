//imports
import all from "./views/all.js"
import addNew from "./views/addNew.js";

//error
function error() {
  document.getElementById("wrapper").innerHTML = "<h2>WHAT DID YOU DO?! QUICK HIT THE BACK BUTTON BEFORE IT'S TOO LATE!</h2>";
}

//hash nav

const routes = {
    "all": all,
    "addNew": addNew,

}

function router(){
    document.getElementById("wrapper").innerHTML="";

    const path = window.location.hash.slice(1) || "all";

    const viewHTML = routes[path] || error;
    viewHTML();
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);