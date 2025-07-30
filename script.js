document.addEventListener("DOMContentLoaded", () => {
    const searchBox = document.getElementById("search-box");
    const suggestionsBox = document.getElementById("suggestions");
    const searchBtn = document.getElementById("search-btn");

    const elevator = document.getElementById("elevator");
    const manual = document.getElementById("manual");
    const comic = document.getElementById("comic");
    const error = document.getElementById("error");

    const suggestionsData = ["My Pitch", "User Manual", "Comic Strip"];

    function hideAll() {
        [elevator, manual, comic, error].forEach(sec => sec.classList.add("hidden"));
    }

    function searchContent() {
        const input = searchBox.value.toLowerCase();
        hideAll();
        if (input.includes("pitch")) {
            elevator.classList.remove("hidden");
        } else if (input.includes("manual")) {
            manual.classList.remove("hidden");
        } else if (input.includes("comic")) {
            comic.classList.remove("hidden");
        } else {
            error.classList.remove("hidden");
        }
    }

    function showSuggestions() {
        const query = searchBox.value.toLowerCase();
        suggestionsBox.innerHTML = "";
        if (!query) {
            suggestionsBox.style.display = "none";
            return;
        }
        const matches = suggestionsData.filter(item => item.toLowerCase().includes(query));
        if (matches.length) {
            suggestionsBox.style.display = "block";
            matches.forEach(match => {
                const div = document.createElement("div");
                div.classList.add("suggestion-item");
                div.textContent = match;
                div.onclick = () => {
                    searchBox.value = match;
                    suggestionsBox.style.display = "none";
                    searchContent();
                };
                suggestionsBox.appendChild(div);
            });
        } else {
            suggestionsBox.style.display = "none";
        }
    }

    searchBtn.addEventListener("click", searchContent);
    searchBox.addEventListener("input", showSuggestions);
    searchBox.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            searchContent();
            suggestionsBox.style.display = "none";
        }
    });
});
// CSS for suggestions box
const style = document.createElement('style');
style.textContent = `
    #suggestions {
        position: absolute;
        background: white;
        border: 1px solid #ccc;
        max-height: 150px;
        overflow-y: auto;
        display: none;
        z-index: 1000;
    }
    .suggestion-item {
        padding: 8px;
        cursor: pointer;
    }
    .suggestion-item:hover {
        background-color: #f0f0f0;
    }
`;