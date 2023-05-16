async function getApiList() {
  let response = await fetch("https://api.publicapis.org/entries");
  let data = await response.json();
  console.log(data);
  return data;
}

getApiList().then((data) => {
  document.body.innerHTML = `<div class="wrapper">
          ${displayApiCompo(data)}
          </div>`;
});

function displayApiCompo(data) {
  let apiCompHtml = data.entries.map((apiObj) => {
    let {
      API: api,
      Auth: auth,
      Category: category,
      HTTPS: https,
      Link: link,
      Description: description,
    } = apiObj;

    if (!auth) {
      auth = "noApiKey";
    }

    return `
    <div class="api-card">
        <h2 class="api-name"><a href="${link}" >${api}</a></h2>
        <h2 class="api-category"><a href="${link}">Category: ${category}</a></h2>
        <p class="auth-type" ><em>Auth:</em> ${auth}</p>
        <p class="https-support" ><em>Support https:</em> ${https.toString()}</p>
        <p class="api-body"><strong>Description:</strong> ${description}</p>
    </div>
    `;
  });
  return apiCompHtml.join("");
}
