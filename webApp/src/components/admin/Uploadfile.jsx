import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Resize from 'react-image-file-resizer'

const Uploadfile = ({ form, setForm }) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleOnChange = (e) => {
        const files = e.target.files
        if (files) {
            setIsLoading(true)
            let allFiles = form.images
            for (let i = 0; i < files.length; i++) {
                console.log(files[i])

                const file = files[i]
                if (!file.type.startsWith('image/')) {
                    toast.error(`File ${file.name} is not an image`)
                    continue
                }
                // Image Resize
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (data)=>{

                    },
                    "base64"
                )
            }
        }
        console.log(e.target.files)
    }
    return (
        <div>
            <input type="file" name='images' multiple onChange={handleOnChange} />
        </div>
    )
}

export default Uploadfile