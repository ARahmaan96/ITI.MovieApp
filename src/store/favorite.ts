import {create} from 'zustand';

interface State {
  favorite: Movie[];
}

type StoreState = State & Actions;

interface Actions {
  addFavorite: (movie: Movie) => void;
  removeFavorite: (_id: string) => void;
  removeAllFavorite: () => void;
  isFavorite: (_id: string) => boolean;
}

const Store = create<StoreState>(set => ({
  favorite: [],
  removeFavorite: (_id: string) =>
    set(state => ({favorite: state.favorite.filter(m => m._id !== _id)})),

  addFavorite: (movie: Movie) =>
    set(state => ({favorite: [movie, ...state.favorite]})),

  isFavorite: (_id: string) => {
    const {favorite} = Store() as StoreState;
    return favorite.some((movie: Movie) => movie._id === _id) || false;
  },

  removeAllFavorite: () => set({favorite: []}),
}));

export default Store;
