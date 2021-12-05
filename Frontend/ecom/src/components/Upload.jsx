import axios from "axios";
import React, { useState } from "react";

const Upload = () => {

    const [selectedFile, setSelectedFile]= useState()

    function changeHandler(event) {
        setSelectedFile(event.target.files[0]);
    
      };

    function handleSubmission() {

        const formData = new FormData();

        formData.append("image", selectedFile);
        formData.append("title", "kroytest")
        formData.append("description", "kroytest")
        formData.append("budget", 100.00)
        formData.append("quantity", 5)
        formData.append("collection", 1)
        formData.append("customer", 1)
        
        console.log(formData)
        axios.post("http://localhost:8000/store/image/",
            formData
        )
            .then((result) => {
                console.log("Success:", result);
            })
            .catch((error) => {
                console.error("Error:", error);
            });

    }

    return (
        <div>
        <div className="upload">
        <input type="file" name="file" className = "upload" onChange={changeHandler} />
        </div>
      
        <div>
          <div className="submit">
          <button className = "sub" onClick={handleSubmission}>Submit</button>
          </div>
          
        </div>
      </div>
    );
}

export default Upload;