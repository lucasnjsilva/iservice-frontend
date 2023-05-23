"use client";

import React, { useState } from "react";
import useStyle from "@/utils/cssHandler";
import classes from "./style";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import DeleteModal from "../DeleteModal";

type PropTypes = {
  table: {
    head: Array<string>;
    body: Array<{
      id: string;
      [key: string]: any;
    }>;
  };
  actions:
    | boolean
    | {
        view?: boolean;
        edit?: boolean;
        delete?: boolean;
      };
  handleEdit?: any;
  handleDelete?: any;
  handleView?: any;
};

function Table(props: PropTypes) {
  const { table, actions, handleView, handleEdit, handleDelete } = props;

  const useClasses = useStyle(classes);
  const [isOpen, setIsOpen] = useState(false);
  const [itemId, setItemId] = useState<string>("");

  const handleModal = (id?: string) => {
    if (id) {
      setItemId(id);
    }

    setIsOpen(!isOpen);
  };

  const renderActions = (id: string) => {
    if (typeof actions === "boolean" && actions === true) {
      return (
        <td>
          <button className={useClasses.action}>
            <EyeIcon
              width={20}
              height={20}
              className={useClasses.actionIcon}
              onClick={() => handleView(id)}
            />
          </button>

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
              onClick={() => handleModal(id)}
            />
          </button>
        </td>
      );
    }

    if (typeof actions === "object") {
      return (
        <td>
          {actions.view && (
            <button className={useClasses.action}>
              <EyeIcon
                width={20}
                height={20}
                className={useClasses.actionIcon}
                onClick={() => handleView(id)}
              />
            </button>
          )}

          {actions.edit && (
            <button className={useClasses.action}>
              <PencilSquareIcon
                width={20}
                height={20}
                className={useClasses.actionIcon}
                onClick={() => handleEdit(id)}
              />
            </button>
          )}

          {actions.delete && (
            <button className={useClasses.action}>
              <TrashIcon
                width={20}
                height={20}
                className={useClasses.actionIcon}
                onClick={() => handleModal(id)}
              />
            </button>
          )}
        </td>
      );
    }

    return null;
  };

  return (
    <>
      <DeleteModal
        isOpen={isOpen}
        onClose={handleModal}
        onDelete={handleDelete}
        id={itemId}
      />

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

                  {actions ? renderActions(id) : null}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
