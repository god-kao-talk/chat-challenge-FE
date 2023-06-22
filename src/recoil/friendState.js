import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const isFriendAddedState = atom({
  key: 'isFriendAddedState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
