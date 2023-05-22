import useStyle from "@/utils/cssHandler";
import React from "react";
import classes from "./style";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

type PropTypes = {
  table: {
    head: Array<string>;
    body: Array<{
      id: string;
      [key: string]: any;
    }>;
  };
  actions: boolean;
  handleEdit?: any;
  handleDelete?: any;
};

function Table({ table, actions, handleEdit, handleDelete }: PropTypes) {
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

            {actions ? <th>Ações</th> : null}
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

                {actions ? (
                  <td>
                    <button className={useClasses.action}>
                      <PencilSquareIcon
                        width={20}
                        height={20}
                        className={useClasses.actionIcon}
                        onClick={() => handleEdit(id)}
                      />
                    </button>

                    <button className={useClasses.action}>
                      <TrashIcon
                        width={20}
                        height={20}
                        className={useClasses.actionIcon}
                        onClick={() => handleDelete(id)}
                      />
                    </button>
                  </td>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
