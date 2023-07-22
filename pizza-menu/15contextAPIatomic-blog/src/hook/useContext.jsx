import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { faker } from "@faker-js/faker";

function createRandomPost() {
    return {
        title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
        body: faker.hacker.phrase(),
    };
}

const PostContext = createContext()

export function useStateContext() {
    //custom hook
    const context = useContext(PostContext)
    if (context === undefined) throw new Error('PostContext was used outside of the ContextProvider')
    return context
}

export function ContextProvider({ children }) {
    const [posts, setPosts] = useState(() =>
        Array.from({ length: 30 }, () => createRandomPost())
    );
    const [searchQuery, setSearchQuery] = useState("");
    const [isFakeDark, setIsFakeDark] = useState(false);



    // Derived state. These are the posts that will actually be displayed
    const searchedPosts =
        searchQuery.length > 0
            ? posts.filter((post) =>
                `${post.title} ${post.body}`
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            )
            : posts;

    function handleAddPost(post) {
        setPosts((posts) => [post, ...posts]);
    }

    function handleClearPosts() {
        setPosts([]);
    }

    // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML 
    //element (see in "Elements" dev tool).
    useEffect(
        function () {
            document.documentElement.classList.toggle("fake-dark-mode");
        },
        [isFakeDark]
    );

    const value = useMemo(() => {
        return {
            posts: searchedPosts,
            onClearPosts: handleClearPosts,
            searchQuery,
            setSearchQuery,
            onAddPost: handleAddPost,
            isFakeDark,
            setIsFakeDark,
        }
    }, [isFakeDark, searchQuery, searchedPosts])

    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    );
}

