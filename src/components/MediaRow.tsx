import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {Link} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';

type MediaItemProps = {
  item: MediaItemWithOwner;
  setSelectedItem: (item: MediaItemWithOwner | undefined) => void;
};

const MediaRow = (props: MediaItemProps) => {
  const {user} = useUserContext();
  const {item} = props;

  return (
    <article className="m-auto mb-2 w-full rounded-md border-1 border-sky-400 bg-sky-200 p-6">
      <img
        className="h-72 w-full rounded-md object-cover"
        src={
          item.thumbnail ||
          (item.screenshots && item.screenshots[2]) ||
          undefined
        }
        alt={item.title}
      />
      <p className="mt-4 mb-4 max-w-full overflow-clip bg-sky-200 p-2 text-center font-bold text-nowrap text-ellipsis">
        {item.title}
      </p>
      <p className="max-w-full overflow-clip bg-sky-200 p-2 text-nowrap text-ellipsis">
        {item.description}
      </p>
      <p className="max-w-full overflow-clip bg-sky-200 p-2 text-nowrap text-ellipsis">
        {new Date(item.created_at).toLocaleString('fi-FI')}
      </p>
      <p className="max-w-full overflow-clip bg-sky-200 p-2 text-nowrap text-ellipsis">
        {item.filesize}
      </p>
      <p className="max-w-full overflow-clip bg-sky-200 p-2 text-nowrap text-ellipsis">
        {item.media_type}
      </p>
      <p className="max-w-full overflow-clip bg-sky-200 p-2 text-nowrap text-ellipsis">
        {item.username}
      </p>
      <p>
        <Link
          className="block m-auto mt-4 w-full cursor-pointer rounded-2xl bg-sky-300 p-2 text-center transition-all duration-300 ease-in-out hover:bg-sky-400"
          to="/single"
          state={{item}}
        >
          Show
        </Link>

        {(user?.user_id === item.user_id ||
          user?.level_name === 'Admin' && (
            <>
              <button
                onClick={() => {
                  console.log('Modify button clicked');
                }}
                className="m-auto mt-2 w-full cursor-pointer rounded-2xl bg-emerald-300 p-2 text-center text-nowrap transition-all duration-300 ease-in-out hover:bg-green-400"
              >
                Modify
              </button>
              <button
                onClick={() => {
                  console.log('Delete button clicked');
                }}
                className="m-auto mt-2 w-full cursor-pointer rounded-2xl bg-red-300 p-2 text-center text-nowrap transition-all duration-300 ease-in-out hover:bg-orange-400"
              >
                Delete
              </button>
            </>
          ))}
      </p>
    </article>
  );
};

export default MediaRow;
