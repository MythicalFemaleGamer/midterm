import { newBookmark,saveBookmarks } from "../data/bookmarks.js";


export default function addNew() {
  const wrapper = document.getElementById("wrapper");

  wrapper.innerHTML = `
    <div class="form-container">
      <h2>Add New Bookmark</h2>
      <form id="add-bookmark-form">
        <label for="bookmark-title">Bookmark Title</label>
        <input type="text" id="bookmark-title" required />

        <label for="bookmark-url">Bookmark URL</label>
        <input type="url" id="bookmark-url" placeholder="https://example.com" required />

        <label for="bookmark-category">Bookmark Category</label>
        <select id="bookmark-category" required>
          <option value="">-- Select a Category --</option>
          <option value="recipes">Recipes</option>
          <option value="reading">Reading</option>
          <option value="study tools">Study Tools</option>
          <option value="ttrpg resources">TTRPG Resources</option>
        </select>

        <button type="submit" class="submit-btn">Add Bookmark</button>
      </form>
    </div>
  `;

  const form = document.getElementById("add-bookmark-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Grab values from input fields
    const title = document.getElementById("bookmark-title").value.trim();
    const url = document.getElementById("bookmark-url").value.trim();
    const category = document.getElementById("bookmark-category").value;

    // Create new bookmark 
    const createdBookmark = {
      id: Date.now(),
      title: title,
      url: url,
      category: category,
    };

    // Add to  array
    newBookmark.push(createdBookmark);
    
    //saving to local
    saveBookmarks();
    
    // Add to "All" view
    window.location.hash = "all";
  });
}