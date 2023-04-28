document.getElementById("form-contato").addEventListener("submit", (evt) => {
  evt.preventDefault();
  const requiredFields = ["nome", "email", "mensagem"];
  let valid = true;
  let body = new FormData();
  requiredFields.forEach((field) => {
    document.querySelector(`[for="${field}"]`).classList.remove("error");
    document.querySelector(`[aria-error="${field}"]`).classList.remove("error");
    const element = document.getElementById(field);
    body.append(field, element.value);
    if (!element.value.trim()) {
      document.querySelector(`[for="${field}"]`).classList.add("error");
      document.querySelector(`[aria-error="${field}"]`).classList.add("error");
      valid = false;
    }
  });
  body.append("anexo", document.getElementById("anexo").files[0]);
  if (valid) {
    fetch("form.php", {
      method: "POST",
      body,
    }).then(async (res) => {
      const data = await res.json();
      document.querySelectorAll(".display").forEach((item, index) => {
        const html = Object.values(data)[index];
        if (html) {
          item.innerHTML = html;
          if (Object.keys(data)[index] === "anexo") {
            const splited = html.split("/");
            item.innerHTML = `<a target="_blank" href="${html}">${
              splited[splited.length - 1]
            }</a>`;
          }
        }
      });
    });
  }
});
