function appendPreview(elt, progressbarElt, gallery) {
  let galleryElt = document.querySelector(`#${gallery}`);
  let progressBar = document.querySelector(`#${progressbarElt}`);
  if(elt.files) {
    while (galleryElt.firstChild) {
      galleryElt.removeChild(galleryElt.firstChild);
    }
    progressBar.style.display="inline-block";
    progressBar.value = 0;
    for(let idx = 0; idx < elt.files.length; idx++) {
      progressBar.value = 100/(elt.files.length-idx);
      const file = elt.files[idx];
      let reader = new FileReader();
      reader.onload = function(e) {
        let img = document.createElement("img")
        img.setAttribute("src", e.target.result);
        img.setAttribute("class", "preview");
        galleryElt.appendChild(img);
      }
      reader.readAsDataURL(file);
    }
    setTimeout(() => {
      progressBar.value=100;
      progressBar.style.display="none";
    }, 1000);
  }
}

function uploadLayout() {
  document.querySelector("#layout").click();
  return false;
}

function uploadComponents() {
  document.querySelector("#components").click();
  return false;
}

function previewLayout(elt) {
  appendPreview(elt, "layoutProgressBar", "layoutGallery");
}

function previewComponents(elt) {
  appendPreview(elt, "componentsProgressBar", "componentsGallery");
}

function validateForm() {
  const layout = document.querySelector("#layout").files;
  const components = document.querySelector("#components").files;
  return layout.length && components.length;
}