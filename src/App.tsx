import { Item, ItemType } from './interfaces';
import File from './components/File';
import Folder from './components/Folder';

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

function App() {
  // preparation state

  return (
    <div style={{ paddingLeft: '40px', paddingTop: '24px' }}>
      <h1>Explorer</h1>
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
