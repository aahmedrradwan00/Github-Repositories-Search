let theInput = document.querySelector(".get-repos input");

let getButton = document.querySelector(".get-button");

let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};

function getRepos() {
  if (theInput.value == "") {
    reposData.innerHTML = "<span>Please Enter Username</span>";
  } else {
    async function repo() {
      const response = await fetch(
        `https://api.github.com/users/${theInput.value}/repos`
      );
      const reposs = await response.json();
      reposData.innerHTML = "";

      reposs.forEach((repo) => {
        let mainDiv = document.createElement("Div");
        let repoName = document.createTextNode(repo.name);

        mainDiv.appendChild(repoName);

        let theUrl = document.createElement("a");

        let theUrlText = document.createTextNode("Visit");

        theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

        theUrl.setAttribute("target", "_blank");

        theUrl.appendChild(theUrlText);
        mainDiv.appendChild(theUrl);

        let starSpan = document.createElement("span");

        let starSpanText = document.createTextNode(
          `Stars ${repo.stargazers_count}`
        );

        starSpan.appendChild(starSpanText);
        mainDiv.appendChild(starSpan);

        mainDiv.className = "repo-box";

        reposData.appendChild(mainDiv);
      });
    }

    repo();
  }
}
