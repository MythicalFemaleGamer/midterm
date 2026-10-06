import { newBookmark, saveBookmarks } from "../data/bookmarks.js";



export default function all() {
  const wrapper = document.getElementById("wrapper");

  // is the bitch empty?
  if (!newBookmark || newBookmark.length === 0) {
    wrapper.innerHTML = `
      <div class="empty-state">
        <p>No bookmarks yet!</p>
      </div>
    `;
    return;
  }



  // creating list view
  wrapper.innerHTML = `
    <div class="bookmarks-container">
      <h2>All Bookmarks</h2>
      <ul class="bookmark-list">
        ${newBookmark
          .map(
            (item, index) => `
          <li class="bookmark-card">
            <div class="bookmark-info">
              <a href="${item.url}" class="bookmark-title">
                ${item.title}
              </a>
              <span class="bookmark-category">${item.category}</span>
            </div>
            <div class="bookmark-actions">
              <button class="edit-btn" data-index="${index}">Edit</button>
              <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
          </li>
        `
          )
          .join("")}
      </ul>
    </div>
  `;

  // delete event listeners
  wrapper.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      newBookmark.splice(index, 1); // removing from  array
      saveBookmarks(); //update local
      all(); // updating list
    });
  });

  // edit event listeners
  wrapper.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      const currentItem = newBookmark[index];

      const newTitle = prompt("Enter new bookmark title:", currentItem.title);
      const newUrl = prompt("Enter new bookmark URL:", currentItem.url);

      if (newTitle && newTitle.trim() !== "" && newUrl && newUrl.trim() !== "") {
        currentItem.title = newTitle.trim();
        currentItem.url = newUrl.trim();
         saveBookmarks(); //update local
        all(); // updating list
      }
    });
  });
}