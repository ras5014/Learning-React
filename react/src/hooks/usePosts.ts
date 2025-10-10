/* During Data fetching, We have to handle 
 1. Loading state
 2. Error state
 3. Data state
 4. Cache data
 5. Race conditions,
    - Which will occur when multiple requests are made to the server. 
    - Scenario: If a user clicks on the next button multiple times,
      and while the first page api is fetching user clicked on next and now 2nd page loaded
      but then the first page api response comes back,
      then 2nd page will be overwritten by the first page data.
    - To handle this,
      We need to ensure that only the latest request is processed.
      We do that by using useRef
  6. Pagination state
     We will use useState and useEffect hooks to manage these states.
*/

import { useEffect, useState } from "react";
import { getPosts } from "../api/posts";

// 1. Define the Data Type
type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const usePosts = () => {
  // 2. Define the data, loading, error states
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getPosts();
      setData(response);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};
