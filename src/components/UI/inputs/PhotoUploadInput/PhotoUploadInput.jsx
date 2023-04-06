import { useRef, useState } from 'react'
import { GalleryAdd } from '../../../svg.module'
import classes from './photo_upload_input.module.scss'


const PhotoUploadInput = ({ onFileChange }) => {
    const [picUrl, setPicUrl] = useState(null)
    const fileInputRef = useRef(null)

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
          onFileChange(event.target.files[0])
          setPicUrl(URL.createObjectURL(event.target.files[0]))
        }
      }

    return (
        <div className={classes.photo_upload}>
            <input
                type='file'
                accept='image/*'
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            <div className={classes.upload} onClick={handleUploadClick} style={{
                
            }}>
                { picUrl !== null ? <img src={picUrl} /> : <GalleryAdd/>  }
            </div>
    </div>
  )
}

export { PhotoUploadInput }