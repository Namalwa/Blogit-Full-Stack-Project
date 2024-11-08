import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

function useStore(set) {
    return {
        user: null,

        setUser: function (userInformationObj) {
            set((_state) => {
                return { user: userInformationObj };
            });
            },

            logoutUser: function () {
                set((_state) => {
                    return { user: null };
                });
            },
        };
    }

    const useUserStore = create(
        devtools(persist(useStore, { name: "auth-storage"})),
);

export default useUserStore;
