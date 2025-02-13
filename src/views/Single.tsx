import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {NavigateFunction, useLocation, useNavigate} from 'react-router';
import Likes from '../components/likes';

const Single = () => {
  const navigate: NavigateFunction = useNavigate();
  const {state} = useLocation();
  const item: MediaItemWithOwner = state.item;
  return (
    <>
      <h2 className="m2 p-2 text-center">Title: {item.title}</h2>
      <p className="p-4 text-center">
        Date created: {new Date(item.created_at).toLocaleString('fi-FI')}
      </p>
      {item &&
        (item.media_type.includes('video') ? (
          <video
            className="m-auto h-1/7 w-1/4"
            controls
            src={item.filename}
          ></video>
        ) : (
          <div>
            <img
              className="m-auto h-1/4 w-1/4"
              src={item.filename}
              alt={item.title}
            />
          </div>
        ))}
      <Likes item={item} />
      <p className="p-4 text-center">Owner: {item.username}</p>
      <p className="p-4 text-center">Description: {item.description}</p>
      <p className="p-4 text-center">Media type: {item.media_type}</p>
      <p className="p-4 text-center">Filesize: {item.filesize}</p>
      <button
        className="w-20 rounded-2xl border-sky-400 bg-sky-300 p-2 text-center text-nowrap transition-all duration-300 ease-in-out hover:bg-sky-400"
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
