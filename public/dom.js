document.addEventListener("DOMContentLoaded", function () {
  const selectStoryButtons =
    document.getElementsByClassName("selectStoryButton");

  if (selectStoryButtons.length === 0) {
    console.error("No elements found with the class 'selectStoryButton'");
    return;
  }

  for (let i = 0; i < selectStoryButtons.length; i++) {
    selectStoryButtons[i].addEventListener("click", function (event) {
      const selectedStory = event.target.textContent.trim();

      // Make a Fetch request to the "/select-story" route
      fetch(
        `/stories-routes/select-story?story_name=${encodeURIComponent(
          selectedStory
        )}`
      )
        .then((response) => {
          window.location.href = response.url;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }
});
