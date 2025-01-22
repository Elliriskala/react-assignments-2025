import {MediaItem} from 'hybrid-types/DBTypes';

const SingleView = (props: {
  item: MediaItem | undefined;
  setSelectedItem: (item: MediaItem | undefined) => void;
}) => {
  const {item, setSelectedItem} = props;
  return (
    <div>
      <dialog open>
        {item && (
          <>
            {item.media_type === 'image/jpeg' && (
              <div>
                <img src={item.filename} alt={item.title} />
              </div>
            )}
            {item.media_type === 'video/mp4' && (
              <video controls src={item.filename}></video>
            )}
          </>
        )}
        <button
          onClick={() => {
            setSelectedItem(undefined);
          }}
        >
          Close
        </button>
      </dialog>
    </div>
  );
};

export default SingleView;
