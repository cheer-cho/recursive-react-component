import { faFile } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FileItem } from '../../interfaces';

const File = ({ file, depth }: { file: FileItem; depth: number }) => (
  <div role="treeitem" style={{ display: 'flex', alignItems: 'center', marginLeft: `${depth * 8}px` }}>
    <FontAwesomeIcon icon={faFile} data-testid="file-icon" />
    <div style={{ marginLeft: '8px' }}>{file.name}</div>
  </div>
);

export default File;
