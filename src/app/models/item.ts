export interface Item {
  identifier: string;
  first: string;
  second: string;
  third: string;
  favorites: number;
  userIdentifier: string;
  dones: {
    first: boolean | null;
    second: boolean | null;
    third: boolean | null;
  };
}

export interface ItemStore extends Item {
  dones: {
    first: boolean | null;
    second: boolean | null;
    third: boolean | null;
  };
}
