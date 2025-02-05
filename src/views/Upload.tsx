// Upload.tsx
import {useState} from 'react';
import useForm from '../hooks/formHooks';
import {useFile, useMedia} from '../hooks/apiHooks';
// import {useNavigate} from 'react-router';

const Upload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState('');
  const [file, setFile] = useState<File | null>(null);
  // const navigate = useNavigate();
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const initValues = {
    title: '',
    description: '',
  };

  const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };

  const doUpload = async () => {
    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      if (!file || !token) {
        return;
      }
      // upload the file to fileserver
      const uploadResult = await postFile(file, token);
      // post metadata to media api server
      await postMedia(uploadResult, inputs, token);
      // navigate('/');
      // or notify user & clear inputs
      setUploadResult('File uploaded successfully.');
      resetForm();
    } catch (error) {
      console.log((error as Error).message);
      setUploadResult((error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const {handleSubmit, handleInputChange, inputs, setInputs} = useForm(
    doUpload,
    initValues,
  );

  const resetForm = () => {
    setInputs(initValues);
    setFile(null);
  };
  return (
    <>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            value={inputs.title}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            value={inputs.description}
          ></textarea>
        </div>
        <div>
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            // handle the reset in the file name
          />
        </div>
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : 'https://place-hold.it/200?text=Choose+image'
          }
          alt="preview"
          width="200"
        />
        <button
          type="submit"
          disabled={
            file && inputs.title.length > 3 && inputs.description.length > 0
              ? false
              : true
          }
        >
          {' '}
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        <button type="reset" onClick={resetForm}>Reset</button>
        <p>{uploadResult}</p>
      </form>
    </>
  );
};

export default Upload;
