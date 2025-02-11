import {ChangeEvent, useRef, useState} from 'react';
import useForm from '../hooks/formHooks';
import {useFile, useMedia} from '../hooks/apiHooks';
//import {useNavigate} from 'react-router';

const Upload = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadResult, setUploadResult] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  //const navigate = useNavigate();
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const initValues = {
    title: '',
    description: '',
  };

  const handleFileChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };

  const doUpload = async () => {
    setUploading(true);

    console.log(inputs);
    try {
      const token = localStorage.getItem('token');
      if (!file || !token) {
        return;
      }
      // upload the file to fileserver and post metadata to media api server
      const fileResult = await postFile(file, token);
      await postMedia(fileResult, inputs, token);

      // redirect to Home if you want
      //navigate('/');

      // OR notify user & clear inputs
      setUploadResult('Media file uploaded!');
      resetForm();
    } catch (e) {
      console.log((e as Error).message);
      setUploadResult((e as Error).message);
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
    // use fileRef to clear file input field after upload
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  return (
    <>
      <h1 className="p-4 text-center">Upload</h1>
      <form
        className="flex flex-col items-center justify-center rounded-md bg-sky-200 p-2"
        onSubmit={handleSubmit}
      >
        <div className="m-2 flex w-4/5 flex-col p-2 font-bold">
          <label htmlFor="title">Title</label>
          <input
            className="my-2.5 rounded-md border-1 p-2.5"
            name="title"
            type="text"
            id="title"
            onChange={handleInputChange}
            value={inputs.title}
          />
        </div>
        <div className="m-2 flex w-4/5 flex-col p-2 font-bold">
          <label htmlFor="description">Description</label>
          <textarea
            className="my-2.5 rounded-md border-1 p-2.5"
            name="description"
            rows={5}
            id="description"
            onChange={handleInputChange}
            value={inputs.description}
          ></textarea>
        </div>
        <div className="m-2 flex w-4/5 flex-col p-2 font-bold">
          <label htmlFor="file">File</label>
          <input
            className="my-2.5 rounded-md border-1 p-2.5"
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
            ref={fileRef}
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
          className="mt-6 block w-1/6 rounded-2xl bg-sky-300 py-2.5 transition-all duration-500 ease-in-out hover:bg-sky-500"
          type="submit"
          disabled={
            file && inputs.title.length > 3 && inputs.description.length > 0
              ? false
              : true
          }
        >
          {uploading ? 'Uploading..' : 'Upload'}
        </button>
        <button
          className="my-2 block w-1/6 rounded-2xl bg-sky-300 py-2.5 transition-all duration-500 ease-in-out hover:bg-sky-500"
          onClick={resetForm}
        >
          Reset
        </button>
        <p>{uploadResult}</p>
      </form>
    </>
  );
};

export default Upload;
