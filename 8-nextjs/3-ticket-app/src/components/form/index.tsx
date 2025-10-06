import { Ticket } from "@/types";
import { FC } from "react";
import Field from "./field";
import { PRIORITY_LABELS, TICKET_CATEGORIES, TICKET_PRIORITIES, TICKET_STATUSES } from "@/utils/constants";
import { createTicketAction, updateTicketAction } from "@/utils/actions";

interface Props {
  isEditMode: boolean;
  editItem: Ticket | null;
}

const Form: FC<Props> = ({ isEditMode, editItem }) => {
  return (
    <div className="max-w-[600px]">
      <form action={isEditMode ? updateTicketAction : createTicketAction} className="flex flex-col gap-5">
        {/* Update action'unda güncellenicek elemanın id'sine erişmek için id değerini formun içerisine gizli olarak ekledik */}
        <input type="text" name="id" value={editItem?.id} readOnly hidden />

        <Field label="Başlık">
          <input type="text" name="title" required maxLength={100} className="input" defaultValue={editItem?.title} />
        </Field>

        <Field label="Açıklama">
          <textarea
            required
            maxLength={100}
            name="description"
            className="input resize-y min-h-20 max-h-96"
            defaultValue={editItem?.description}
          />
        </Field>

        <Field label="Kategori">
          <select name="category" className="input" required defaultValue={editItem?.category}>
            <option value="">Kategori Seçiniz</option>

            {TICKET_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Öncelik">
          <div className="flex flex-wrap items-center gap-3">
            {TICKET_PRIORITIES.map((priority) => (
              <div className="flex items-center gap-2">
                <input
                  id={`${priority}`}
                  type="radio"
                  name="priority"
                  value={priority}
                  required
                  defaultChecked={editItem?.priority === priority}
                  className="size-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-2"
                />

                <label htmlFor={`${priority}`} className="text-sm font-medium cursor-pointer hover:text-blue-400">
                  {priority} - {PRIORITY_LABELS[priority]}
                </label>
              </div>
            ))}
          </div>
        </Field>

        <Field label="İlerleme">
          <input type="range" name="progress" min={0} max={100} step={5} defaultValue={editItem?.progress || 0} />
        </Field>

        <Field label="Durum">
          <select name="status" className="input" required defaultValue={editItem?.status}>
            <option value="">Durum Seçiniz</option>

            {TICKET_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </Field>

        <button
          type="submit"
          className="bg-blue-600 mt-5 p-2 rounded-md font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-h-[42px]"
        >
          {isEditMode ? "Kaydet" : "Oluştur"}
        </button>
      </form>
    </div>
  );
};

export default Form;
