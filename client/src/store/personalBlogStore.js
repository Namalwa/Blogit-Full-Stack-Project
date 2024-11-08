import { create } from "zustand";

function personalBlogStore(set) {
    return {
        blogs: [],

        setBlogs: (blogs) => {
            set((state) => {
                return { blogs: blogs };

            });
        },
    };
}
const usePersonalBlogStore = create(personalBlogStore);
export default usePersonalBlogStore;