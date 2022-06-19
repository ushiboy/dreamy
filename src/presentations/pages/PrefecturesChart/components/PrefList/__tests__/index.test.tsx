import { render, fireEvent, RenderResult } from "@testing-library/react";
import "@testing-library/jest-dom";

import { PrefList } from "..";

import { Prefecture } from "~/domains/models";
describe("PrefList", () => {
  const prefs = [
    { code: 1, name: "北海道" },
    { code: 2, name: "青森県" },
  ];
  const isSelected = (p: Prefecture) => p.code === 1;
  let toggle: (p: Prefecture) => void;

  let v: RenderResult;
  beforeEach(() => {
    toggle = jest.fn((p: Prefecture) => console.log(p));
    v = render(
      <PrefList prefs={prefs} isSelected={isSelected} toggle={toggle} />
    );
  });

  it("都道府県リストを一覧で表示する", () => {
    const item1 = v.queryByTestId(`prefListItem-${prefs[0].code}`);
    expect(item1).toHaveTextContent(prefs[0].name);

    const item2 = v.queryByTestId(`prefListItem-${prefs[1].code}`);
    expect(item2).toHaveTextContent(prefs[1].name);
  });

  it("isSelectedがtrueとなる都道府県をチェック状態にする", () => {
    const c = v.queryByTestId(
      `prefListItemCheckbox-${prefs[0].code}`
    ) as HTMLInputElement;
    expect(c.checked).toBeTruthy();
  });

  it("isSelectedがfalseとなる都道府県を未チェック状態にする", () => {
    const c = v.queryByTestId(
      `prefListItemCheckbox-${prefs[1].code}`
    ) as HTMLInputElement;
    expect(c.checked).toBeFalsy();
  });

  it("チェックボックスに変更が起こった場合toggleを実行する", () => {
    const c = v.queryByTestId(
      `prefListItemCheckbox-${prefs[1].code}`
    ) as HTMLInputElement;
    fireEvent.click(c);
    expect(toggle).toHaveBeenCalledWith(prefs[1]);
  });
});
