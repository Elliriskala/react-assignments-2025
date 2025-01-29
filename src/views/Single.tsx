import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {NavigateFunction, useLocation, useNavigate} from 'react-router';

const Single = () => {
  const navigate: NavigateFunction = useNavigate();
  const {state} = useLocation();
  const item: MediaItemWithOwner = state.item;
  return (
    <>
      <h3>Title: {item.title}</h3>
      <p>Date created: {new Date(item.created_at).toLocaleString('fi-FI')}</p>
      {item &&
        (item.media_type.includes('video') ? (
          <video controls src={item.filename}></video>
        ) : (
          <div>
            <img src={item.filename} alt={item.title} />
          </div>
        ))}
      ;
      <p>Owner: {item.username}</p>
      <p>Description: {item.description}</p>
      <p>Media type: {item.media_type}</p>
      <p>Filesize: {item.filesize}</p>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        go back
      </button>
    </>
  );
};

export default Single;
