import { getByTestId, render, screen, within } from '@testing-library/react';
import { Item, ItemType } from './interfaces';
import App from './App';

const mockedTree: Item[] = [
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
describe('App component', () => {
  it('should render Folder and File correctly', () => {
    render(<App />);

    const tree = screen.getByRole('tree', { name: 'Explorer' });
    expect(tree).toBeInTheDocument();

    const treeItems = within(tree).getAllByRole('treeitem');
    expect(treeItems).toHaveLength(12);

    for (let i = 0; i < 3; i++) {
      expect(treeItems[i]).toHaveAccessibleName(mockedTree[i].name);
      expect(getByTestId(treeItems[i], 'folder-icon')).toBeInTheDocument();
    }

    for (let i = 3; i < treeItems.length; i++) {
      expect(treeItems[i]).toHaveAccessibleName(mockedTree[i].name);
      expect(getByTestId(treeItems[i], 'file-icon')).toBeInTheDocument();
    }
  });
});
