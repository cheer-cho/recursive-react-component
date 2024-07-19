import { useState } from 'react';
import { faFolder } from '@fortawesome/free-regular-svg-icons';
import { faFolder as faSolidFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import File from '../File/File';
import { FolderItem, Item, ItemType } from '../../interfaces';

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

export default Folder;
