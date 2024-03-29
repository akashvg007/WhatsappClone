import React, { useState } from 'react'
import { Button } from '@material-ui/core';
import { DropzoneDialog } from 'material-ui-dropzone';
export default function Uploader() {

    const [open, setOpen] = useState(false);

    <div>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
            Add Image
        </Button>
    </div>
    return (
    <DropzoneDialog
        acceptedFiles={['image/*']}
        cancelButtonText={"cancel"}
        submitButtonText={"submit"}
        maxFileSize={5000000}
        open={open}
        onClose={() => setOpen(false)}
        onSave={(files) => {
            console.log('Files:', files);
            setOpen(false);
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
    />
    )
}