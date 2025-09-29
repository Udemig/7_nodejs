"use client";

import { useActionState } from "react";
import handleAction from "../../../utils/server-action";

const Register = () => {
  // useActionState: sadece client component'larda kullanılır
  // çalıştıırlan aksiyonun state'ini tutmaya yarar
  const [state, formAction, pending] = useActionState(handleAction);

  return (
    <div>
      <h1>Form Sayfası</h1>

      {/* Kullanıcnın arrattığı kelimeyi url'e parametre olarak eklemek
          aynı zaman kullanıcıyı recipes sayfasına yönlendirmek istiyoruz. */}
      <form action="/recipes" className="flex gap-4 my-10">
        <input
          name="query"
          type="text"
          placeholder="ara..."
          className="border rounded p-2 flex-1"
        />
        <button className="border p-2 rounded px-5">Ara</button>
      </form>

      <br />
      <hr />
      <br />

      {/* İnputlardan alınan bilgileri ile bir api isteğ atmak istiyoruz */}
      <form action={formAction} className="flex flex-col gap-4 my-10">
        <label>Email</label>
        <input
          name="email"
          type="email"
          placeholder="email"
          className="flex-1 border rounded p-2"
        />

        <label>Şifre</label>
        <input
          name="password"
          type="password"
          placeholder="********"
          className="flex-1 border rounded p-2"
        />

        <button
          disabled={pending}
          type="submit"
          className="bg-zinc-500 p-2 rounded-md"
        >
          Gönder
        </button>
      </form>
    </div>
  );
};

export default Register;
