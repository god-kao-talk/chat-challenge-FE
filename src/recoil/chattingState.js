import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const chattingState = atom({
    key: 'chattingState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});
