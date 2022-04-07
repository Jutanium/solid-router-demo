import { render } from 'solid-js/web';
import {
  createSignal,
  createEffect,
  createResource,
  createComputed,
} from 'solid-js';

import { getSubreddits, getPosts, Sort } from './fetch-reddit';

import 'virtual:windi.css';

import PostView from './components/PostView';

const sorts: Sort[] = ['hot', 'new', 'top', 'controversial'];

function App() {
  const [subredditData] = createResource<string>(getSubreddits);

  const [subreddit, setSubreddit] = createSignal('redditdev');
  const [sort, setSort] = createSignal<Sort>('hot');

  const fetchArguments = () => ({
    subreddit: subreddit(),
    sort: sort(),
  });

  const fetcher = ({ subreddit, sort }) => getPosts(subreddit, sort);

  const [postData, { mutate, refretch }] = createResource(
    fetchArguments,
    fetcher
  );

  return (
    <div>
      <div>
        <For each={subredditData()}>
          {(subreddit) => (
            <button
              class="m-2 font-semibold"
              onClick={() => setSubreddit(subreddit)}
            >
              {subreddit}
            </button>
          )}
        </For>
      </div>
      <div class="flex space-x-2 divide-x-2 divide-black">
        <For each={sorts}>
          {(sort) => <button onClick={() => setSort(sort)}>{sort}</button>}
        </For>
      </div>
      <For each={postData()}>{(post) => <PostView post={post}></PostView>}</For>
    </div>
  );
}

const appDiv = document.getElementById('app');

if (appDiv) {
  render(() => <App />, appDiv);
}
