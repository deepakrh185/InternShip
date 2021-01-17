import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import "./Profile.css";

function Profile() {
  const [image, setimage] = useState(null);
  const [error, seterror] = useState(false);

  const changeHandler = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.size <= "5000000") {
      console.log(selected);
      let reader = new FileReader();
      reader.onloadend = () => {
        setimage(reader.result);
        seterror(false);
      };
      reader.readAsDataURL(selected);
    } else {
      seterror(true);
      console.log(error);
    }
  };
  return (
    <div className="profile">
      {error && <p>Image size should be less than 5mb</p>}
      <div className="profile__head">
        <Avatar src={image} className="profile__avatar" />
        <label htmlFor="fileupload" className="profile__label">
          Choose Image
        </label>
        <input
          className="profile__input"
          id="fileupload"
          type="file"
          onChange={changeHandler}
          accept="image/*"
        />
      </div>
      {/* {image ? <button onClick={() => setimage(null)}>Remove</button> : null} */}
    </div>
  );
}
export default Profile;