import { create } from 'zustand';

interface SidebarStore {
  unfoldable: boolean;
  sidebarShow: boolean;
  sidebarUnfoldable: () => void;
  toggleSidebarShow: (visible: boolean) => void;
}

const useSidebarStore = create<SidebarStore>((set) => ({
  unfoldable: false,
  sidebarShow: true,
  sidebarUnfoldable: () => set((state) => ({ unfoldable: !state.unfoldable })),
  toggleSidebarShow: (visible: boolean) =>
    set((state) => ({ sidebarShow: visible })),
}));

export default useSidebarStore;
