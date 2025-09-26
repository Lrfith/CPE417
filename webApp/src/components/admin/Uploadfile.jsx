// import React, { useState } from 'react'
// import { toast } from 'react-toastify'
// import Resize from 'react-image-file-resizer'
// import { uploadFile } from '../../api/cats'
// import useWebStore from '../../store/web-store'

// const Uploadfile = ({ form, setForm }) => {
//     const token = useWebStore((state) => state.token)
//     const [isLoading, setIsLoading] = useState(false)

//     const handleOnChange = (e) => {
//         const files = e.target.files
//         if (files) {
//             setIsLoading(true)
//             let allFiles = form.images
//             for (let i = 0; i < files.length; i++) {
//                 console.log(files[i])

//                 const file = files[i]
//                 if (!file.type.startsWith('image/')) {
//                     toast.error(`File ${file.name} is not an image`)
//                     continue
//                 }
//                 // Image Resize
//                 Resize.imageFileResizer(
//                     files[i],
//                     720,
//                     720,
//                     "JPEG",
//                     100,
//                     0,
//                     (data) => {
//                         uploadFile(token, data)
//                             .then((res) => {
//                                 console.log(res)
//                                 allFiles.push(res.data)
//                                 setForm({
//                                     ...form,
//                                     images: allFiles
//                                 })
//                                 console.log("Images being sent:", form.images)

//                                 toast.success('Upload image Sucess')
//                             })
//                             .catch((error) => {
//                                 console.log(error)
//                             })
//                     },
//                     "base64"
//                 )
//             }
//         }
//         console.log(e.target.files)
//     }
//     return (
{/* <div>
            <input
                type="file"
                name="images"
                multiple
                onChange={handleOnChange}
                disabled={isLoading}
            />
            {isLoading && <p>Uploading...</p>}
        </div> */}

//     )
// }

// export default Uploadfile

import React, { useState } from 'react'
import { toast } from 'react-toastify'
import Resize from 'react-image-file-resizer'
import { uploadFile } from '../../api/cats'
import useWebStore from '../../store/web-store'

const Uploadfile = ({ form, setForm }) => {
    const token = useWebStore((state) => state.token)
    const [isLoading, setIsLoading] = useState(false)

    const handleOnChange = (e) => {
        const files = e.target.files
        if (files) {
            setIsLoading(true)
            let allFiles = [...form.images] // copy state เดิม

            for (let i = 0; i < files.length; i++) {
                const file = files[i]

                if (!file.type.startsWith('image/')) {
                    toast.error(`File ${file.name} is not an image`)
                    continue
                }

                // ✅ Resize ก่อนอัพ
                Resize.imageFileResizer(
                    file,
                    720,
                    720,
                    'JPEG',
                    100,
                    0,
                    (data) => {
                        uploadFile(token, data)
                            .then((res) => {
                                console.log(res)
                                allFiles.push(res.data)
                                setForm({
                                    ...form,
                                    images: allFiles
                                })

                                toast.success('Upload image success')
                            })
                            .catch((error) => {
                                console.log(error)
                                toast.error('Upload image failed')
                            })
                            .finally(() => setIsLoading(false))
                    },
                    'base64'
                )
            }
        }
    }

    return (
        <div>
            <input
                type="file"
                name="images"
                multiple
                onChange={handleOnChange}
                disabled={isLoading}
            />
            {isLoading && <p>Uploading...</p>}
        </div>
    )
}

export default Uploadfile
