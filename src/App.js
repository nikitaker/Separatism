import './App.css';
import React from 'react';
import ImageUploading from 'react-images-uploading';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import axios from 'axios';



export default function App() {
const [image, setImage] = React.useState([]);
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImage(imageList[0]);
  };
  
    const handleSubmit = async(event) => {
    const formData = new FormData();
    formData.append("image", image);
    console.log(formData);
    try {
      const response = await axios({
        method: "post",
        url: "/api/upload/file",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch(error) {
      console.log(error)
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          ИАД Сепаратизм
        </p>
      </header>
          <div className="App">
      <ImageUploading
        multiple
        value={image}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
          errors
        }) => (
          <div className="upload_image-wrapper">
          
          {errors && <div>
    	 	 {errors.maxNumber && <Alert severity="error">Можно загруть одно изображение</Alert>}
   		 {errors.acceptType && <Alert severity="error">Формат файла не поддерживается</Alert>}
   		 {errors.maxFileSize && <Alert severity="error">Размер файла слишком большой</Alert>}
  		 {errors.resolution && <Alert severity="error">Невозможно обработать файл</Alert>}
 	  </div>}&nbsp;
 	  
          <div className="upload_drag-space" {...dragProps}>
          	{imageList.length > 0 ?
      		imageList.map((image, index) => ( <img key={index} src={image['data_url']} alt="" width="300"/>))
      		:
     		 isDragging ? "Положить сюда" : "Место для Drag and drop" }
    		</div>
    		&nbsp;
    		<div className="button-group">
    		<Button onClick={onImageUpload} variant="contained">Нажмите для выбора</Button>
    		&nbsp;
            	<Button onClick={onImageRemoveAll} variant="contained">Удалить изображение</Button>
            	</div>
            	&nbsp;
            	<Button onClick={handleSubmit} variant="contained" color="success" size="large">Загрузить</Button>
              </div>
            )}
      </ImageUploading>
    </div>
    </div>
    
  );
}

