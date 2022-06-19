import React from "react";

import * as S from "./styles";

import { Prefecture } from "~/domain/models";

export type Props = {
  prefs: Prefecture[];
  isSelected: (p: Prefecture) => boolean;
  toggle: (p: Prefecture) => void;
};

export const PrefList: React.FC<Props> = ({ prefs, isSelected, toggle }) => {
  return (
    <S.Root>
      {prefs.map((p) => (
        <S.ListItem key={p.code} data-testid={`prefListItem-${p.code}`}>
          <label>
            <input
              type="checkbox"
              data-testid={`prefListItemCheckbox-${p.code}`}
              checked={isSelected(p)}
              onChange={() => toggle(p)}
            />
            {p.name}
          </label>
        </S.ListItem>
      ))}
    </S.Root>
  );
};
