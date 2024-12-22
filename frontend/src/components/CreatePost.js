/**
 * Acknowledgment of Assistance from ChatGPT:
For this project, I (sukh) sought assistance from OpenAI's ChatGPT to 
help clarify and explain the user story related to CommonMark and 
image links in posts. Specifically, ChatGPT provided a detailed explanation 
of how to approach the user story thay meets the requirements of the user story. No code was directly copied from ChatGPT, 
and I fully understand all the code and its functionality.
 */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { marked } from "marked"; // Import the Markdown library
import Header from "./Header";
const apiUrl = process.env.REACT_APP_API_URL

export default function CreatePost() {
  const [postContent, setPostContent] = useState(""); // For Markdown content
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [selectedImage, setSelectedImage] = useState(null); // To handle image uploads
  const [posttype, setPostType] = useState("post");
  const { authorId } = useParams();
  const navigate = useNavigate();
  const currentAuthorId = localStorage.getItem("currentAuthorId");
  const encodedAuthorFqid = encodeURIComponent(currentAuthorId);
  const subtitle = "Post Creation";

  const handlePostTypeChange = (event) => {
    setPostType(event.target.value);
    if (event.target.value === "image") {
      document.getElementById("post-content").hidden = true;
      document.getElementById("image-upload").hidden = false;
    }
    else {
      document.getElementById("post-content").hidden = false;
      document.getElementById("image-upload").hidden = true;
    }
  }

  const createPost = async (event) => {
    event.preventDefault();

    // Create FormData to include file (if any)
    const formData = new FormData();
    formData.append("title", postTitle);
    formData.append("content", postContent); // Markdown content
    formData.append("contentType", "text/markdown"); // Setting default type to Markdown
    formData.append("description", postDescription)
    formData.append("visibility", visibility);
    // formData.append("author", parseInt(authorId));

    // Append the image file if an image is selected
    if (selectedImage) {
      formData.set("content", selectedImage);
      formData.set("contentType", "image/jpeg;base64");
    }

    try {
      const response = await fetch(`${currentAuthorId}/posts/`, {
        method: "POST",
        headers: {
          "token": `${localStorage.getItem('token')}` // If a token is needed
        },
        body: formData, // Pass FormData directly
      });

      if (response.ok) {
        navigate(`/stream/${encodedAuthorFqid}`);
      } else {
        const error = await response.json();
        alert(JSON.stringify(error));
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post");
    }
  };


  // Handle cancel action
  const cancelPostCreation = () => {
    navigate(`/stream/${encodedAuthorFqid}`);
  };

  // Convert the Markdown content to HTML using "marked"
  const getMarkdownPreview = () => {
    return { __html: marked(postContent) };
  };

  return (
    <div className="create-post-page">
      <Header subtitle={subtitle} />
      <section id="create-post-window">
        <form className="form-container" onSubmit={createPost}>
          <div className="form-group">
            <select
              className="posttype-dropdown"
              id="posttype"
              value={posttype}
              onChange={handlePostTypeChange}
            >
              <option value="post">Markdown Post</option>
              <option value="image">Image Post</option>
              <option value="simple">Regular Post</option>
            </select>
            <input
              className="new-post-title"
              type="text"
              placeholder="Title"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              required
            />
            <input
              className="new-post-description"
              type="text"
              placeholder="Description"
              value={postDescription}
              onChange={(e) => setPostDescription(e.target.value)}
              required
            />
          </div>
          <textarea
            className="new-post-content"
            id="post-content"
            placeholder="Write your post content in Markdown..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          {/* Markdown Preview */}
          <div className="markdown-preview">
            <h3>Preview</h3>
            <div className="preview"
              dangerouslySetInnerHTML={getMarkdownPreview()} // Render the Markdown content as HTML 
            ></div>
          </div>
          <div>
            <label htmlFor="image-upload">Upload an image (optional):</label>
            <input
              id="image-upload"
              type="file"
              accept="image/jpeg"
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
          </div>
          <div className="new-post-visibility">
            <label htmlFor="visi">Visibility:</label>
            <select
              className="visibility-dropdown"
              id="visi"
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
            >
              <option value="public">Public</option>
              <option value="friends">Friend Only</option>
              <option value="unlisted">Unlisted</option>
            </select>
          </div>
          <div className="button-container">
            {/* Cancel button */}
            <button type="button" onClick={cancelPostCreation} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">Create</button>
          </div>
        </form>
      </section>

    </div>
  );
}
