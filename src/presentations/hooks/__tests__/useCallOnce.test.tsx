import { renderHook, act } from "@testing-library/react-hooks";

import { useCallOnce } from "../useCallOnce";

describe("useCallOnce", () => {
  it("関数を一度のみ実行する", async () => {
    const fn = jest.fn(() => console.log("fn"));
    const { result } = renderHook(() => useCallOnce(fn));

    expect(fn).toHaveBeenCalledTimes(0);

    act(() => result.current.execute());
    expect(fn).toHaveBeenCalledTimes(1);

    act(() => result.current.execute());
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
