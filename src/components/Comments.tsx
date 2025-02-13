import {MediaItemWithOwner} from 'hybrid-types/DBTypes';
import {useUserContext} from '../hooks/contextHooks';
import useForm from '../hooks/formHooks';
import {useCommentStore} from '../store';
import {useEffect, useRef} from 'react';
import {useComment} from '../hooks/apiHooks';

const Comments = ({item}: {item: MediaItemWithOwner}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const user = useUserContext();
  const {comments, setComments} = useCommentStore();
  const {postComment, getCommentsByMediaId} = useComment();

  const initValues = {comment_text: ''};

  const doComment = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    // TODO: try & catch, user notification
    await postComment(inputs.comment_text, item.media_id, token);
    // update comments after post
    getComments();

    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setInputs(initValues);
  };

  const {handleSubmit, handleInputChange, inputs, setInputs} = useForm(
    doComment,
    initValues,
  );

  const getComments = async () => {
    try {
      const comments = await getCommentsByMediaId(item.media_id);
      setComments(comments);
    } catch (error) {
      setComments([]);
      console.error((error as Error).message);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      {user && (
        <form
          className="mb-4 flex flex-col items-center justify-center rounded-md bg-sky-200 p-2"
          onSubmit={handleSubmit}
        >
          <div className="m-2 flex w-4/5 flex-col p-2">
            <label htmlFor="comment_text">Post a comment</label>
            <input
              className="my-2.5 rounded-md border-1 p-2.5"
              name="comment_text"
              type="text"
              id="comment_text"
              onChange={handleInputChange}
              autoComplete="off"
              ref={inputRef}
              // value={inputs.username}
            />
          </div>
          <button
            disabled={!inputs.comment_text}
            className="my-4 block w-2/5 rounded-2xl bg-sky-300 py-2.5 transition-all duration-500 ease-in-out hover:bg-sky-500"
            type="submit"
          >
            Post
          </button>
        </form>
      )}
      {comments.length > 0 && (
        <>
          <h2>Comments</h2>
          <ul className="mb-4 rounded-md bg-sky-200 p-4">
            {comments.map((comment) => (
              <li className="border-b-1 p-2" key={comment.comment_id}>
                <span className="font-bold">{comment.username}</span>
                <span className="mx-1">
                  ({new Date(comment.created_at || '').toLocaleString('fi-FI')}
                  ):
                </span>
                <span className="ml-1">{comment.comment_text}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default Comments;
