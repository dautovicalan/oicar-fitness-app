import { renderHook } from "@testing-library/react";
import useFetch from "../useFetch";

global.fetch = jest.fn();

describe("useFetch", () => {
  it("should return the initial values for data, error and loading", async () => {
    const { result } = renderHook(() => useFetch());
    const { data, error, loading } = result.current;

    expect(data).toBe(null);
    expect(error).toBe(null);
    expect(loading).toBe(true);
  });
});
