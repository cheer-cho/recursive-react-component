import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder as faSolidFolder } from '@fortawesome/free-solid-svg-icons';
import { faFolder, faFile } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

enum ItemType {
  FOLDER,
  FILE,
}

interface BaseItem {
  id: string;
  name: string;
  type: ItemType;
}

interface FolderItem extends BaseItem {
  type: ItemType.FOLDER;
  members: Item[];
}

interface FileItem extends BaseItem {
  type: ItemType.FILE;
  members?: never;
}

type Item = FolderItem | FileItem;

const tree: Item[] = [
  {
    id: '1',
    name: 'node_modules',
    type: ItemType.FOLDER,
    members: [
      {
        id: '13',
        name: '.bin',
        type: ItemType.FOLDER,
        members: [
          { id: '14', name: 'acron', type: ItemType.FILE },
          { id: '15', name: 'browserslist', type: ItemType.FILE },
        ],
      },
      {
        id: '16',
        name: '.vite',
        type: ItemType.FOLDER,
        members: [
          {
            id: '17',
            name: 'deps_temp_42b67339',
            type: ItemType.FOLDER,
            members: [
              { id: '18', name: 'package.json', type: ItemType.FILE },
              { id: '19', name: 'react.js', type: ItemType.FILE },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'public',
    type: ItemType.FOLDER,
    members: [
      { id: '20', name: 'file_1', type: ItemType.FILE },
      { id: '21', name: 'file_2', type: ItemType.FILE },
      { id: '22', name: 'file_3', type: ItemType.FILE },
    ],
  },
  {
    id: '3',
    name: 'src',
    type: ItemType.FOLDER,
    members: [
      { id: '24', name: 'file_3', type: ItemType.FILE },
      { id: '25', name: 'file_4', type: ItemType.FILE },
      { id: '26', name: 'file_5', type: ItemType.FILE },
      { id: '27', name: 'file_6', type: ItemType.FILE },
      { id: '28', name: 'file_1', type: ItemType.FILE },
      { id: '29', name: 'file_2', type: ItemType.FILE },
    ],
  },
  { id: '4', name: '.eslintrc.cjs', type: ItemType.FILE },
  { id: '5', name: '.gitignore', type: ItemType.FILE },
  { id: '6', name: 'package-lock.json', type: ItemType.FILE },
  { id: '7', name: 'package.json', type: ItemType.FILE },
  { id: '8', name: 'README.md', type: ItemType.FILE },
  { id: '9', name: 'tsconfig.app.json', type: ItemType.FILE },
  { id: '10', name: 'tsconfig.json', type: ItemType.FILE },
  { id: '11', name: 'tsconfig.node.json', type: ItemType.FILE },
  { id: '12', name: 'vite.config.ts', type: ItemType.FILE },
];

const File = ({ file, depth }: { file: FileItem; depth: number }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginLeft: `${depth * 8}px` }}>
    <FontAwesomeIcon icon={faFile} />
    <div style={{ marginLeft: '8px' }}>{file.name}</div>
  </div>
);

const Folder = ({ folder, depth }: { folder: FolderItem; depth: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <div style={{ marginLeft: `${depth * 8}px` }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FontAwesomeIcon
          onClick={handleExpand}
          style={{ cursor: 'pointer' }}
          icon={isExpanded ? faFolder : faSolidFolder}
        />
        <div style={{ marginLeft: '8px' }}>{folder.name}</div>
      </div>
      {isExpanded &&
        folder.members?.map((member: Item) => (
          <div key={member.id}>
            {member.type === ItemType.FOLDER && <Folder folder={member} depth={depth + 1} />}
            {member.type === ItemType.FILE && <File file={member} depth={depth + 1} />}
          </div>
        ))}
    </div>
  );
};

function App() {
  // preparation state

  return (
    <div>
      {tree.map((item: Item) => (
        <div key={item.id}>
          {item.type === ItemType.FOLDER && <Folder folder={item} depth={0} />}
          {item.type === ItemType.FILE && <File file={item} depth={0} />}
        </div>
      ))}
    </div>
  );
}

export default App;
