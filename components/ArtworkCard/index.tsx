import { memo, useState, useCallback, useRef, useMemo, MouseEventHandler } from 'react';
import classNames from 'classnames';

import { Popover } from 'components/Popover';
import { PopoverOption } from 'components/Popover/components/PopoverItem';

import { useOnClickOutside } from 'utils';
import { Artwork } from 'types';

import { ReactComponent as VerticalDotsIcon } from 'assets/images/vertical-dots.svg';
import { ReactComponent as EditIcon } from 'assets/images/edit.svg';
import { ReactComponent as DeleteIcon } from 'assets/images/delete.svg';
import noArtworkIcon from 'assets/images/no-artwork.png';

import styles from './styles.module.scss';

const popoverOptions: PopoverOption[] = [
  { label: 'Edit', icon: EditIcon },
  { label: 'Delete', icon: DeleteIcon, className: styles.popover_delete_option },
];

type Props = {
  data: Artwork;
  onActionClick: (artwork: Artwork, selectedAction: PopoverOption) => void;
  onClick: (artwork: Artwork) => void;
};

export const ArtworkCard: React.FC<Props> = memo(function ArtworkCard({
  data,
  onActionClick,
  onClick,
}) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(
    popoverRef,
    useCallback(() => setPopoverOpened(false), []),
  );

  const handleMoreButtonClick: MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
    event.stopPropagation();
    setPopoverOpened(true);
  }, []);

  const handleArtworkClick = useCallback(() => {
    onClick(data);
  }, [data, onClick]);

  const handlePopoverClick = useCallback(
    (selectedOption: PopoverOption) => {
      onActionClick(data, selectedOption);
      setPopoverOpened(false);
    },
    [data, onActionClick],
  );

  const containerStyle = useMemo(() => {
    return {
      backgroundSize: data.pointerImage ? 'cover' : 'container',
      backgroundImage: `url(${data.pointerImage || noArtworkIcon})`,
    };
  }, [data.pointerImage]);

  return (
    <div className={styles.container} style={containerStyle} onClick={handleArtworkClick}>
      <div className={styles.heading_container}>
        <button
          type="button"
          className={classNames(styles.more_button, { [styles.active_more_button]: popoverOpened })}
          ref={moreButtonRef}
          onClick={handleMoreButtonClick}>
          <VerticalDotsIcon />
        </button>
        {popoverOpened && (
          <Popover
            ref={popoverRef}
            options={popoverOptions}
            anchorEl={moreButtonRef}
            onClick={handlePopoverClick}
          />
        )}
      </div>
      <div className={styles.info_container}>
        {/* <h6>No category</h6> */}
        <h5>{data.name}</h5>
      </div>
    </div>
  );
});
