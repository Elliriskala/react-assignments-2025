import {MediaItemWithOwner} from 'hybrid-types/DBTypes';

const SingleView = (props: {
  item: MediaItemWithOwner | undefined;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
}) => {
  const {item, setSelectedItem} = props;
  return (
    <>
      {item && (
        <dialog open>
          {item.media_type.includes('video') ? (
            <video controls src={item.filename}></video>
          ) : (
            <div>
              <img src={item.filename} alt={item.title} />
            </div>
          )}
          <button
            onClick={() => {
              setSelectedItem(undefined);
            }}
          >
            Close
          </button>
        </dialog>
      )}
      ;
    </>
  );
};

export default SingleView;
