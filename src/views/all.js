import { newBookmark, saveBookmarks } from "../data/bookmarks.js";

// track  search term
let searchTerm = "";

export default function all() {
  const wrapper = document.getElementById("wrapper");

  // change everything to lower case and searches using the term
  const filteredBookmarks = newBookmark.filter((item) => {
    const term = searchTerm.toLowerCase().trim();
    return (
      item.title.toLowerCase().includes(term) ||
      item.url.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term)
    );
  });

  // view
  wrapper.innerHTML = `
    <div class="bookmarks-container">
      <h2>All Bookmarks</h2>

   
      <div class="search-section">
        <label for="search-input">Search Bookmarks:</label>
        <input 
          type="text" 
          id="search-input" 
          placeholder="Search by title, URL, or category..." 
          value="${searchTerm}" 
        />
      </div>

      ${
        filteredBookmarks.length === 0
          ? `<p class="empty-state">${
              newBookmark.length === 0
                ? "Your list is empty :("
                : `No bookmarks found matching: "${searchTerm}", try again`
            }</p>`
          : `
            <ul class="bookmark-list">
              ${filteredBookmarks
                .map(
                  (item) => `
                <li class="bookmark-card">
                  <div class="bookmark-info">
                    <a href="${item.url}"  class="bookmark-title">
                      ${item.title}
                    </a>
                    <span class="bookmark-category">${item.category}</span>
                  </div>
                  <div class="bookmark-actions">
                    <button class="edit-btn" data-id="${item.id}">Edit</button>
                    <button class="delete-btn" data-id="${item.id}">Delete</button>
                  </div>
                </li>
              `
                )
                .join("")}
            </ul>
          `
      }
    </div>
  `;

  // search  focus
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    //keep focus and mouse location
    searchInput.focus();
    searchInput.setSelectionRange(searchTerm.length, searchTerm.length);

    searchInput.addEventListener("input", (e) => {
      searchTerm = e.target.value;
      all(); // update list
    });
  }

  // delete using id vs array position
  wrapper.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);
      const targetIndex = newBookmark.findIndex((item) => item.id === id);

      if (targetIndex !== -1) {
        newBookmark.splice(targetIndex, 1);
        saveBookmarks();
        all(); // update list
      }
    });
  });

  // edit button using unique id
  wrapper.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);
      const currentItem = newBookmark.find((item) => item.id === id);

      if (currentItem) {
        const newTitle = prompt("Enter new title:", currentItem.title);
        const newUrl = prompt("Enter new URL:", currentItem.url);

        // make sure they entered something
        if (newTitle && newUrl) {
          currentItem.title = newTitle;
          currentItem.url = newUrl;
          saveBookmarks();
          all(); //guess what we're updating?!
        }
      }
    });
  });
}