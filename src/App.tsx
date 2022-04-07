import {
  createSignal,
  createEffect,
  createResource,
  createComputed,
  lazy
} from 'solid-js';

import { getSubreddits, getPosts, Sort } from './fetch-reddit';

const About = lazy(() => import("./pages/About"));
const Subreddit = lazy(() => import('./pages/Subreddit'));

import { Routes, Route, Outlet, Link, NavLink, Navigate } from "solid-app-router";
import { Data as SubredditData } from './pages/Subreddit';

const sorts: Sort[] = ['hot', 'new', 'top', 'controversial'];

const [subredditData] = createResource<string>(getSubreddits);


export default function App() {
  return <div class="m-4">
    <h1 class="font-bold">My Crappy Reddit Client</h1>
    <nav class="flex space-x-2">
      <For each={subredditData()}>
        {(subreddit) => (
          <Link state={subreddit} href={`/subreddits/${subreddit}`}>{subreddit}</Link>
        )}
      </For>
    </nav>
    <Routes>
      <Route path="/about" element={<About />}></Route>
      <Route path="/subreddits">
        <Route path="/:id" element={<Subreddit />} data={SubredditData}></Route>
      </Route>
      <Route path='/' element={<div>whatever</div>}>

      </Route>
    </Routes>
  </div >
}
