import { useRef, useState } from 'react';

export default function useRowDnd({records}) {
  const [recordsAfterMoveRow, setRecordsAfterMoveRow] = useState();
  const moveRowPending = useRef(false);

  let resolvedRecords = records;
  if (moveRowPending.current) {
    resolvedRecords = recordsAfterMoveRow;
    moveRowPending.current = false;
  }

  return {
    records: resolvedRecords,
    rowDnd: {
      setRecordsAfterMoveRow: records => {
        moveRowPending.current = true;
        setRecordsAfterMoveRow(records);
      },
    }
  };
}
