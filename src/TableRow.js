/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { TableRow as MrTableRow, TableCell } from '@material-ui/core';
import { useDrag, useDrop } from 'react-dnd';
import React from 'react';

const DND_ITEM_TYPE = 'row';

export default function TableRow({
  row: {cells, index},
  rowDnd,
  records,
}) {
  const dropRef = React.useRef();

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRecord = records[dragIndex];
    const d = [...records];
    d.splice(dragIndex, 1);
    d.splice(hoverIndex, 0, dragRecord);
    rowDnd.setRecordsAfterMoveRow(d);
  };

  const [, drop] = useDrop({
    accept: DND_ITEM_TYPE,

    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = dropRef.current.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveRow(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{isDragging}, drag, preview] = useDrag({
    item: {
      type: DND_ITEM_TYPE,
      index,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <MrTableRow
      ref={el => {
        preview(el);
        drop(el);
        dropRef.current = el;
      }}
      css={css`opacity: ${isDragging ? 0.1 : 1};`}
    >
      {cells.map(c => (
        <TableCell
          css={c.column.xCss}
          {...c.getCellProps()}
        >
          {c.render('Cell', {
            xDragRef: rowDnd && drag
          })}
        </TableCell>
      ))}
    </MrTableRow>
  );
}
