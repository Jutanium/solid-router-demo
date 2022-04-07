import type { Post } from '../fetch-reddit';
import type { Component } from 'solid-js';

const PostView: Component<{ post: Post }> = (props) => {
  return (
    <div>
      <h2 innerHTML={props.post.title} />
    </div>
  );
};

export default PostView;
