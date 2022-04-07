type SubredditEntry = {
  display_name: string;
};

type HasData = {
  data: object;
};

export async function getSubreddits(): Promise<string[]> {
  //Returns 100 subreddits
  const response = await fetch(
    'https://www.reddit.com/subreddits.json?limit=100'
  );
  const responseObject = await response.json();
  console.log(responseObject);
  const subreddits = responseObject.data.children
    .map((child: HasData) => child.data)
    .map((child: SubredditEntry) => child.display_name);
  console.log(subreddits);
  return subreddits;
}

export type Sort = 'hot' | 'new' | 'top' | 'controversial';

export type Post = {
  title: string;
  url: string;
  thumbnail?: string;
  selftext_html?: string;
};
export async function getPosts(subreddit: string, sort: Sort): Promise<Post[]> {
  const response = await fetch(
    `https://www.reddit.com/r/${subreddit}/${sort}.json`
  );

  const responseObject = await response.json();
  const posts = responseObject.data.children.map(
    (child: HasData) => child.data
  );
  console.log(posts);
  return posts as Post[];
}
