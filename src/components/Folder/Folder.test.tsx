import { getByTestId, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FolderItem, ItemType } from '../../interfaces';
import Folder from './Folder';

const singleFolder: FolderItem = {
  id: '1',
  name: 'node_modules',
  type: ItemType.FOLDER,
  members: [],
};

const nestedFolders: FolderItem = {
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
};

describe('Folder Component', () => {
  it('should render a single folder correctly', () => {
    render(<Folder folder={singleFolder} depth={0} />);

    const folder = screen.getByRole('treeitem', { name: singleFolder.name });
    expect(folder).toBeInTheDocument();

    const folderIcon = getByTestId(folder, 'folder-icon');
    expect(folderIcon).toBeInTheDocument();
    expect(folderIcon).toHaveAttribute('data-icon', 'folder');

    userEvent.click(folderIcon);
    expect(folderIcon).not.toHaveAttribute('data-icon', 'folder-open');
  });

  it('should render a nested folder correctly', async () => {
    render(<Folder folder={nestedFolders} depth={0} />);

    expect(screen.getAllByRole('treeitem')).toHaveLength(1);
    const folder = screen.getByRole('treeitem', { name: nestedFolders.name });
    expect(folder).toBeInTheDocument();

    const folderIcon = getByTestId(folder, 'folder-icon');
    expect(folderIcon).toBeInTheDocument();
    expect(folderIcon).toHaveAttribute('data-icon', 'folder');

    userEvent.click(folderIcon);
    await waitFor(() => expect(folderIcon).toHaveAttribute('data-icon', 'folder-open'));

    expect(screen.getAllByRole('treeitem')).toHaveLength(3);
    const binFolder = screen.getByRole('treeitem', { name: nestedFolders.members[0].name });
    expect(binFolder).toBeInTheDocument();
    const viteFolder = screen.getByRole('treeitem', { name: nestedFolders.members[1].name });
    expect(viteFolder).toBeInTheDocument();

    const binFolderIcon = getByTestId(binFolder, 'folder-icon');
    userEvent.click(binFolderIcon);

    await waitFor(() => expect(binFolderIcon).toHaveAttribute('data-icon', 'folder-open'));

    expect(screen.getAllByRole('treeitem')).toHaveLength(5);
    const acronFile = screen.getByRole('treeitem', { name: 'acron' });
    expect(acronFile).toBeInTheDocument();
    expect(getByTestId(acronFile, 'file-icon')).toBeInTheDocument();

    const browserslistFile = screen.getByRole('treeitem', { name: 'browserslist' });
    expect(browserslistFile).toBeInTheDocument();
    expect(getByTestId(browserslistFile, 'file-icon')).toBeInTheDocument();

    userEvent.click(folderIcon);
    await waitFor(() => expect(screen.getAllByRole('treeitem')).toHaveLength(1));

    userEvent.click(folderIcon);
    await waitFor(() => expect(screen.getAllByRole('treeitem')).toHaveLength(3));
  });
});
