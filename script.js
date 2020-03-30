const input = document.querySelector("input");
const img = document.querySelector("img");
const username = document.getElementById("username");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const name = document.getElementById("name");
const loc = document.getElementById("location");
const href = document.getElementById("href");
const profile = document.getElementById("profile");

document.querySelector("#button").addEventListener("click", event => {
  profile.style.display = "none";
  if (/^\s*$/.test(input.value)) return;
  fetch("https://api.github.com/users/" + input.value)
    .then(result => statusCheck(result))
    .then(data => buildprofile(data))
    .catch(err => console.error(err));
});

function buildprofile(data) {
  img.src = data.avatar_url;
  username.textContent = data.login;
  followers.textContent = data.followers;
  following.textContent = data.following;
  name.textContent = data.name;
  loc.textContent = data.location ? data.location : "-----";
  href.href = data.html_url;
  profile.style.display = "flex";
}

function statusCheck(result) {
  
  if (result.status !== 200) {
    alert("Bad request\nPlease enter the valid Username");
    throw new Error("Bad request");
  }
  return result.json();
}
