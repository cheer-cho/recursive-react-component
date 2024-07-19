import { getByTestId, render, screen } from '@testing-library/react';
import File from './File';
import { ItemType } from '../../interfaces';

describe('File Component', () => {
  it('should render a file with correct name', () => {
    render(<File file={{ id: '1', name: 'test_file.json', type: ItemType.FILE }} depth={0} />);

    const file = screen.getByRole('treeitem', { name: 'test_file.json' });
    expect(file).toBeInTheDocument();

    const fileIcon = getByTestId(file, 'file-icon');
    expect(fileIcon).toBeInTheDocument();
    expect(fileIcon).toHaveAttribute('data-icon', 'file');
  });
});
