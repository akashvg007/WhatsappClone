import React, { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import { Button } from '@mui/material';
import { uploadImages } from "../../Api/services";
import { CircularProgress } from "@mui/material";

export default function ImageUpload({ close, profilePic, setProfilePic }) {
    const [image, setImage] = useState(null);
    const [prev, setprev] = useState(profilePic);
    const [loader, setLoader] = useState(false);
    const [viewImage, setViewImage] = useState(false);


    const fileChangedHandler = (event) => {
        let fileInput = false;
        const file = event.target.files[0];
        if (file) {
            fileInput = true;
        }
        if (fileInput) {
            try {
                Resizer.imageFileResizer(
                    file,
                    300,
                    300,
                    "JPEG",
                    100,
                    0,
                    (uri) => {
                        console.log(uri);
                        setImage(uri);
                    },
                    "file",
                    200,
                    200
                );
            } catch (err) {
                console.log(err);
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = e => {
                setprev(reader.result)
            }
        }
    }

    const handleClick = async () => {
        if (!image) {
            alert("select an image to upload");
            return
        }
        setLoader(true)
        const body = new FormData();
        body.append('file', image)
        const result = await uploadImages(body);
        console.log("imageupload", result);
        setProfilePic(result?.url)
        setLoader(false)
        close(false)
    }

    const handleDobleClick = () => {
        setViewImage(!viewImage)
    }

    return (
        <div className="uploader-container">
            <div className="input-wrapper">
                <input type="file" onChange={fileChangedHandler} />
            </div>
            <div className="image-wrapper">
                <img src={prev} alt="" onTouchStart={handleDobleClick} onDoubleClick={handleDobleClick} width="auto" height="100%" />
            </div>
            <div className="btn-wrapper">
                <Button onClick={handleClick} variant="contained" color="success">Upload</Button>
                <Button onClick={() => close(false)} variant="contained" color="primary" >Cancel</Button>
            </div>
            {loader && <div className="loader">
                <CircularProgress />
            </div>}
            {
                viewImage && <div className="viewimage" onTouchStart={handleDobleClick} onDoubleClick={handleDobleClick}>
                    <img src={prev} alt="" width="auto" height="100%" />
                </div>
            }
        </div>
    );
}