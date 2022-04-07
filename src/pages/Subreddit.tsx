
import { useParams, useRouteData } from 'solid-app-router';
import { createResource, createSignal, createEffect } from 'solid-js';

import { getPosts } from '../fetch-reddit';

import PostView from '../components/PostView';

const fetcher = ({ subreddit, sort }) => getPosts(subreddit, sort);

export function Data({ params, location, navigate, data }) {
  const [postData] = createResource(
    { subreddit: params.id, sort: "hot" },
    fetcher
  );


  return postData;
}

export default function () {

  const sorts = ["new", "hot", "top", "controversial"];

  const [sort, setSort] = createSignal<Sort>('hot');

  const postData = useRouteData();
  const params = useParams();

  createEffect(() => {
    console.log("got here", params.id, postData());
  })

  return (
    <div>
      <div class="flex space-x-2 divide-x-2 divide-black">
        <For each={sorts}>
          {(sort) => <button onClick={() => setSort(sort)}>{sort}</button>}
        </For>
      </div>
      <For each={postData()}>{(post) => <PostView post={post}></PostView>}</For>
    </div>
  );
}