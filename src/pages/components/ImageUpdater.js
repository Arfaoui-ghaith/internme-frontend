import React, {useCallback, useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`

import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import { useAuthState } from './../../context/auth'

// Register the plugins
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileEncode)

// Our app
function ImageUpdater({showImage,handleCloseImage,setData,data}) {
    const [file, setFile] = useState(null);

    const {user} = useAuthState();


    const updateImage = () => {
        toast.promise(
            axios({
                    method: 'post',
                    url:'https://internme-backend.herokuapp.com/api/users/me',
                    data: file,
                    headers:{
                        'Authorization': `${user}`
                    }
                })
                .then(res => setData({...data,image: res.data.image})),
            {
                loading: 'Loading...',
                success: 'Success',
                error: (err) => err.response.data.message,
            }
        )
    }

    return (
        <>
            <Modal show={showImage} onHide={handleCloseImage}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="App">
                        <FilePond
                            allowMultiple={false}
                            name="photo"
                            server={{
                                process:(fieldName, file, metadata, load, error, progress, abort, transfer, options) => {

                                    // fieldName is the name of the input field
                                    // file is the actual file object to send
                                    const formData = new FormData();
                                    formData.append(fieldName, file, file.name);

                                    setFile(formData)

                                    const request = new XMLHttpRequest();
                                    request.open('POST', 'https://internme-backend.herokuapp.com/api/users/fakeImage', );


                                    // Should call the progress method to update the progress to 100% before calling load
                                    // Setting computable to false switches the loading indicator to infinite mode
                                    request.upload.onprogress = (e) => {
                                        progress(e.lengthComputable, e.loaded, e.total);
                                    };

                                    // Should call the load method when done and pass the returned server file id
                                    // this server file id is then used later on when reverting or restoring a file
                                    // so your server knows which file to return without exposing that info to the client
                                    request.onload = function() {
                                        if (request.status >= 200 && request.status < 300) {
                                            // the load method accepts either a string (id) or an object
                                            load(request.responseText);
                                        }
                                        else {
                                            // Can call the error method if something is wrong, should exit after
                                            error('oh no');
                                        }
                                    };

                                    request.send(formData);

                                    // Should expose an abort method so the request can be cancelled
                                    return {
                                        abort: () => {
                                            // This function is entered if the user has tapped the cancel button
                                            request.abort();

                                            // Let FilePond know the request has been cancelled
                                            abort();
                                        }
                                    };
                                }
                            }}
                            labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseImage}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {handleCloseImage(); updateImage();} }>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Toaster
                position="top-center"
            />
        </>

    )
}

export default ImageUpdater;