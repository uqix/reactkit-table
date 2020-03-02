/** @jsx jsx */
import { jsx } from '@emotion/core';
import Button from './Button';

export default function batchTool(
  // 显示内容
  // 当有选择行时, 会自动拼接(选择行数)
  // 当选择行中有不适用行时, 会自动拼接(适用行数/选择行数)
  // 当无适用行时按钮会被禁用
  content,

  // 选择的行是否适用于该tool
  // func: record => bool
  // 默认为适用
  applicable,

  // 处理适用的行
  // func: applicableRecords, onOk, onError => any
  process,

  // 其他Button props
  button
){
  return function BatchTool({selectedRecords}) {
    const applicableRecords =
          applicable
          ? selectedRecords.filter(r => applicable(r))
          : selectedRecords;

    return (
      <Button
        {...button}
        disabled={applicableRecords.length === 0}
        onClick={() => process(applicableRecords)}
      >
        {content}
        {selectedRecords.length > 0
         && (
           applicableRecords.length === selectedRecords.length
             ? `(${applicableRecords.length})`
             : `(${applicableRecords.length}/${selectedRecords.length})`
         )
        }
      </Button>
    );
  };
}
