export enum ItemType {
  FOLDER,
  FILE,
}

export interface BaseItem {
  id: string;
  name: string;
  type: ItemType;
}

export interface FolderItem extends BaseItem {
  type: ItemType.FOLDER;
  members: Item[];
}

export interface FileItem extends BaseItem {
  type: ItemType.FILE;
  members?: never;
}

export type Item = FolderItem | FileItem;
