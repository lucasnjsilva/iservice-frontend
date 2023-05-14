import useStyle from "@/utils/cssHandler";
import React from "react";
import classes from "./style";

type PropTypes = {
  table: {
    head: Array<string>;
    body: Array<{
      id: string;
      [key: string]: any;
    }>;
  };
};

function Table({ table }: PropTypes) {
  const useClasses = useStyle(classes);

  return (
    <div className={useClasses.container}>
      <table className={useClasses.table}>
        <thead className={useClasses.thead}>
          <tr>
            {table.head.map((item, index) => (
              <th key={index} className={useClasses.th}>
                {item}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className={useClasses.tbody}>
          {table.body.map((item) => {
            const { id, ...data } = item;

            return (
              <tr key={id}>
                {Object.values(data).map((value, index) => (
                  <td key={index} className={useClasses.td}>
                    {value}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
