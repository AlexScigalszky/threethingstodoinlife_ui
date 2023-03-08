export interface Item {
  identifier: string;
  first: string;
  second: string;
  third: string;
  votes: number;
  userIdentifier: string;
  dones: {
    first: boolean | null;
    second: boolean | null;
    third: boolean | null;
    loading: boolean;
  };
  date: string;
}

export interface ItemStore extends Item {
  dones: {
    first: boolean | null;
    second: boolean | null;
    third: boolean | null;
    loading: boolean;
  };
}
