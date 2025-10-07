"use client";

import { useFormState } from "react-dom";
import { unlock } from "./actions";

const INITIAL_STATE = { error: "" };

type UnlockFormProps = {
  redirectTo: string;
};

export function UnlockForm({ redirectTo }: UnlockFormProps) {
  const [state, formAction] = useFormState(unlock, INITIAL_STATE);

  return (
    <form action={formAction} className="unlock-form">
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <label htmlFor="password">Mot de passe</label>
      <input
        id="password"
        name="password"
        type="password"
        required
        placeholder="Entrez le mot de passe"
        autoComplete="current-password"
      />
      {state?.error ? <p className="unlock-error">{state.error}</p> : null}
      <button type="submit" className="primary-action primary-action--wide">
        Déverrouiller
      </button>
    </form>
  );
}
